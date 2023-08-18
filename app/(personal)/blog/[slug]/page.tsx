import React from "react";
import Link from "next/link";

import { groq } from "next-sanity";
import { client } from "@/lib/sanity.client";

import PageTitle from "@/components/PageTitle";
import SectionContainer from "@/components/SectionContainer";
import Tag from "@/components/Tag";

import formatDate from "@/lib/utils/formatDate";

import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/components/RichTextComponents";

type Props = {
  params: {
    slug: string;
  };
};

const page = async ({ params: { slug } }: Props) => {
  const query = groq`
  *[_type== 'post' && slug.current == $slug][0]
  {
    ...,
    author->,
    categories[]->
  }
  `;
  const post: Post = await client.fetch(query, { slug });
  return (
    <div>
      <SectionContainer>
        <article>
          <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
            <header className="pt-6 xl:pb-6">
              <div className="space-y-1 text-center">
                <dl className="space-y-10">
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={post._createdAt}>
                        {formatDate(post._createdAt)}
                      </time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <PageTitle>{post.title}</PageTitle>
                </div>
              </div>
            </header>
            <div
              className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
              style={{ gridTemplateRows: "auto 1fr" }}
            >
              <footer>
                <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
                  {post.categories && (
                    <div className="py-4 xl:py-8">
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Tags
                      </h2>
                      <div className="flex flex-wrap">
                        {post.categories.map((category) => (
                          <Tag key={category.title} text={category.title} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="pt-4 xl:pt-8">
                  <Link
                    href="/blog"
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    &larr; Back to the blog
                  </Link>
                </div>
              </footer>
              <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
                <div className="pt-10 pb-8 prose dark:prose-dark max-w-none">
                  <PortableText
                    value={post.body}
                    components={RichTextComponents}
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
      </SectionContainer>
    </div>
  );
};

export default page;
