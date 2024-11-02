import { siteConfig } from "@/config/config";
import { getPost } from "@/lib/blog";
import { formatDate, calculateReadTime } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Clock, Calendar } from "lucide-react";
import Image from "next/image";



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
    <div className="min-h-screen ">
      <section className="max-w-3xl mx-auto py-12 sm:py-24 px-6">

      <Image src={post.metadata.image} alt={post.metadata.title} width={1200} height={600} className="rounded-xl" />


        <div className="p-8 rounded-xl">
          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
              {post.metadata.title}
            </h1>

            <div className="flex flex-wrap gap-4 items-center text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <Suspense fallback={<p className="h-5" />}>
                  <time dateTime={post.metadata.publishedAt}>
                    {formatDate(post.metadata.publishedAt)}
                  </time>
                </Suspense>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </header>

          {/* Schema.org metadata */}
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.metadata.title,
                datePublished: post.metadata.publishedAt,
                dateModified: post.metadata.publishedAt,
                description: post.metadata.summary,
                image: post.metadata.image
                  ? `${siteConfig.url}${post.metadata.image}`
                  : `${siteConfig.url}/og?title=${post.metadata.title}`,
                url: `${siteConfig.url}/blog/${post.slug}`,
                author: {
                  "@type": "Person",
                  name: siteConfig.name,
                },
              }),
            }}
          />

          {/* Article Content */}
          <article
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.source }}
          />
        </div>
      </section>
    </div>
  );
}
