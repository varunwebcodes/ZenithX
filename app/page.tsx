import HeadphoneScroll from "@/components/HeadphoneScroll";
import ProductCollection from "@/components/ProductCollection";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#050505] min-h-screen">
      <HeadphoneScroll />
      <ProductCollection />
      <Features />
      <Footer />
    </main>
  );
}

