import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import HeroShowcase from "@/components/HeroShowcase";
import JourneySection from "@/components/JourneySection";
import ContentSwipeSection from "@/components/ContentSwipeSection";
// AiInterviewSection is temporarily disabled for the managed-service positioning
// (customers no longer refine posts themselves) — kept intact to re-enable later.
// import AiInterviewSection from "@/components/AiInterviewSection";
import FeedbackLoopSection from "@/components/FeedbackLoopSection";
import WhoItsFor from "@/components/WhoItsFor";
import PricingSection from "@/components/PricingSection";
import WhyNotSection from "@/components/WhyNotSection";
import { BlogCTA } from "@/components/BlogCTA";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Navbar />
      <div className="relative z-10 bg-white dark:bg-[#0A0A0A]">
      <Hero />
      <TrustedBy />
      <HeroShowcase />
      <JourneySection />
      <ContentSwipeSection />
      {/* <AiInterviewSection /> — hidden for now, see import comment above */}
      <FeedbackLoopSection />
      <TestimonialsSection />
      <WhoItsFor />
      <PricingSection />
      <WhyNotSection />
      <BlogCTA />
      <FAQSection />
      </div>

      <div className="relative z-0 max-h-[800px] overflow-hidden md:sticky md:bottom-0">
        <FinalCTA />
        <Footer />
      </div>
    </main>
  );
}
