const fetch = require("node-fetch");

const STRAPI_URL = "https://ibs-cms.onrender.com"; // OR your live backend if using token from Render
const TOKEN = "80aa54194c5b51d089f487894c1abbdf5b2787ee9b1423f5d4c76c00049d509ddd8fe84362b5ba72cf48ad865ba203f81bee5d1415f123741aea4cf60b09f65ae9217e16959546d3d33cb105e9ad1c33590d0ebb33066359487522846dbf4c3cf2a55dbd00ecbd5b32970ccdbf0304ff3923634c01d0b7798c60b97b782d1f62"; // from Strapi Admin > API Tokens

const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  };
  
  async function createEntry(endpoint, payload) {
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ data: payload }),
    });
    const data = await res.json();
    console.log(`✅ Created ${endpoint}:`, data?.data?.id || data?.error || data);
  }
  
  // 📝 Blogs (has slug)
  const blogs = [
    {
      title: "Digital Treasury Trends 2025",
      content: "Exploring the latest in automation and liquidity management.",
      slug: "digital-treasury-trends-2025",
      publish_date: new Date().toISOString(),
    },
    {
      title: "AI in Cash Flow Forecasting",
      content: "How AI is enhancing accuracy and speed in forecasts.",
      slug: "ai-in-cash-flow",
      publish_date: new Date().toISOString(),
    },
  ];
  
  // 🏆 Awards (no image now)
  const awards = [
    {
      title: "Innovation in Treasury 2024",
      award_date: "2024-06-01",
    },
  ];
  
  // 📚 Case Studies (no slug)
  const caseStudies = [
    {
      title: "NBFC Digitization Success",
      summary: "Credit Saison improved reporting by 50% with IBSFINtech.",
      Topic: "NBFCs & Fintech",
    },
  ];
  
  // 🎫 Events (no slug)
  const events = [
    {
      title: "Global Treasury Conclave 2025",
      description: "Join top CFOs and Treasury leaders in Singapore.",
      event_date: new Date("2025-08-01T09:00:00Z").toISOString(),
      location: "Marina Bay Sands, Singapore",
    },
  ];
  
  async function seedAll() {
    for (let blog of blogs) await createEntry("blogs", blog);
    for (let award of awards) await createEntry("awards", award);
    for (let caseStudy of caseStudies) await createEntry("case-studies", caseStudy);
    for (let event of events) await createEntry("events", event);
  }
  
  seedAll();
