import Hero from "@/components/sections/Hero";
import Suites from "@/components/sections/Suites";
import VideoBanner from "@/components/sections/VideoBanner";
import Amenities from "@/components/sections/Amenities";
import Experiences from "@/components/sections/Experiences";
import Testimonials from "@/components/sections/Testimonials";
import BookingCTA from "@/components/sections/BookingCTA";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suites />
      <VideoBanner />
      <Amenities />
      <Experiences />
      <Testimonials />
      <BookingCTA />
      <Footer />
    </>
  );
}
