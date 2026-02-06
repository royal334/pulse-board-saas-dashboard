import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
