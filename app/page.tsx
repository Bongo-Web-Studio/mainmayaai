import CTA from "@/Components/CTA";
import Footer from "@/Components/Footer";
import HeroSection from "@/Components/HeroSection";
import Howtousethis from "@/Components/Howtousethis";
import Image from "@/Components/Image";
import Navbar from "@/Components/Navbar";
import Need1000Section from "@/Components/Need1000Section";
import WhatsAppChatPhone from "@/Components/Phone";
import TrustedSection from "@/Components/TrustedSection";
import Video from "@/Components/Video";

export default function page() {
  return (
    <div className="bg-[#FFF4EC]  w-full overflow-hidden">
      <Navbar />

      <HeroSection />
      <TrustedSection />
      <Need1000Section />
      <Video />
      <Howtousethis />
      <Image />
      <CTA />
      <Footer />
    </div>
  );
}
