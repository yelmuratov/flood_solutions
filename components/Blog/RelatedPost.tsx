import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlogData from "./blogData";
import { IBlog } from "@/types/blog";
import { BlogService } from "@/services/blog.service";
import { notFound } from "next/navigation";

const RelatedPost = async () => {
    let latestBlogs: IBlog[]|null = [];
  
    try {
      latestBlogs = await BlogService.getLatestBlogs();
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  
    // ✅ Show 404 if blog is not found
    if (!latestBlogs) {
      return notFound();
    }
  return (
    <>
      <div className="animate_top rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
          Recent Posts
        </h4>
        <div>
          {latestBlogs.slice(0, 3).map((post, key) => (
            <div
              className="mb-7.5 flex flex-wrap gap-4 xl:flex-nowrap 2xl:gap-6"
              key={key}
            >
              <div className="max-w-45 relative h-18 w-45">
                {post.image ? (
                  <Image fill src={post.image[0].url} alt="Blog" />
                ) : (
                  "No image"
                )}
              </div>
              <h5 className="text-md font-medium text-black transition-all duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
                <Link href={`/blog/${post.slug}`}>
                  {" "}
                  {post.title.slice(0, 40)}...
                </Link>
              </h5>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedPost;
