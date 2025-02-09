"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IBlog } from "@/types/blog";
import { useRouter } from "next/navigation";

const BlogItem = ({ blog }: { blog: IBlog }) => {
  const { image, title, excerpt, author } = blog;
  const router = useRouter();

  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="animate_top rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
        onClick={() => router.push(`/blog/${blog.slug}`)}
      >
        {/* Ensure the image is defined */}
        <Link href={`/blog/`} className="relative block aspect-[368/239]">
          <Image 
            src={image && image.length > 0 && image[0].url ? image[0].url : "/default-image.jpg"} 
            alt={title || "Blog Image"} 
            fill 
          />
        </Link>

        <div className="px-4">
          <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
            <Link href={`/blog/${blog.slug}`}>
              {title ? `${title.slice(0, 40)}...` : "No Title Available"}
            </Link>
          </h3>

          {/* Excerpt with fallback */}
          <div className="mt-5 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {excerpt ? `${excerpt.slice(0, 100)}...` : "No excerpt available."}
          </div>

          {/* Author Information */}
          <div className="flex items-center mt-5">
            <div className="flex items-center gap-3">
              <Image
                src={author?.avatar?.url ? author.avatar.url : "/default-avatar.jpg"}
                alt={author?.name ? author.name : "Unknown Author"}
                width={30}
                height={30}
                className="rounded-full"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {author?.name || "Unknown Author"}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Unknown Date"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BlogItem;
