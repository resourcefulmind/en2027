import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { OurStory } from "@/components/sections/OurStory";
import { WeddingDetails } from "@/components/sections/WeddingDetails";

/**
 * The page. Sections compose here in order (build-plan Phase 2). The fixed
 * Navigation overlays the page; each section owns its anchor id (hero · story ·
 * schedule · details · gallery · rsvp) so the nav can scroll to and track it.
 * Sections 07–12 slot in below as they're built.
 */
export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <OurStory />
        <WeddingDetails />
      </main>
    </>
  );
}
