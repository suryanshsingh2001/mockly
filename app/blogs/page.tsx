import { getBlogPosts } from "@/lib/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};


export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="flex flex-col items-center max-w-2xl mx-auto py-12 sm:py-24 px-6">
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        Mockly Blog
      </h1>
      {posts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post, id) => (
          <Link
            className="flex flex-col space-y-1 mb-4"
            href={`/blogs/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="tracking-tight">{post.metadata.title}</p>
              <p className="h-6 text-xs text-muted-foreground">
                {post.metadata.publishedAt}
              </p>
            </div>
          </Link>
        ))}
    </section>
  );
}
