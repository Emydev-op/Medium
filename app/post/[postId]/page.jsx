/* eslint-disable @next/next/no-img-element */
import formatDate from "@/util/formatDate";
import React from "react";

export const dynamicParams = true;

// Get all static params
export const generateStaticParams = async () => {
  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/blog-posts`
  );
  const respond = await res.json();
  const data = respond?.blogs;
  const paths = data.map((item) => ({ postId: item?.id.toString() }));
  // console.log(paths);
  return [paths];
};

//Generate the static posts using SSG
async function getPost(params) {
  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/blog-posts/${params.postId}`,
    { next: { revalidate: 60 } }
  );
  const posts = await res.json();
  if (!posts) {
    return {
      posts: { notFound: true },
    };
  }
  return posts;
}

//Component Post
export default async function PostDetails({ params }) {
  const posts = await getPost(params);
  const data = posts?.blog;
  // console.log(data);
  return (
    <>
      <img
        src={data?.photo_url}
        alt="post image"
        className="w-full h-40 object-cover"
      />
      <article className="max-w-2xl mx-auto p-5">
        <h1 className="text-4xl mt-10 mb-3">{data?.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {data?.description}
        </h2>

        <div className="flex items-center space-x-2">
          <img
            src={data?.photo_url}
            alt="Author Img"
            className="rounded-full size-10"
          />
          <p className="font-extralight text-sm">
            Blog post by <span className="text-green-600">Elon Musk</span> -
            Published at {formatDate(data?.created_at)}
          </p>
        </div>
        <div className="mt-10">
          <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: data?.content_html }} />
        </div>
      </article>
    </>
  );
}
