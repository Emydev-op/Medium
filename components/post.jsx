/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

export const getData = async () => {
  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/blog-posts`,
    {
      next: { revalidate: 120 },
    }
  );
  if (!res.ok) {
    throw new Error("failed to fetch Data");
  }
  return res.json();
};

export default async function Posts() {
  const posts = await getData();
//   console.log(posts?.blogs);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts?.blogs.map((post) => (
          <Link key={"post.id"} href={`/post/${post?.id}`}>
            <div className="group cursor-pointer border rounded-lg shadow-sm overflow-hidden">
              <img
                src={post?.photo_url}
                alt={`image of ${post?.title}`}
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="font-bold text-base">{post?.title}</p>
                  <p className="truncate text-xs">
                    {post?.description.slice(0, 20)}... by{" "}
                    <span className="text-gray-500">Admin</span>
                  </p>
                </div>
                <img
                  src={post?.photo_url}
                  alt="user avatar"
                  className="size-12 rounded-full"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
