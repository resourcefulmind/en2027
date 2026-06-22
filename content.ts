/**
 * content.ts — single source of editable copy for the Woven wedding site.
 *
 * Populated from context/WEDDING_SITE_CONTENT_SCRIPT.md (the approved copy).
 * Components import from here — never inline the couple's details.
 *
 * Strings in [SQUARE BRACKETS] are genuine placeholders still owed by the couple
 * (see context/WEDDING_SITE_FACTS.md §3 / §5). Swap them in one pass; do not invent.
 *
 * Names confirmed (pending final spelling sign-off): Ebere & Nnamdi. Monogram: E & N.
 */

export const content = {
  couple: {
    bride: "Ebere",
    // Family attribution shown under each hero name (casing normalized for the
    // display — confirm wording/spelling before launch).
    brideFamily:
      "From the family of Mr John Chinagrom Ibeh of Umuagba Omukwu, Onicha Ezinihitte L.G.A., Mbaise",
    groom: "Nnamdi",
    groomFamily:
      "From the family of Late Chief Sylvanus Obioha Ukanwa of Umuokoro Lude Ahiara, Ahiazu Mbaise L.G.A.",
    namesDisplay: "Ebere & Nnamdi", // ampersand renders Fraunces italic coral
    monogram: { left: "E", right: "N" }, // EN gold-foil crest (replaces TA)
    // Groom's chieftaincy title — honoured in the FOOTER formal close, not the hero.
    groomFormal: "High Chief Nnamdi Obioha",
    groomTitle: "Ikeoha 1 of Lude",
    hashtag: "[#HASHTAG]", // couple to pick; suggestions in the content script
  },

  event: {
    dateLine: "Tuesday · 5 January 2027",
    time: "1:00 PM",
    isoDateTime: "2027-01-05T13:00:00+01:00", // countdown target (WAT)
    venueName: "Central School Onicha Combine",
    venueArea: "Onicha Ezinihitte",
    venueAddress: "Onicha Ezinihitte, Mbaise, Imo State",
    footerPlace: "Onicha Ezinihitte",
    framing: "Igbo traditional marriage (Igba Nkwu)",
    mapUrl: "[map-url]",
  },

  nav: {
    links: ["Our Story", "Schedule", "Details", "Gallery"], // Gifts & FAQ intentionally excluded
    cta: "RSVP",
  },

  hero: {
    eyebrow: "TOGETHER WITH THEIR FAMILIES",
    // Invitation verb shown under the names (above the date).
    invite: "joyfully invite you to celebrate their traditional marriage",
    familyLine:
      "The family of Mr John Chinagrom Ibeh of Onicha Ezinihitte and the family of Late Chief Sylvanus Obioha Ukanwa of Lude Ahiara joyfully invite you to the traditional marriage of their children.",
    invitation: "We would be honoured to have you with us as two families become one.",
    ctaPrimary: "RSVP",
    ctaSecondary: "Our Story",
  },

  ourStory: {
    eyebrow: "OUR STORY",
    heading: "Where our story begins",
    // PLACEHOLDERS — tasteful scaffolding in the right voice; replace with the couple's real words.
    howWeMet:
      "[PLACEHOLDER — Ebere & Nnamdi's real 'how we met' story. Replace with their actual words.]",
    pullQuote:
      "And somewhere between hello and forever, we stopped counting the days apart.",
    proposal:
      "[PLACEHOLDER — the real proposal story. Replace with their actual words.]",
  },

  details: {
    eyebrow: "GOOD TO KNOW",
    heading: "The Details",
    subline: "Everything you need for the day, at a glance.",
    venue: { label: "VENUE", name: "Central School Onicha Combine", address: "Onicha Ezinihitte, Mbaise, Imo State", note: "Parking available." },
    time: { label: "TIME", time: "1:00 PM", date: "Tuesday, 5 January 2027", note: "Please arrive a little early to be seated." },
    dressCode: { label: "DRESS CODE", heading: "Coral & Gold", line: "Men: coffee brown. Women: coral / coral peach." },
    directions: {
      fromOwerri: "From Owerri: head to Achingali, turn right to Ekeoha Onicha, then Combine School.",
      fromUmuahia: "From Umuahia: head to Achingali, turn left to Ekeoha Onicha Ezinihitte, then ask for Central School Combine.",
    },
  },

  schedule: {
    eyebrow: "THE DAY",
    heading: "Order of the Day",
    subline: "How the celebration unfolds.",
    // Only the 1:00 PM start is confirmed; rest is a culturally-appropriate Igba Nkwu DRAFT.
    // [CONFIRM the real order of the day + times with the couple.]
    events: [
      { time: "1:00 PM", title: "Arrival & Welcome", note: "Guests are seated; refreshments served." },
      { time: "2:00 PM", title: "Kola & Prayers", note: "The families gather; the breaking of kola and blessings." },
      { time: "3:00 PM", title: "Igba Nkwu — The Wine Carrying", note: "The heart of the ceremony, as the bride seeks and honours her groom." },
      { time: "4:00 PM", title: "Feasting & Toasts", note: "A shared meal and words from both families." },
      { time: "5:00 PM", title: "Dancing", note: "The celebration opens to all." },
      { time: "Evening", title: "Farewell", note: "A send-off with light and song." },
    ],
    closing: "Until we dance.",
  },

  gallery: {
    eyebrow: "THROUGH THE YEARS",
    heading: "A Few of Our Favourite Moments",
    subline: "Glimpses of the road that brought us here — and of the day itself, once it is ours to keep.",
    emptyNote: "Photographs coming soon — gathered after our shoot.",
    // [PLACEHOLDER — real engagement + gallery photos pending the shoot; see FACTS §9.]
  },

  gifting: {
    eyebrow: "WITH GRATITUDE",
    heading: "Your presence is the greatest gift",
    intro:
      "Honestly, just having you there is everything. But for those who wish to bless us as we begin our home together, we've shared a few ways below.",
    naira: { label: "₦ NAIRA", accountName: "[ACCOUNT NAME]", accountNumber: "[0000000000]", bank: "[BANK NAME]" },
    foreign: { label: "FOREIGN", accountName: "[ACCOUNT NAME]", accountNumber: "[0000000000]", bank: "[BANK NAME]", iban: "[IBAN]", swift: "[SWIFT]" }, // confirm Euro or Dollar
    registry: { line: "Prefer to gift an item? Visit our registry.", cta: "VIEW OUR REGISTRY", url: "[registry-url]" },
  },

  wishes: {
    eyebrow: "WITH LOVE",
    heading: "Send them your love",
    intro:
      "A blessing, a prayer, or a memory — share a few warm words for Ebere & Nnamdi as they begin their life together.",
    submitCta: "Share your wish",
    toast: "Thank you — your wish has been shared.",
    emptyState: "Be the first to leave a wish for Ebere & Nnamdi.",
    seeded: [
      { name: "Aunty Ngozi", message: "May your home always be full of laughter, good food, and a love that grows sweeter every year." },
      { name: "Chidi & Ada", message: "From one couple to another — protect your evenings and never go to bed angry. Congratulations!" },
      { name: "Uncle Bayo", message: "A blessing on this union. May God keep you and crown every season of your lives together." },
    ],
  },

  faq: {
    eyebrow: "GOOD TO KNOW",
    heading: "Questions & Answers",
    subline: "A few things to help you plan your day with us. Tap any question to see the answer.",
    tiers: [
      {
        label: "THE ESSENTIALS",
        items: [
          { q: "What should I wear?", a: "Our colours are coral, coffee brown and gold. Men: coffee brown. Women: coral / coral peach. Come ready to celebrate." },
          { q: "When and where is it?", a: "Tuesday, 5 January 2027, at 1:00 PM — Central School Onicha Combine, Onicha Ezinihitte, Mbaise. Directions are in the Details section above." },
          { q: "Is this the traditional ceremony or the white wedding?", a: "This is our traditional marriage (Igba Nkwu) — one celebration, one venue." },
          { q: "How do I RSVP, and by when?", a: "Please RSVP using the form on this site by [RSVP DEADLINE]." },
        ],
      },
      {
        label: "GETTING THERE",
        items: [
          { q: "Is there parking?", a: "Yes — parking is available at the venue." },
          { q: "Where can I stay?", a: "For guests travelling in, here are a few places near the venue. [HOTEL LIST — pending]" },
          { q: "Can I bring a guest or plus-one?", a: "Plus-ones are welcome. Please indicate your guest count when you RSVP. [confirm any limit]" },
        ],
      },
      {
        label: "GOOD TO KNOW",
        items: [
          { q: "Are children welcome?", a: "Yes — children are welcome to celebrate with us." },
          { q: "What gifts would the couple appreciate?", a: "Your presence is the greatest gift. For those who wish to give more, see the Gifting section for our registry and account details." },
          { q: "Is there a wedding hashtag?", a: "Yes — [#HASHTAG]. Share your photos using it!" },
          { q: "Who do I contact with questions?", a: "[CONTACT NAME + PHONE/WHATSAPP — pending]" },
        ],
      },
    ],
    closing: "Still have a question? Reach out to [CONTACT].",
  },

  footer: {
    closingLine: "We can't wait to celebrate with you.",
    // Formal honour: groom's title lives here, with dignity.
    formalHonour: "High Chief Nnamdi Obioha · Ikeoha 1 of Lude",
    dateLine: "5 January 2027 · Onicha Ezinihitte",
  },

  rsvp: {
    eyebrow: "JOIN US",
    heading: "Kindly Respond",
    subline: "We'd be honoured to celebrate with you. Please let us know by [RSVP DEADLINE].",
    accept: "Joyfully accepts",
    decline: "Regretfully declines",
    declineNote: "We'll miss you — but thank you for letting us know.",
    submitCta: "Send our RSVP",
    successYes: "Thank you, {name} — we can't wait to celebrate with you!",
    successNo: "We'll miss you, {name} — thank you for letting us know.",
  },
} as const;

export type Content = typeof content;
