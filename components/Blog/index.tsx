import React from "react";
import SectionHeader from "../Common/SectionHeader";
import BlogItem from "./BlogItem";
import BlogData from "./blogData";
import { BlogService } from "../../services/blog.service";
import { IBlog } from "@/types/blog";

const Blog = async () => {
  let blogs:IBlog[] = [];

  try {
    blogs = await BlogService.getBlogs();
  } catch (e) {
    console.error(e);
  }
  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        {/* <!-- Section Title Start --> */}
        <div className="animate_top mx-auto text-center">
          <SectionHeader
            headerInfo={{
              title: `Yangiliklar & Bloglar`,
              subtitle: `So'nggi yangiliklar va bloglar`,
              description: `Bizning blogimizda so'nggi yangiliklar, texnologiyalar va biznesning raqamli dunyosiga oid maqolalar bilan tanishing.`,
            }}
          />
        </div>
        {/* <!-- Section Title End --> */}
      </div>

      <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
        <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {blogs.slice(0, 3).map((blog, key) => (
            <BlogItem blog={blog} key={key} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
