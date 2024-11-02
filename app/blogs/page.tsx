import { getBlogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
          Mockly Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Blogs about Mockly and more.
        </p>

        <div className="space-y-12">
          {posts
            .sort(
              (a, b) =>
                new Date(b.metadata.publishedAt).getTime() -
                new Date(a.metadata.publishedAt).getTime()
            )
            .map((post) => (
              <article
                key={post.slug}
                className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0"
              >
                <Link href={`/blogs/${post.slug}`}>
                  <Image
                    src={post.metadata.image}
                    alt={post.metadata.title}
                    width={800}
                    height={400}
                    className="rounded-lg w-full h-48 object-cover mb-4"
                  />
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    {post.metadata.title}
                  </h2>
                  <p className="text-base text-gray-600 dark:text-gray-300 mb-2">
                    {post.metadata.summary}
                  </p>
                  <time className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(post.metadata.publishedAt)}
                  </time>
                </Link>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
