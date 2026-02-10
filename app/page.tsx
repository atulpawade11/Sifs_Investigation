// app/page.tsx
import Hero from "../components/home/Hero";
import AboutIntro from "../components/home/AboutIntro";
import ForensicServices from "../components/home/ForensicServices";
import VisionMission from "../components/home/VisionMission";
import ShowcaseStats from "../components/home/ShowcaseStats";
import Team from "../components/home/Team";
import Testimonials from "../components/home/Testimonials";
import BlogsCaseStudies from "../components/home/BlogsCaseStudies";
import DownloadsSlider from "../components/home/DownloadsSlider";


export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <ForensicServices />
      <VisionMission />
      <ShowcaseStats />
      <Team />
      <Testimonials />
      <BlogsCaseStudies />
      <DownloadsSlider />
    </>
  );
}
