import BlogItem from "@/components/Blog/BlogItem";
import { Metadata } from "next";
import { BlogService } from "@/app/services/blog.service";
import { IBlog } from "@/types/blog";

export const metadata: Metadata = {
  title: "Blog Page - Solid SaaS Boilerplate",
  description: "This is the Blog page for Solid Pro",
};

// ✅ Server-side fetching (SSR) using an async function
const BlogPage = async () => {
  let blogs: IBlog[] = [];

  try {
    blogs = await BlogService.getAllBlogs();
    console.log("Fetched Blogs:", blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {blogs.slice(0, 3).map((blog, key) => (
              <li>
                <img src={`${blog.image[0].url}`} alt={`${blog.slug}`} />
                {blog.title}
                {blog.author.name}
              </li>
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default BlogPage;
