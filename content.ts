/**
 * content.ts: single source of editable copy for the Woven wedding site.
 *
 * Populated from context/WEDDING_SITE_CONTENT_SCRIPT.md (the approved copy).
 * Components import from here. Never inline the couple's details.
 *
 * Names confirmed: Ebere & Nnamdi. Monogram: E & N. Family honour confirmed:
 * Ibeh is the bride's family (named first), Obioha Ukanwa the groom's.
 */

export const content = {
  couple: {
    bride: "Ebere",
    // Family attribution shown under each hero name, in gold. Bride's family first.
    brideFamily:
      "From the family of Mr John Chinagorom Ibeh of Umuagba Omukwu, Onicha Ezinihitte L.G.A., Mbaise",
    groom: "Nnamdi",
    groomFamily:
      "From the family of Late Chief Sylvanus Obioha Ukanwa of Umuokoro, Lude Ahiara, Ahiazu Mbaise L.G.A.",
    namesDisplay: "Ebere & Nnamdi", // ampersand renders Fraunces italic coral
    monogram: { left: "E", right: "N" }, // EN gold-foil crest
    // Groom's full title, honoured in the FOOTER formal close, not the hero.
    groomFormal: "High Chief Nnamdi Johnson Obioha",
    groomTitle: "Ikeoha 1 of Lude",
    hashtag: "#MEETHEOBIOHAS",
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
    // Blank = "Open in Maps" auto-searches the venue name + address (same as the
    // hotels). Paste a specific Google Maps pin here later to override.
    mapUrl: "",
  },

  nav: {
    links: ["Our Story", "Details", "Schedule", "Gallery"], // page order; Gifts & FAQ intentionally excluded
    cta: "RSVP",
  },

  hero: {
    eyebrow: "TOGETHER WITH THEIR FAMILIES",
    // Invitation verb shown under the names (above the date).
    invite: "joyfully invite you to celebrate their traditional marriage",
    familyLine:
      "The family of Mr John Chinagorom Ibeh of Umuagba Omukwu, Onicha Ezinihitte, and the family of Late Chief Sylvanus Obioha Ukanwa of Umuokoro, Lude Ahiara, joyfully invite you to the traditional marriage of their children.",
    invitation: "We would be honoured to have you with us as two families become one.",
    ctaPrimary: "RSVP",
    ctaSecondary: "Our Story",
  },

  ourStory: {
    eyebrow: "OUR STORY",
    heading: "Where our story begins",
    lede: "Every love has its beginning: a first glance, a first word, a moment that quietly changed everything. Here is a little of ours.",
    beats: {
      howWeMet: {
        label: "How We Met",
        heading: "Where we began",
        photo: {
          src: "/images/story-1.jpg",
          alt: "Nnamdi holding Ebere from behind on the beach at sunset, his cheek against hers, both smiling with eyes closed.",
        },
        body: [
          "It began in January 2026, at the opening of Nnamdi's sister Jennifer's shop. Ebere was there among family, moving through the room, helping wherever she was needed. Nnamdi noticed her before she ever noticed him, and quietly decided, right there, that he had found her.",
          "He wasted no time telling her so. \"Ebere, I'll marry you,\" he would say, again and again, until the teasing became a promise. She thought it was all too fast, too good to be quite true. Then came an afternoon by the beach, and whatever small doubt remained was gone: this was the woman he would build a life with.",
        ],
      },
      proposal: {
        label: "The Proposal",
        heading: "The question",
        photo: {
          src: "/images/story-2.jpg",
          alt: "Ebere on the phone late at night by lamplight, eyes closed and smiling, her engagement ring on the hand resting on her knee.",
        },
        body: [
          "The distance between them meant the question came the way so many of their evenings did: over the phone, late into the night, just the two of them. Mid-conversation, Nnamdi asked. A ring followed soon after, sent ahead of him until he could place it on her hand himself.",
          "She said yes, a big one. His sisters, who had loved her from the start, were hardly surprised; they had been calling her \"Mrs\" long before the question was ever asked. By the next morning her phone had not stopped ringing, full of everyone who had been waiting for this. He calls her Oguguom, his gift from God, and now the whole family agrees.",
        ],
      },
    },
    pullQuote: "I no tell you say I go marry you.",
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
    // Order of the day + times confirmed by the couple.
    events: [
      { time: "1:00 PM", title: "Arrival & Welcome", note: "Guests are seated; refreshments served." },
      { time: "2:00 PM", title: "Kola & Prayers", note: "The families gather; the breaking of kola and blessings." },
      { time: "3:00 PM", title: "Igba Nkwu: The Wine Carrying", note: "The heart of the ceremony, as the bride seeks and honours her groom." },
      { time: "4:00 PM", title: "Feasting & Toasts", note: "A shared meal and words from both families." },
      { time: "5:00 PM", title: "Dancing", note: "The celebration opens to all." },
      { time: "Evening", title: "Farewell", note: "A send-off with light and song." },
    ],
    closing: "Until we dance.",
  },

  gallery: {
    eyebrow: "THROUGH THE YEARS",
    heading: "A Few of Our Favourite Moments",
    subline: "Glimpses of the road that brought us here, and of the day itself, once it is ours to keep.",
    // First entry is the wide feature tile; `aspect` drives the masonry layout.
    // A tile without `src` is left out of the gallery until it has one. Frame plan and file
    // names: context/photo-direction.md. `position` keeps the couple in frame
    // where the slot crops (the feature tile is 3:2 on phones).
    tiles: [
      {
        caption: "A wide, unhurried moment",
        aspect: "21 / 9",
        feature: true,
        src: "/images/gallery-01.jpg",
        alt: "Ebere and Nnamdi walking barefoot along the shore at sunset, his arm around her shoulders, laughing as they look at each other.",
        position: "85% 50%",
      },
      { caption: "Golden hour", aspect: "4 / 5" },
      {
        caption: "A quiet portrait",
        aspect: "1 / 1",
        src: "/images/gallery-03.jpg",
        alt: "Ebere smiling in a coral off-the-shoulder dress and a gold butterfly pendant, against an ivory backdrop.",
      },
      {
        caption: "Hand in hand",
        aspect: "3 / 4",
        src: "/images/gallery-04.jpg",
        alt: "Ebere's hand, wearing her engagement ring, resting on Nnamdi's against coral and coffee-brown sleeves.",
      },
      { caption: "In our colours", aspect: "5 / 4" },
      {
        caption: "The groom",
        aspect: "3 / 4",
        src: "/images/gallery-06.jpg",
        alt: "Nnamdi in a coffee-brown kaftan with gold embroidery, standing in soft window light.",
      },
      { caption: "Laughter", aspect: "4 / 5" },
      {
        caption: "A stolen glance",
        aspect: "1 / 1",
        src: "/images/gallery-08.jpg",
        alt: "Ebere and Nnamdi relaxing on a beach lounger at sunset, Nnamdi looking up at Ebere as she smiles.",
      },
    ],
  },

  gifting: {
    eyebrow: "WITH GRATITUDE",
    heading: "Your presence is the greatest gift",
    intro:
      "Nothing means more to us than having you there. For those who would also like to bless the home we are beginning, we have gathered a few ways below.",
    naira: { label: "₦ NAIRA", accountName: "Ebere Ibeawuchi Ezinma", accountNumber: "0037205514", bank: "GTBank" },
    // The registry is a store-run Google Form (pick items, pay the store, send the receipt on WhatsApp).
    // `qr` is a static code generated straight to `url`, so it never depends on a redirect service.
    registry: {
      line: "Prefer to gift an item? Visit our registry.",
      cta: "VIEW OUR REGISTRY",
      url: "https://docs.google.com/forms/d/e/1FAIpQLScetm0GWMU3iN4mE5ysk1IRiHJgzHS2efSkh_0thUEWM6JFKA/viewform",
      qr: "/images/registry-qr.svg",
      qrLine: "Or scan to open it on your phone",
    },
  },

  wishes: {
    eyebrow: "WITH LOVE",
    heading: "Send them your love",
    intro:
      "A blessing, a prayer, or a memory. Leave Ebere and Nnamdi a few words to carry into their new life together.",
    submitCta: "Share your wish",
    wallHeading: "Their Well-Wishes",
    toast: "Thank you! Your wish has been shared.",
    emptyState: "Be the first to leave a wish for Ebere & Nnamdi.",
  },

  faq: {
    eyebrow: "GOOD TO KNOW",
    heading: "Questions & Answers",
    subline: "A few things to help you plan your day with us. Tap any question to see the answer.",
    tiers: [
      {
        label: "THE ESSENTIALS",
        items: [
          { q: "What should I wear?", a: "Our colours are coral, coffee brown, and gold. We'd love the men in coffee brown and the women in coral or coral peach. Most of all, come ready to celebrate." },
          { q: "When and where is it?", a: "Tuesday, 5 January 2027, at 1:00 PM, at Central School Onicha Combine, Onicha Ezinihitte, Mbaise. You'll find directions in the Details above.", links: [{ label: "Details", to: "details" }] },
          { q: "Is this the traditional ceremony or the white wedding?", a: "This is our traditional marriage, our Igba Nkwu. One celebration, one day, one venue." },
          { q: "How do I RSVP?", a: "Just fill in the RSVP form below. There's no strict deadline, but the sooner you let us know, the better we can plan to welcome you.", links: [{ label: "RSVP form", to: "rsvp" }] },
        ],
      },
      {
        label: "GETTING THERE",
        items: [
          { q: "Is there parking?", a: "Yes, there's parking at the venue." },
          {
            q: "Where can I stay?",
            a: "For guests travelling in, here are a few comfortable places near the venue:",
            hotels: [
              { name: "Frostaro Hotel", area: "Achingali, Obowo", mapQuery: "Frostaro Hotel, Achingali, Obowo, Imo State" },
              { name: "Omenma Hotels", area: "Oparachi Mbaukwu, Ihitte Ezinihitte", mapQuery: "Omenma Hotels, 1 Omenma Avenue, Oparachi Mbaukwu, Ihitte Ezinihitte, Mbaise, Imo State" },
              { name: "Chris VI Hotels & Resort", area: "Ahiara Junction, Ahiazu Mbaise", mapQuery: "Chris VI Hotels and Resort, Owerri-Umuahia Road, Ahiazu Mbaise, Imo State" },
            ],
          },
          { q: "Can I bring a guest or plus-one?", a: "Loved ones are welcome. Please tell us your numbers when you RSVP, so we can seat everyone comfortably." },
        ],
      },
      {
        label: "GOOD TO KNOW",
        items: [
          { q: "Are children welcome?", a: "Yes, very much. Children are welcome to celebrate with us." },
          { q: "What gifts would the couple appreciate?", a: "Your presence is the greatest gift. For those who'd like to do more, the Gifting section holds our registry and account details.", links: [{ label: "Gifting section", to: "gifting" }] },
          { q: "Is there a wedding hashtag?", a: "Yes. Tag your photos with #MEETHEOBIOHAS so we can relive the day through your eyes." },
          {
            q: "Who do I contact with questions?",
            a: "For anything at all, these lovely people will be glad to help. Mr Obinna and Mrs Akudo are your first ports of call.",
            contacts: [
              { name: "Mr Obinna", tel: "+2348030578336", display: "+234 803 057 8336" },
              { name: "Mrs Akudo", tel: "+2348036614909", display: "+234 803 661 4909" },
              { name: "Mrs Onyi", tel: "+2348037849690", display: "+234 803 784 9690" },
              { name: "Mrs Peggy Azeez", tel: "+2348080277281", display: "+234 808 027 7281" },
            ],
          },
        ],
      },
    ],
    closing: "Still wondering about something? Reach out to Mr Obinna or Mrs Akudo and we'll gladly help.",
    closingLinks: [
      { label: "Mr Obinna", to: "tel:+2348030578336" },
      { label: "Mrs Akudo", to: "tel:+2348036614909" },
    ],
  },

  footer: {
    closingLine: "We can't wait to celebrate with you.",
    // Formal honour: groom's full title lives here, with dignity.
    formalHonour: "High Chief Nnamdi Johnson Obioha · Ikeoha 1 of Lude",
    dateLine: "5 January 2027 · Onicha Ezinihitte",
    // Builder's credit, approved by Ebere. WhatsApp number in international
    // digits only (no +, spaces or leading 0).
    credit: {
      by: "Website by Opeyemi Bangkok",
      cta: "Want one for your celebration? Chat on WhatsApp",
      whatsapp: "2347018112594",
      message: "Hello Opeyemi, I saw Ebere & Nnamdi's wedding website and I'd love one for my celebration.",
    },
  },

  rsvp: {
    eyebrow: "JOIN US",
    heading: "Kindly Respond",
    subline: "We would be honoured to have you with us. Kindly let us know whether you can join us.",
    accept: "Joyfully accepts",
    decline: "Regretfully declines",
    declineNote: "We'll miss you, but thank you for letting us know.",
    submitCta: "Send our RSVP",
    successYes: "Thank you, {name}. We can't wait to celebrate with you!",
    successYesMsg: "Your reply is safely with us. We'll share the final details closer to the day. Until then, come ready to dance.",
    successNo: "We'll miss you, {name}. Thank you for letting us know.",
    successNoMsg: "You'll be with us in spirit, and in our hearts on the day.",
    acceptSub: "We'll be there to celebrate",
    declineSub: "We can't make it this time",
    // Gentle gift nudge in the success modal, accept path only.
    giftPrompt: "Thinking of a gift for our new home?",
    giftCta: "Gift Us",
  },
} as const;

export type Content = typeof content;
