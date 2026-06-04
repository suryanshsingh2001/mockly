import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { cache } from "react";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      theme: {
        light: "min-light",
        dark: "dark-plus",
      },
      keepBackground: false,
    
      
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

export const getPost = cache(async (slug: string) => {
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);
  let source: string;
  try {
    source = fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
  const { content: rawContent, data: metadata } = matter(source);
  const content = await markdownToHTML(rawContent);
  return {
    source: content,
    metadata: metadata as { title: string; publishedAt: string; summary: string; image?: string },
    slug,
  };
});

async function getAllPosts(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      return getPost(slug);
    })
  );
  return posts.filter((p) => p !== null);
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), "content"));
}
