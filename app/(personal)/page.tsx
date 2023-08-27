import Hero from "@/components/Hero";
import Link from "next/link";
import formatDate from "../../lib/utils/formatDate";
import Tag from "@/components/Tag";
import { client } from "@/lib/sanity.client";

import { groq } from "next-sanity";
import Skills from "@/components/Skills";
import RecentProjects from "@/components/RecentProjects";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mohit's Portfolio",
  description:
    "Mohit kalme is a web developer. He specializes in creating beautiful and user-friendly websites that meet the needs of her clients. Visit her portfolio website to see her work and learn more about her services.",
};

const query = groq`
*[_type=='post'] {
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)
`;
const MAX_DISPLAY = 5;

export default async function Home() {
  const posts: Post[] = await client.fetch(query);

  return (
    <>
      <Hero />
      <Skills />
      <RecentProjects MAX_PROJECTS={4} />
      <h2 className="flex pb-6 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl md:text-5xl">
        Latest
      </h2>
      <hr className="border-gray-200 dark:border-gray-700" />

      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts.length && "No posts found."}
        {posts.slice(0, MAX_DISPLAY).map((post) => {
          return (
            <li key={post._id} className="py-12">
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="   leading-6 font-medium  text-gray-500 dark:text-gray-400 text-base">
                      <time dateTime={post._createdAt}>
                        {formatDate(post._createdAt)}
                      </time>
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link
                            href={`/blog/${post.slug.current}`}
                            className="text-gray-900 dark:text-gray-100"
                          >
                            {post.title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap">
                          {post.categories.map((category) => (
                            <Tag key={category.title} text={category.title} />
                          ))}
                        </div>
                      </div>
                      <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                        {post.description}
                      </div>
                    </div>
                    <div className="text-base font-medium leading-6">
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Read "${post.title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
