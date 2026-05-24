import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import WhatWeDo from "@/components/WhatWeDo";
import Flywheel from "@/components/Flywheel";
import OurWork from "@/components/OurWork";
import Tracks from "@/components/Tracks";
import Journey from "@/components/Journey";
import SuccessStories from "@/components/SuccessStories";
import Team from "@/components/Team";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <WhatWeDo />
        <Flywheel />
        <OurWork />
        <Tracks />
        <Journey />
        <SuccessStories />
        <Team />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
