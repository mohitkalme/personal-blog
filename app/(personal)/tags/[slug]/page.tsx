import React from "react";
import Link from "next/link";

import { client } from "@/lib/sanity.client";
import { groq } from "next-sanity";

import formatDate from "@/lib/utils/formatDate";
import Tag from "@/components/Tag";

import type { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

type TagData = {
  title: string;
  posts: Post[];
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.slug;

  return {
    title: `#${id} - Blog`,
  };
}

const page = async ({ params: { slug } }: Props) => {
  const query = groq`
  *[_type == "category" ]{
    ...,
    'posts': *[_type=='post' && ^._id in categories[]._ref]{
      ...,
      author->,
      categories[]->
    }
  } | order(_createdAt desc)

`;

  const data: TagData[] = await client.fetch(query);

  const tagData: TagData[] = data.filter((tag: TagData) => {
    return tag.title.toLowerCase() == slug.toLowerCase();
  });

  const posts: Post[] = tagData.length ? tagData[0].posts : [];

  return (
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        All Posts
      </h1>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts.length && "No posts found."}
        {posts.map((post: Post) => {
          return (
            <li key={post._id} className="py-12">
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={post?._createdAt}>
                        {formatDate(post?._createdAt)}
                      </time>
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link
                            href={`/blog/${post?.slug?.current}`}
                            className="text-gray-900 dark:text-gray-100"
                          >
                            {post.title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap">
                          {post.categories?.map((category: Category) => (
                            <Tag key={category.title} text={category?.title} />
                          ))}
                        </div>
                      </div>
                      <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                        {post.description}
                      </div>
                    </div>
                    <div className="text-base font-medium leading-6">
                      <Link
                        href={`/blog/${post?.slug?.current}`}
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
    </div>
  );
};

export default page;
