import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Products from '@/components/Products';
import Gallery from '@/components/Gallery';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <Products />
      <Gallery />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
