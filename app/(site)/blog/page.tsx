import BlogData from "@/components/Blog/blogData";
import BlogItem from "@/components/Blog/BlogItem";
import { Metadata } from "next";
import { IBlog } from "@/types/blog";
import { BlogService } from "@/services/blog.service";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Websites, software development, business solutions, odoo",
  // other metadata
};

const BlogPage = async () => {
  let blogs:IBlog[] = [];

  try{
    blogs = await BlogService.getLatestBlogs();
  }catch(e){
    console.error(e);
  }
  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {blogs.map((post, key) => (
              post && <BlogItem key={key} blog={post} />
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default BlogPage;
