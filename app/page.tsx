import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";

/**
 * The page. Sections compose here in order (build-plan Phase 2). The fixed
 * Navigation overlays the page; each section owns its anchor id (hero · story ·
 * schedule · details · gallery · rsvp) so the nav can scroll to and track it.
 * Sections 06–12 slot in below the Hero as they're built.
 */
export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
      </main>
    </>
  );
}
