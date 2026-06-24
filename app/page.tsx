import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { OurStory } from "@/components/sections/OurStory";
import { WeddingDetails } from "@/components/sections/WeddingDetails";
import { Schedule } from "@/components/sections/Schedule";
import { Gallery } from "@/components/sections/Gallery";
import { Gifting } from "@/components/sections/Gifting";
import { WellWishes } from "@/components/sections/WellWishes";
import { Faq } from "@/components/sections/Faq";
import { Rsvp } from "@/components/sections/Rsvp";
import { Footer } from "@/components/sections/Footer";
import { getApprovedWishes } from "@/lib/db";
import { formatWishDate } from "@/lib/utils";

/**
 * The page. Sections compose in full-site order. The fixed Navigation overlays
 * it; each section owns its anchor id (story · details · schedule · gallery ·
 * rsvp). Dynamic: the Well-Wishes wall is server-rendered fresh from Supabase
 * each load, so a reload always reflects the current wishes.
 */
export const dynamic = "force-dynamic";

export default async function Home() {
  const wishes = await getApprovedWishes();
  const initialWishes = wishes.map((w) => ({
    id: w.id,
    name: w.name,
    message: w.message,
    date: formatWishDate(w.created_at),
  }));

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <OurStory />
        <WeddingDetails />
        <Schedule />
        <Gallery />
        <Gifting />
        <WellWishes initialWishes={initialWishes} />
        <Faq />
        <Rsvp />
      </main>
      <Footer />
    </>
  );
}
