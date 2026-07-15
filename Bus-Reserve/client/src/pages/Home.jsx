import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import PopularRoutes from "../components/PopularRoutes";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <PopularRoutes />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;
