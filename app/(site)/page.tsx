import Hero from "@/components/Hero";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Testimonial from "@/components/Testimonial";
import { BlogService } from "../services/blog.service";
import { IBlog } from "@/types/blog";

// ✅ Fetch data inside a Server Component (SSR)
export default async function Home() {
  let blogs: IBlog[] = [];

  try {
    blogs = await BlogService.getAllBlogs();
    console.log("Fetched Blogs:", blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return (
    <main>
      <Hero />
      <Feature />
      <About />
      <FeaturesTab />
      <FunFact />
      <Integration />
      <CTA />
      <FAQ />
      <Testimonial />
      <Contact />
      {/* ✅ Pass blogs to Blog component */}
      <Blog blogs={blogs}/>
    </main>
  );
}
