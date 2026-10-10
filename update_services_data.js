const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const serviceImageMapping = {
  // 01 Development & Technology
  "website-development": "/images/services3d/website.png",
  "mini-sites": "/images/services3d/website.png",
  "landing-pages": "/images/services3d/website.png",
  "e-commerce": "/images/services3d/ecommerce.png",
  "telegram-bots": "/images/services3d/bot.png",
  "software-development": "/images/services3d/software.png",
  "data-scraping": "/images/services3d/software.png",
  "process-automation": "/images/services3d/software.png",
  "api-crm-integrations": "/images/services3d/it.png",
  "ai-development": "/images/services3d/ai.png",

  // 02 SMM & Promotion
  "full-smm-promotion": "/images/services3d/smm.png",
  "account-management": "/images/services3d/smm.png",
  "content-strategy": "/images/services3d/smm.png",
  "client-acquisition": "/images/services3d/marketing.png",

  // 03 Social Media
  "instagram-promotion": "/images/services3d/marketing.png",
  "telegram-channel-promotion": "/images/services3d/bot.png",
  "tiktok-promotion": "/images/services3d/video.png",
  "youtube-promotion": "/images/services3d/video.png",
  "other-social-platforms": "/images/services3d/marketing.png",

  // 04 Content Platforms
  "yandex-zen-promotion": "/images/services3d/video.png",
  "audio-visual-platforms": "/images/services3d/video.png",

  // 05 Maps & Reputation
  "google-maps-reputation": "/images/services3d/it.png",
  "2gis-yandex-maps": "/images/services3d/it.png",
  "serm-reputation-management": "/images/services3d/it.png",

  // 06 SEO & Traffic
  "seo-promotion": "/images/services3d/seo.png",
  "seo-audit": "/images/services3d/seo.png",

  // 07 App Promotion
  "mobile-app-growth": "/images/services3d/software.png",

  // 08 Design & Creative
  "logo-branding": "/images/services3d/design.png",
  "smm-design": "/images/services3d/design.png",
  "menu-design": "/images/services3d/design.png",

  // 09 Animated Stickers
  "telegram-tgs-stickers": "/images/services3d/bot.png",
  "whatsapp-webp-stickers": "/images/services3d/bot.png",

  // 10 Media & Advertising
  "video-production": "/images/services3d/video.png",
  "targeted-advertising": "/images/services3d/marketing.png",

  // 11 Printing
  "printing-services": "/images/services3d/printing.png",

  // 12 IT & Technical Services
  "windows-installation-optimization": "/images/services3d/it.png",
  "virus-removal-pc-cleaning": "/images/services3d/it.png",
  "network-vpn-remote-access": "/images/services3d/it.png",
};

// Also custom prices in UZS numbers for easy project builder cart calculation
const servicePriceMapping = {
  "website-development": 4000000,
  "mini-sites": 1500000,
  "landing-pages": 2500000,
  "e-commerce": 7000000,
  "telegram-bots": 2000000,
  "software-development": 5000000,
  "data-scraping": 1800000,
  "process-automation": 2500000,
  "api-crm-integrations": 2000000,
  "ai-development": 3500000,

  "full-smm-promotion": 3000000,
  "account-management": 2000000,
  "content-strategy": 1500000,
  "client-acquisition": 3500000,

  "instagram-promotion": 300000,
  "telegram-channel-promotion": 250000,
  "tiktok-promotion": 250000,
  "youtube-promotion": 400000,
  "other-social-platforms": 300000,

  "yandex-zen-promotion": 350000,
  "audio-visual-platforms": 300000,

  "google-maps-reputation": 800000,
  "2gis-yandex-maps": 700000,
  "serm-reputation-management": 2500000,

  "seo-promotion": 3000000,
  "seo-audit": 1500000,

  "mobile-app-growth": 1200000,

  "logo-branding": 1500000,
  "smm-design": 800000,
  "menu-design": 1000000,

  "telegram-tgs-stickers": 300000,
  "whatsapp-webp-stickers": 200000,

  "video-production": 500000,
  "targeted-advertising": 1800000,

  "printing-services": 500000,

  "windows-installation-optimization": 150000,
  "virus-removal-pc-cleaning": 150000,
  "network-vpn-remote-access": 200000,
};

async function updateServices() {
  const services = await prisma.service.findMany({
    include: { category: true }
  });
  console.log(`Found ${services.length} services to check/update.`);

  for (const s of services) {
    const coverImage = serviceImageMapping[s.slug] || `/images/services3d/${s.category?.icon3D || "website"}.png`;
    const priceVal = servicePriceMapping[s.slug] || 1000000;

    await prisma.service.update({
      where: { id: s.id },
      data: {
        coverImage,
        priceValue: priceVal,
        status: "PUBLISHED",
      }
    });
    console.log(`Updated service: ${s.slug} -> image: ${coverImage}, price: ${priceVal}`);
  }

  console.log("All services updated successfully!");
}

updateServices()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
