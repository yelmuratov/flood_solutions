import RelatedPost from "@/components/Blog/RelatedPost";
import SharePost from "@/components/Blog/SharePost";
import { Metadata } from "next";
import Image from "next/image";
import { IBlog, ICategory } from "@/types/blog";
import { BlogService } from "@/services/blog.service";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Blog Details Page - Solid SaaS Boilerplate",
  description: "This is Blog details page for Solid Pro",
  // other metadata
};

const SingleBlogPage = async ({ params }: { params: { slug: string } }) => {
  let blog: IBlog | null = null;
  let latestBlogs: IBlog[]|null = [];
  let categories:ICategory[] = [];

  try {
    blog = await BlogService.getBlogDetails(params.slug);
    latestBlogs = await BlogService.getLatestBlogs();
    categories = await BlogService.getCategories();
  } catch (error) {
    console.error("Error fetching blog:", error);
  }

  // ✅ Show 404 if blog is not found
  if (!blog) {
    return notFound();
  }
  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
            <div className="md:w-1/2 lg:w-[32%]">
              <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
                  Categories
                </h4>

                <ul>
                  {categories.map((category, key) => (
                    <li key={key} className="mb-5">
                      <a
                        href={`/blog/category/${category.slug}`}
                        className="text-md font-medium text-black transition-all duration-300 hover:text-primary dark:text-white dark:hover:text-primary"
                      >
                        {category.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <RelatedPost />
            </div>

            <div className="lg:w-2/3">
              <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                <div className="mb-10 w-full overflow-hidden ">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <Image
                      src={blog.image && blog.image.length > 0 && blog.image[0].url ? blog.image[0].url : "/default-image.jpg"}
                      alt="Kobe Steel plant that supplied"
                      fill
                      className="rounded-md object-cover object-center"
                    />
                  </div>
                </div>

                <h2 className="mb-5 mt-11 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">
                  {blog.title}
                </h2>
                <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5 items-center">
                  <li className="flex items-center">
                  <span className="text-black dark:text-white">Author: </span>
                  <Image
                    src={blog.author?.avatar?.url ? blog.author.avatar.url : "/default-avatar.jpg"}
                    alt={blog.author?.name || "Unknown Author"}
                    width={30}
                    height={30}
                    className="rounded-full ml-2"
                  />
                  <span className="ml-2">{blog.author?.name}</span>
                  </li>
                  <li className="flex items-center">
                  <span className="text-black dark:text-white">Published On: </span>
                  <span className="ml-2">{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </li>
                  <li className="flex items-center">
                  <span className="text-black dark:text-white">Category: </span>
                  <span className="ml-2">{blog.category?.label}</span>
                  </li>
                </ul>

                <div className="blog-details" dangerouslySetInnerHTML={{ __html: blog.description.html }}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlogPage;
