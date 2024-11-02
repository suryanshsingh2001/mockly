import { siteConfig } from "@/config/config";
import { getPost } from "@/lib/blog";
import { formatDate, calculateReadTime } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";



export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  const post = await getPost(params.slug);

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: [
        {
          url: siteConfig.ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = await getPost(params.slug);


  

  if (!post) {
    notFound();
  }

  const readTime = calculateReadTime(post.source);

  return (
     <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">

         <Link href={"/"}>
          
          <Button variant="ghost" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </Link>
        </div>

        <div className="relative h-96 w-full mb-8">
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        <header className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
            {post.metadata.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={siteConfig.authorImage} alt={siteConfig.author} />
              </Avatar> 
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{siteConfig.author}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{"Owner and Maintainer"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.metadata.publishedAt}>
                  {formatDate(post.metadata.publishedAt)}
                </time>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.source }} />
        </div>
      </article>
    </div>
  );
}
