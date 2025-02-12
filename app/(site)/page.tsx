import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
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

export const metadata: Metadata = {
  title: "Flood Solutions",
  description: "We provide IT services, ERP, CRM, Telegram bot, websites, software development, business solutions, and odoo.",
  keywords: "IT services, ERP, CRM, Telegram bot, websites, software development, business solutions,odoo,FloodSolutions Flood Solutions",
  verification: {
    google: "1XEshsQJFbSEai79UyfV87beLQCkIGn2qRcWyqlDKE4",
  },
};

export default function Home() {
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
      <Blog />
    </main>
  );
}
