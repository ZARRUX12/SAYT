const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding TARGET PRO database...");

  // 1. Admin user
  const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@targetpro.uz";
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || "TargetPro2026!Admin";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword },
    create: {
      email: adminEmail,
      name: "Администратор TARGET PRO",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });
  console.log("Admin user created/verified.");

  // 2. Site Settings
  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "TARGET PRO",
      slogan: "ТЕХНОЛОГИИ, РЕКЛАМА И АВТОМАТИЗАЦИЯ ДЛЯ ВАШЕГО БИЗНЕСА",
      phone: "+998932368910",
      telegram: "@Mr_Zarrux",
      telegramUrl: "https://t.me/Mr_Zarrux",
      phoneUrl: "tel:+998932368910",
      email: "info@targetpro.uz",
      address: "г. Ташкент, Узбекистан",
      country: "Узбекистан",
      city: "Ташкент",
      logoUrl: "/logo.png",
      faviconUrl: "/favicon.png",
      copyright: "© TARGET PRO. Все права защищены.",
      metaTitle: "TARGET PRO — Технологии, Реклама и Автоматизация для вашего бизнеса",
      metaDescription: "Цифровая платформа полного цикла: разработка сайтов, Telegram-ботов, AI, автоматизация, SMM и IT-сервисы.",
    },
  });

  // 3. Owner Profile
  await prisma.ownerProfile.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      name: "Зарух",
      surname: "TARGET PRO",
      position: "Основатель & Руководитель TARGET PRO",
      photoUrl: "/logo.png",
      shortBio: "Создаем высокотехнологичные цифровые продукты, автоматизацию и маркетинг для масштабирования бизнеса в Узбекистане и на международном рынке.",
      fullBio: "TARGET PRO объединяет передовой IT-инжиниринг, внедрение искусственного интеллекта и результативный performance-маркетинг. Наша миссия — предоставить бизнесу надежные инструменты роста нового поколения: от веб-систем до автоматизированных AI-агентов и комплексного продвижения.",
      phone: "+998932368910",
      telegram: "@Mr_Zarrux",
      email: "info@targetpro.uz",
      social: JSON.stringify({
        telegram: "https://t.me/Mr_Zarrux",
        phone: "tel:+998932368910"
      }),
    },
  });

  // 4. Location
  await prisma.location.upsert({
    where: { id: "default" },
    update: {
      country: "Узбекистан",
      city: "Самарканд",
      address: "г. Самарканд, Узбекистан",
      zipCode: "140100",
      latitude: 39.654167,
      longitude: 66.959722,
      googleMapsUrl: "https://maps.google.com/?q=39.654167,66.959722",
      osmUrl: "https://www.openstreetmap.org/#map=16/39.654167/66.959722",
      workingHours: "Без выходных, 24/7",
    },
    create: {
      id: "default",
      country: "Узбекистан",
      city: "Самарканд",
      address: "г. Самарканд, Узбекистан",
      zipCode: "140100",
      latitude: 39.654167,
      longitude: 66.959722,
      googleMapsUrl: "https://maps.google.com/?q=39.654167,66.959722",
      osmUrl: "https://www.openstreetmap.org/#map=16/39.654167/66.959722",
      workingHours: "Без выходных, 24/7",
    },
  });

  // 5. Navigation Items
  const navItems = [
    { title: "Главная", url: "/", order: 1 },
    { title: "Услуги", url: "/services", order: 2 },
    { title: "Решения", url: "/solutions", order: 3 },
    { title: "Портфолио", url: "/portfolio", order: 4 },
    { title: "AI & Автоматизация", url: "/ai", order: 5 },
    { title: "Калькулятор", url: "/calculator", order: 6 },
    { title: "О компании", url: "/about", order: 7 },
    { title: "Контакты", url: "/contact", order: 8 },
  ];

  for (const item of navItems) {
    const existing = await prisma.navigationItem.findFirst({ where: { url: item.url } });
    if (!existing) {
      await prisma.navigationItem.create({ data: item });
    }
  }

  // 6. Social Links
  const socialLinks = [
    { platform: "Telegram", url: "https://t.me/Mr_Zarrux", icon: "Send", order: 1 },
    { platform: "Instagram", url: "https://instagram.com", icon: "Instagram", order: 2 },
    { platform: "YouTube", url: "https://youtube.com", icon: "Youtube", order: 3 },
    { platform: "Facebook", url: "https://facebook.com", icon: "Facebook", order: 4 },
  ];

  for (const s of socialLinks) {
    const existing = await prisma.socialLink.findFirst({ where: { platform: s.platform } });
    if (!existing) {
      await prisma.socialLink.create({ data: s });
    }
  }

  // 7. Statistics
  const stats = [
    { name: "Успешных проектов", value: "150", suffix: "+", description: "Сайты, боты и комплексный маркетинг", order: 1 },
    { name: "Категорий услуг", value: "12", suffix: "", description: "Полная экосистема для роста бизнеса", order: 2 },
    { name: "Платформ продвижения", value: "10", suffix: "+", description: "Instagram, Telegram, YouTube, Maps и др.", order: 3 },
    { name: "Поддержка клиентов", value: "24/7", suffix: "", description: "Быстрое реагирование и надежность", order: 4 },
  ];

  for (const stat of stats) {
    const existing = await prisma.statistic.findFirst({ where: { name: stat.name } });
    if (!existing) {
      await prisma.statistic.create({ data: stat });
    }
  }

  // 8. Categories & Services
  const categoriesData = [
    {
      number: "01",
      name: "DEVELOPMENT & TECHNOLOGY",
      slug: "development-technology",
      description: "Создание сайтов, веб-приложений, Telegram-ботов, AI-интеграций и автоматизации.",
      icon3D: "website",
      order: 1,
      services: [
        {
          title: "Создание сайтов",
          slug: "website-development",
          shortDesc: "Корпоративные сайты и веб-системы премиум-уровня с высокой конверсией.",
          fullDesc: "Полный цикл проектирования и разработки корпоративных сайтов: архитектура, премиальный UI/UX дизайн, высокая скорость работы и адаптивность под все устройства.",
          features: ["Индивидуальный дизайн", "SEO-оптимизация", "Интеграция с CRM и аналитикой", "Удобная панель управления"],
          priceMode: "FROM",
          priceLabel: "От 4 000 000 UZS",
          tags: "сайт, разработка, веб, nextjs, react",
        },
        {
          title: "Мини-сайты",
          slug: "mini-sites",
          shortDesc: "Быстрые одностраничные сайты-визитки для экспертов и малого бизнеса.",
          fullDesc: "Компактные и эффективные мини-сайты, оптимизированные для мобильного трафика и переходов из социальных сетей.",
          features: ["Быстрый запуск за 3-5 дней", "Мобильная адаптация", "Кнопки связи в мессенджерах", "Высокая скорость загрузки"],
          priceMode: "FROM",
          priceLabel: "От 1 500 000 UZS",
          tags: "мини-сайт, визитка, taplink, портфолио",
        },
        {
          title: "Landing pages",
          slug: "landing-pages",
          shortDesc: "Продающие посадочные страницы с акцентом на максимальную конверсию в заявку.",
          fullDesc: "Лендинги с мощной структурой, сильным копирайтингом и маркетинговыми триггерами для запуска рекламных кампаний.",
          features: ["Маркетинговый анализ ниши", "A/B тестирование", "Интеграция пикселей рекламы", "Анимации и захват внимания"],
          priceMode: "FROM",
          priceLabel: "От 2 500 000 UZS",
          tags: "landing, лендинг, конверсия, реклама",
        },
        {
          title: "Интернет-магазины",
          slug: "e-commerce",
          shortDesc: "Масштабируемые интернет-магазины с каталогом, корзиной и приемом платежей.",
          fullDesc: "Платформы электронной коммерции любой сложности: синхронизация с 1С/складом, платежные системы Click, Payme, Uzum, Uzcard.",
          features: ["Каталог с фильтрами", "Платежные шлюзы Payme/Click", "Личный кабинет клиента", "Управление заказами"],
          priceMode: "FROM",
          priceLabel: "От 7 000 000 UZS",
          tags: "магазин, e-commerce, payme, click, товары",
        },
        {
          title: "Telegram-боты",
          slug: "telegram-bots",
          shortDesc: "Умные Telegram-боты для заказов, рассылок, воронок продаж и поддержки клиентов.",
          fullDesc: "Разработка многофункциональных Telegram-ботов с интеграцией баз данных, платежей, WebApp интерфейсов и CRM.",
          features: ["Telegram WebApp (Mini Apps)", "Автоматизация заявок", "Интеграция с платежами", "Панель администратора в боте"],
          priceMode: "FROM",
          priceLabel: "От 2 000 000 UZS",
          tags: "telegram, бот, bot, автоматизация, webapp",
        },
        {
          title: "Разработка софта и программ",
          slug: "software-development",
          shortDesc: "Индивидуальное ПО для автоматизации бизнес-процессов, десктоп и веб-софт.",
          fullDesc: "Проектирование и создание заказного программного обеспечения, систем внутреннего учета и автоматизированных утилит.",
          features: ["Архитектурный анализ", "Индивидуальный функционал", "Высокая безопасность данных", "Техническая поддержка"],
          priceMode: "CUSTOM",
          priceLabel: "Индивидуально",
          tags: "софт, программы, разработка, backend, crm",
        },
        {
          title: "Парсинг и сбор данных",
          slug: "data-scraping",
          shortDesc: "Автоматизированный парсинг сайтов, баз данных, маркетплейсов и каталогов.",
          fullDesc: "Разработка надежных парсеров для сбора контактов, мониторинга цен конкурентов, аналитики ассортимента и структурирования информации.",
          features: ["Обход защит и капчи", "Выгрузка в Excel/JSON/DB", "Регулярное автообновление", "Очистка и валидация данных"],
          priceMode: "FROM",
          priceLabel: "От 1 800 000 UZS",
          tags: "парсинг, сбор данных, scraper, python, аналитика",
        },
        {
          title: "Автоматизация процессов",
          slug: "process-automation",
          shortDesc: "Связка сервисов, авто-обработка заявок, уведомления в мессенджеры и CRM.",
          fullDesc: "Комплексная автоматизация рутинных задач: синхронизация лидов, генерация документов, отчеты и триггерные сценарии.",
          features: ["Экономия времени сотрудников", "Исключение человеческих ошибок", "Сквозные сценарии работы", "Уведомления в реальном времени"],
          priceMode: "FROM",
          priceLabel: "От 2 500 000 UZS",
          tags: "автоматизация, интеграция, webhook, боты",
        },
        {
          title: "API и CRM интеграции",
          slug: "api-crm-integrations",
          shortDesc: "Подключение AmoCRM, Bitrix24, МойСклад, 1С, телефонии и внешних API.",
          fullDesc: "Настройка стабильного обмена данными между вашим сайтом, CRM-системой, телефонией и учетными программами.",
          features: ["Двусторонняя синхронизация", "Автосоздание сделок и лидов", "Логирование ошибок", "Безопасная передача данных"],
          priceMode: "FROM",
          priceLabel: "От 2 000 000 UZS",
          tags: "api, crm, amocrm, bitrix24, интеграция",
        },
        {
          title: "AI-разработка",
          slug: "ai-development",
          shortDesc: "Внедрение искусственного интеллекта: GPT-ассистенты, боты-консультанты, анализ данных.",
          fullDesc: "Разработка и интеграция кастомных решений на базе современных LLM-моделей: корпоративные базы знаний, умные операторы чата.",
          features: ["Обучение на базе знаний компании", "Экономия на операторах поддержки", "Круглосуточные консультации", "Интеграция в Telegram и сайты"],
          priceMode: "FROM",
          priceLabel: "От 3 500 000 UZS",
          tags: "ai, gpt, нейросети, искусственный интеллект, бот",
        },
      ],
    },
    {
      number: "02",
      name: "SMM & PROMOTION",
      slug: "smm-promotion",
      description: "Комплексный маркетинг, ведение аккаунтов, контент-стратегия и привлечение клиентов.",
      icon3D: "smm",
      order: 2,
      services: [
        {
          title: "Комплексное продвижение",
          slug: "full-smm-promotion",
          shortDesc: "Стратегия, контент, визуал, таргетинг и системный рост продаж из соцсетей.",
          fullDesc: "Полное ведение бизнеса в цифровой среде: анализ конкурентов, разработка контент-плана, съемка, оформление и привлечение целевых клиентов.",
          features: ["Команда специалистов под ключ", "Контент-стратегия на месяц", "Таргетированная реклама", "Еженедельная аналитика"],
          priceMode: "FROM",
          priceLabel: "От 3 000 000 UZS/мес",
          tags: "smm, продвижение, маркетинг, соцсети",
        },
        {
          title: "Ведение аккаунтов",
          slug: "account-management",
          shortDesc: "Регулярный постинг, Stories, Reels, оформление ленты и коммуникация.",
          fullDesc: "Профессиональное администрирование ваших профилей: сохранение единого фирменного стиля, публикация материалов и вовлечение подписчиков.",
          features: ["Единый визуальный стиль", "Ежедневные Stories", "Копирайтинг постов", "Модерация комментариев"],
          priceMode: "FROM",
          priceLabel: "От 2 000 000 UZS/мес",
          tags: "ведение, аккаунты, контент, instagram",
        },
        {
          title: "Контент-стратегия",
          slug: "content-strategy",
          shortDesc: "Разработка смысловой архитектуры контента для роста охватов и продаж.",
          fullDesc: "Позиционирование бренда, выявление болей аудитории, рубрикаторы и сценарные воронки для прогрева потенциальных покупателей.",
          features: ["Анализ целевой аудитории", "Рубрикатор и матрица тем", "Сценарии для Reels и Stories", "Гайдлайны по тону общения"],
          priceMode: "FROM",
          priceLabel: "От 1 500 000 UZS",
          tags: "стратегия, контент, маркетинг, аудит",
        },
        {
          title: "Привлечение клиентов и масштабирование",
          slug: "client-acquisition",
          shortDesc: "Генерация целевых заявок и масштабирование рекламных бюджетов с окупаемостью.",
          fullDesc: "Построение воронки привлечения лидов через социальные сети и поисковые каналы с прозрачным учетом стоимости клиента (CPA).",
          features: ["Сквозной расчет ROI/ROAS", "Оптимизация рекламных связок", "Лидогенерация в CRM", "Масштабирование без слива бюджета"],
          priceMode: "CUSTOM",
          priceLabel: "Индивидуально",
          tags: "лиды, реклама, масштабирование, заявки",
        },
      ],
    },
    {
      number: "03",
      name: "SOCIAL MEDIA",
      slug: "social-media",
      description: "Продвижение и активность во всех ключевых соцсетях: Instagram, Telegram, TikTok, YouTube и др.",
      icon3D: "marketing",
      order: 3,
      services: [
        {
          title: "Instagram продвижение",
          slug: "instagram-promotion",
          shortDesc: "Подписчики, лайки, просмотры Reels, Stories, комментарии и охват.",
          fullDesc: "Комплексное увеличение активности в Instagram: повышение вовлеченности (ER), вывод роликов в рекомендации и рост доверия к аккаунту.",
          features: ["Живая активность", "Органический буст Reels", "Повышение доверия аудитории", "Безопасные методы"],
          priceMode: "FROM",
          priceLabel: "От 300 000 UZS",
          tags: "instagram, подписчики, лайки, reels, stories",
        },
        {
          title: "Telegram продвижение",
          slug: "telegram-channel-promotion",
          shortDesc: "Привлечение аудитории в каналы, просмотры публикаций, реакции и активность.",
          fullDesc: "Развитие каналов и групп в Telegram: целевые подписчики, повышение охвата публикаций, реакции и вовлечение.",
          features: ["Быстрый старт", "Стабильный рост охватов", "Реакции и просмотры", "Удержание аудитории"],
          priceMode: "FROM",
          priceLabel: "От 250 000 UZS",
          tags: "telegram, канал, подписчики, просмотры, реакции",
        },
        {
          title: "TikTok продвижение",
          slug: "tiktok-promotion",
          shortDesc: "Просмотры, лайки, подписчики и вывод видео в тренды и рекомендации TikTok.",
          fullDesc: "Стимулирование алгоритмов TikTok для органического взлета видеороликов, прирост целевых фолловеров и репостов.",
          features: ["Быстрый вывод в рекомендации", "Рост просмотров и лайков", "Аудитория под ваш регион", "Полная безопасность аккаунта"],
          priceMode: "FROM",
          priceLabel: "От 250 000 UZS",
          tags: "tiktok, просмотры, тренды, рекомендации, лайки",
        },
        {
          title: "YouTube продвижение",
          slug: "youtube-promotion",
          shortDesc: "Подписчики, просмотры длинных видео и Shorts, часы просмотров для монетизации.",
          fullDesc: "Продвижение каналов на YouTube: вывод роликов в топ поиска и похожие видео, набор 4000 часов и 1000 подписчиков.",
          features: ["Удержание аудитории", "Shorts и стандартные видео", "Оптимизация тегов и заголовков", "Подготовка к монетизации"],
          priceMode: "FROM",
          priceLabel: "От 400 000 UZS",
          tags: "youtube, просмотры, подписчики, shorts, монетизация",
        },
        {
          title: "Продвижение в Facebook, VK, X, Twitch",
          slug: "other-social-platforms",
          shortDesc: "Охваты, подписчики и активность на дополнительных социальных платформах.",
          fullDesc: "Работа с международными и региональными сетями: Facebook бизнес-страницы, сообщества ВКонтакте, аккаунты X (Twitter), стримы Twitch.",
          features: ["Широкий спектр сетей", "Индивидуальный подбор пакетов", "Отслеживание статистики", "Быстрая скорость выполнения"],
          priceMode: "FROM",
          priceLabel: "От 300 000 UZS",
          tags: "facebook, vk, twitch, twitter, x, соцсети",
        },
      ],
    },
    {
      number: "04",
      name: "CONTENT PLATFORMS",
      slug: "content-platforms",
      description: "Продвижение на контентных и медийных площадках: Дзен, Pinterest, SoundCloud, Shazam.",
      icon3D: "video",
      order: 4,
      services: [
        {
          title: "Яндекс Дзен",
          slug: "yandex-zen-promotion",
          shortDesc: "Статьи, дочитывания, подписчики каналов и вывод публикаций в ленту рекомендаций.",
          fullDesc: "Продвижение контента на Яндекс Дзен: набор аудитории, рост дочитываний и увеличение поведенческих факторов.",
          features: ["Рост дочитываний", "Тематический таргетинг", "Прирост подписчиков", "Аналитика динамики"],
          priceMode: "FROM",
          priceLabel: "От 350 000 UZS",
          tags: "дзен, яндекс, статьи, контент",
        },
        {
          title: "Pinterest, SoundCloud, Shazam, ASKfm",
          slug: "audio-visual-platforms",
          shortDesc: "Прослушивания треков, распознавания в Shazam, пины и трафик из Pinterest.",
          fullDesc: "Специализированные услуги для музыкантов, креаторов, брендов и дизайнеров на профильных контент-платформах.",
          features: ["Музыкальный промоушен", "Визуальный трафик Pinterest", "Вывод в поисковые алгоритмы", "Отчетность о результатах"],
          priceMode: "FROM",
          priceLabel: "От 300 000 UZS",
          tags: "soundcloud, shazam, pinterest, музыка, пины",
        },
      ],
    },
    {
      number: "05",
      name: "MAPS & REPUTATION",
      slug: "maps-reputation",
      description: "Управление репутацией (SERM), отзывы и рейтинг на картах: Google Business, 2GIS, Яндекс Карты.",
      icon3D: "shield",
      order: 5,
      services: [
        {
          title: "Google Карты и Google Business",
          slug: "google-maps-reputation",
          shortDesc: "Оформление карточки, отзывы, подъем рейтинга и вывод компании в топ выдачи карт.",
          fullDesc: "Полное ведение профиля Google Мой Бизнес: верификация, наполнение товарами/услугами, сбор положительных отзывов и нивелирование негатива.",
          features: ["Оформление профиля и фото", "Рост рейтинга до 4.8 - 5.0", "Привлечение локальных клиентов", "Увеличение звонков и маршрутов"],
          priceMode: "FROM",
          priceLabel: "От 800 000 UZS",
          tags: "google maps, отзывы, карты, рейтинг, репутация",
        },
        {
          title: "2GIS и Яндекс Карты",
          slug: "2gis-yandex-maps",
          shortDesc: "Оптимизация профилей в 2ГИС и Яндекс.Картах, повышение позиций в навигаторах.",
          fullDesc: "Продвижение точек продаж в самых популярных гео-сервисах Узбекистана и СНГ. Увеличение пешеходного трафика и звонков.",
          features: ["Заполнение витрины и прайса", "Положительные рецензии клиентов", "Поднятие в категориях поиска", "Защита от заказного негатива"],
          priceMode: "FROM",
          priceLabel: "От 700 000 UZS",
          tags: "2gis, яндекс карты, локальный маркетинг, отзывы",
        },
        {
          title: "Управление репутацией (SERM)",
          slug: "serm-reputation-management",
          shortDesc: "Очистка поисковой выдачи от негатива, формирование позитивного имиджа бренда.",
          fullDesc: "Комплексный аудит репутации в сети: вытеснение негативных статей и сайтов-отзовиков из топ-10 Google и Яндекс, создание авторитетных публикаций.",
          features: ["Глубокий аудит инфополя", "Вытеснение негатива из топа", "Публикация PR-материалов", "Повышение доверия инвесторов и клиентов"],
          priceMode: "CUSTOM",
          priceLabel: "Индивидуально",
          tags: "serm, репутация, бренд, отзывы, имидж",
        },
      ],
    },
    {
      number: "06",
      name: "SEO & TRAFFIC",
      slug: "seo-traffic",
      description: "Поисковая оптимизация сайтов, аудит, ссылки, рост позиций в Google и Яндекс.",
      icon3D: "seo",
      order: 6,
      services: [
        {
          title: "SEO продвижение сайтов",
          slug: "seo-promotion",
          shortDesc: "Вывод сайта в топ-1 Google и Яндекс по целевым коммерческим запросам.",
          fullDesc: "Комплексная внутренняя и внешняя оптимизация сайта: семантическое ядро, оптимизация страниц, наращивание авторитетной ссылочной массы.",
          features: ["Сбор тысяч целевых ключевых слов", "Оптимизация структуры и кода", "Рост бесплатного органического трафика", "Ежемесячные прозрачные отчеты"],
          priceMode: "FROM",
          priceLabel: "От 3 000 000 UZS/мес",
          tags: "seo, продвижение сайтов, google, яндекс, трафик",
        },
        {
          title: "SEO аудит и техническая оптимизация",
          slug: "seo-audit",
          shortDesc: "Детальный анализ ошибок сайта, скорости загрузки и индексации поисковиками.",
          fullDesc: "Поиск технических сбоев, дублей страниц, битых ссылок, медленных скриптов и составление четкого технического задания на исправление.",
          features: ["Чек-лист из 100+ параметров", "Проверка микроразметки Schema.org", "Анализ мобильной версии", "Инструкция для разработчиков"],
          priceMode: "FROM",
          priceLabel: "От 1 500 000 UZS",
          tags: "аудит, seo, скорость, ошибки, техническое seo",
        },
      ],
    },
    {
      number: "07",
      name: "APP PROMOTION",
      slug: "app-promotion",
      description: "Продвижение мобильных приложений в Google Play и App Store: установки, отзывы, ASO.",
      icon3D: "software",
      order: 7,
      services: [
        {
          title: "Продвижение Android и iOS приложений",
          slug: "mobile-app-growth",
          shortDesc: "Реальные установки, вывод в топы категорий Google Play и App Store.",
          fullDesc: "Стимулирование скачиваний приложений, работа с поисковыми ключевыми словами (ASO), увеличение удержания пользователей и конверсий со страницы магазина.",
          features: ["ASO текстовая оптимизация", "Рост установок", "Повышение рейтинга приложения", "Работа с фидбеком пользователей"],
          priceMode: "FROM",
          priceLabel: "От 1 200 000 UZS",
          tags: "app store, google play, aso, установки, ios, android",
        },
      ],
    },
    {
      number: "08",
      name: "DESIGN & CREATIVE",
      slug: "design-creative",
      description: "Логотипы, брендбуки, SMM-оформление, дизайн меню, презентации и полиграфия.",
      icon3D: "design",
      order: 8,
      services: [
        {
          title: "Разработка логотипов и фирменного стиля",
          slug: "logo-branding",
          shortDesc: "Премиальные логотипы, шрифтовые пары, фирменные цвета и полный брендбук.",
          fullDesc: "Создание запоминающегося визуального образа бренда: разработка концепций, отрисовка векторных исходников, подбор цветовой гаммы и правил использования.",
          features: ["3 уникальные концепции на выбор", "Все форматы для веба и печати", "Гайдлайн по фирменному стилю", "Быстрые сроки создания"],
          priceMode: "FROM",
          priceLabel: "От 1 500 000 UZS",
          tags: "логотип, брендинг, стиль, дизайн, айдентика",
        },
        {
          title: "SMM дизайн и Stories/Reels covers",
          slug: "smm-design",
          shortDesc: "Оформление профилей, обложки актуального, шаблоны постов и анимационные заставки.",
          fullDesc: "Эстетичный визуальный ряд для ваших соцсетей, подчеркивающий статусность компании и привлекающий внимание в ленте.",
          features: ["Единый авторский стиль", "Шаблоны для быстрого постинга", "Иконки и обложки Highlights", "Адаптация под все форматы"],
          priceMode: "FROM",
          priceLabel: "От 800 000 UZS",
          tags: "дизайн, smm, обложки, reels, оформление",
        },
        {
          title: "Дизайн меню ресторанов и кафе",
          slug: "menu-design",
          shortDesc: "Продающее меню для заведений: печатные каталоги, электронные QR-меню.",
          fullDesc: "Грамотная визуальная иерархия блюд, аппетитная верстка и подготовка к печати либо разработка адаптивного онлайн-меню по QR коду.",
          features: ["Подготовка к качественной печати", "Электронная QR-версия", "Продуманная структура ценников", "Высокое разрешение иллюстраций"],
          priceMode: "FROM",
          priceLabel: "От 1 000 000 UZS",
          tags: "меню, кафе, ресторан, qr-меню, печать",
        },
      ],
    },
    {
      number: "09",
      name: "ANIMATED STICKERS",
      slug: "animated-stickers",
      description: "Анимированные стикеры TGS для Telegram и WEBP для WhatsApp, анимация персонажей и логотипов.",
      icon3D: "bot",
      order: 9,
      services: [
        {
          title: "Telegram анимированные стикеры (TGS)",
          slug: "telegram-tgs-stickers",
          shortDesc: "Векторные плавные стикерпаки для брендов и блогеров в формате TGS.",
          fullDesc: "Создание брендовых стикерпаков в Telegram: проработка эмоций персонажа или фирменного маскота, плавная векторная анимация через Adobe After Effects.",
          features: ["Плавные 60 fps анимации", "Малый вес файлов (быстрая загрузка)", "Регистрация стикерпака в Telegram", "Вирусный эффект среди клиентов"],
          priceMode: "FROM",
          priceLabel: "От 300 000 UZS/шт",
          tags: "стикеры, tgs, telegram, анимация, персонаж",
        },
        {
          title: "WhatsApp стикеры (WEBP / GIF)",
          slug: "whatsapp-webp-stickers",
          shortDesc: "Адаптированные стикеры и гиф-анимации для общения с клиентами в WhatsApp.",
          fullDesc: "Конвертация и оптимизация анимированных стикеров под стандарты WhatsApp для удобного использования отделом продаж и техподдержкой.",
          features: ["Корректный формат WEBP", "Быстрое добавление в мессенджер", "Брендирование коммуникации", "Яркие анимации"],
          priceMode: "FROM",
          priceLabel: "От 200 000 UZS/шт",
          tags: "whatsapp, webp, gif, стикеры",
        },
      ],
    },
    {
      number: "10",
      name: "MEDIA & ADVERTISING",
      slug: "media-advertising",
      description: "Видеомонтаж, рекламные ролики, динамичный моушн-дизайн и таргетированная реклама.",
      icon3D: "video",
      order: 10,
      services: [
        {
          title: "Видеомонтаж и рекламные ролики",
          slug: "video-production",
          shortDesc: "Монтаж Reels, промо-роликов, динамичные эффекты, саунд-дизайн и цветокоррекция.",
          fullDesc: "Профессиональное создание видеоконтента для бизнеса: динамичный монтаж, субтитры, графические плашки, инфографика и саунд-дизайн.",
          features: ["Монтаж в 4K разрешении", "Трендовый динамичный ритм", "Цветокоррекция и чистка звука", "Высокая вовлекаемость в просмотр"],
          priceMode: "FROM",
          priceLabel: "От 500 000 UZS/ролик",
          tags: "видео, монтаж, reels, реклама, съемка",
        },
        {
          title: "Таргетированная реклама",
          slug: "targeted-advertising",
          shortDesc: "Настройка рекламы в Meta (Instagram/Facebook) с прозрачной окупаемостью лидов.",
          fullDesc: "Создание рекламных креативов, настройка пикселей, сегментация целевой аудитории и регулярная оптимизация цены заявки.",
          features: ["Поиск платежеспособной аудитории", "A/B тесты креативов", "Интеграция с WhatsApp/Telegram/CRM", "Защита рекламного бюджета"],
          priceMode: "FROM",
          priceLabel: "От 1 800 000 UZS/мес",
          tags: "таргет, meta, instagram реклама, лиды",
        },
      ],
    },
    {
      number: "11",
      name: "PRINTING",
      slug: "printing",
      description: "Полиграфия и печать: визитки, флаеры, баннеры, каталоги, наклейки и упаковка.",
      icon3D: "printing",
      order: 11,
      services: [
        {
          title: "Печать полиграфии и мерча",
          slug: "printing-services",
          shortDesc: "Качественная печать визиток, буклетов, баннеров и брендированной продукции.",
          fullDesc: "Производство рекламной печатной продукции любых тиражей: от премиальных визиток с тиснением фольгой до широкоформатных наружных баннеров.",
          features: ["Высокая четкость печати", "Премиальные сорта бумаги и картона", "Широкоформатная печать", "Быстрая доставка по Ташкенту"],
          priceMode: "CUSTOM",
          priceLabel: "По расчету тиража",
          tags: "печать, визитки, флаеры, баннеры, полиграфия",
        },
      ],
    },
    {
      number: "12",
      name: "IT & TECHNICAL SERVICES",
      slug: "it-technical-services",
      description: "Настройка ПК, Windows, сетей, драйверов, удаленная IT-помощь, безопасность и антивирусная защита.",
      icon3D: "it",
      order: 12,
      services: [
        {
          title: "Установка и оптимизация Windows",
          slug: "windows-installation-optimization",
          shortDesc: "Чистая установка Windows 10/11, настройка драйверов, удаление мусора и ускорение системы.",
          fullDesc: "Профессиональная установка лицензионных операционных систем, установка полного пакета необходимых драйверов, офисных программ и тонкая настройка реестра для максимальной производительности.",
          features: ["Установка оригинального образа", "Все драйверы и библиотеки", "Отключение фоновой слежки и телеметрии", "Ускорение работы ПК и ноутбука"],
          priceMode: "FROM",
          priceLabel: "От 150 000 UZS",
          tags: "windows, установка, драйверы, оптимизация пк",
        },
        {
          title: "Чистка ПК, удаление вирусов и безопасность",
          slug: "virus-removal-pc-cleaning",
          shortDesc: "Удаление вредоносных программ, майнеров, троянов, очистка от пыли и замена термопасты.",
          fullDesc: "Комплексное обслуживание компьютеров: аппаратная профилактика от перегрева, полное сканирование и удаление скрытых вирусов, установка надежной антивирусной защиты.",
          features: ["Удаление скрытых майнеров", "Восстановление системных файлов", "Настройка фаервола и защиты", "Аппаратная профилактика"],
          priceMode: "FROM",
          priceLabel: "От 150 000 UZS",
          tags: "вирусы, чистка, антивирус, безопасность",
        },
        {
          title: "Настройка сетей, VPN, Proxy и удаленный доступ",
          slug: "network-vpn-remote-access",
          shortDesc: "Настройка роутеров, локальных офисных сетей, безопасных VPN и удаленной помощи.",
          fullDesc: "Организация бесперебойной офисной и домашней сети: настройка Wi-Fi оборудования, объединение филиалов через защищенные VPN-туннели, удаленная поддержка сотрудников.",
          features: ["Стабильный Wi-Fi без обрывов", "Выделенные приватные VPN/Proxy", "Удаленное администрирование (AnyDesk/TeamViewer)", "Резервное копирование (Backup)"],
          priceMode: "FROM",
          priceLabel: "От 200 000 UZS",
          tags: "vpn, proxy, сеть, роутер, удаленный доступ",
        },
      ],
    },
  ];

  for (const cat of categoriesData) {
    const category = await prisma.serviceCategory.upsert({
      where: { slug: cat.slug },
      update: {
        number: cat.number,
        name: cat.name,
        description: cat.description,
        icon3D: cat.icon3D,
        order: cat.order,
      },
      create: {
        number: cat.number,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon3D: cat.icon3D,
        order: cat.order,
      },
    });

    for (let i = 0; i < cat.services.length; i++) {
      const s = cat.services[i];
      await prisma.service.upsert({
        where: { slug: s.slug },
        update: {
          title: s.title,
          shortDesc: s.shortDesc,
          fullDesc: s.fullDesc,
          priceMode: s.priceMode,
          priceLabel: s.priceLabel,
          features: JSON.stringify(s.features),
          tags: s.tags,
          order: i + 1,
        },
        create: {
          title: s.title,
          slug: s.slug,
          categoryId: category.id,
          shortDesc: s.shortDesc,
          fullDesc: s.fullDesc,
          priceMode: s.priceMode,
          priceLabel: s.priceLabel,
          features: JSON.stringify(s.features),
          workflow: JSON.stringify(["Анализ задачи и ТЗ", "Проектирование и дизайн", "Разработка и настройка", "Тестирование и релиз"]),
          advantages: JSON.stringify(["Премиальное качество", "Строгие дедлайны", "Техподдержка после запуска"]),
          faq: JSON.stringify([
            { q: "Как быстро начинается работа?", a: "Мы приступаем к работе в течение 24 часов после согласования задачи." },
            { q: "Предоставляется ли гарантия?", a: "Да, на все выполненные работы предоставляется официальная гарантия и техническая поддержка." }
          ]),
          tags: s.tags,
          order: i + 1,
        },
      });
    }
  }
  console.log("Categories and Services seeded successfully.");

  // 9. Ready Solutions
  const solutionsData = [
    {
      title: "BUSINESS START",
      slug: "business-start",
      subtitle: "Идеальный старт для новой компании",
      description: "Все необходимое для выхода на рынок: фирменный логотип, мини-сайт с высокой конверсией, оформление профилей в Instagram и Telegram, а также настройка карт 2GIS и Google.",
      services: JSON.stringify(["Логотип и стиль", "Мини-сайт / Landing", "Оформление Instagram", "Карты Google & 2GIS"]),
      features: JSON.stringify(["Быстрый запуск за 7 дней", "Готовая витрина для клиентов", "Позиционирование бренда"]),
      order: 1,
    },
    {
      title: "DIGITAL BUSINESS",
      slug: "digital-business",
      subtitle: "Масштабирование и автоматизация продаж",
      description: "Полноценный корпоративный сайт, умный Telegram-бот с приемом заявок, интеграция CRM и таргетированная реклама.",
      services: JSON.stringify(["Корпоративный сайт", "Telegram-бот", "CRM-интеграция", "Таргетированная реклама"]),
      features: JSON.stringify(["Автоматический сбор лидов", "Сквозная аналитика", "Высокая конверсия"]),
      order: 2,
    },
    {
      title: "ONLINE STORE",
      slug: "online-store",
      subtitle: "Электронная коммерция под ключ",
      description: "Современный интернет-магазин с каталогом товаров, подключением национальных платежных систем (Payme, Click) и интеграцией складского учета.",
      services: JSON.stringify(["Интернет-магазин", "Платежные шлюзы", "SEO оптимизация", "Рекламный трафик"]),
      features: JSON.stringify(["Прием оплат 24/7", "Уведомления о заказах в Telegram", "Адаптация под смартфоны"]),
      order: 3,
    },
    {
      title: "AI AUTOMATION",
      slug: "ai-automation",
      subtitle: "Искусственный интеллект для вашего бизнеса",
      description: "Внедрение нейросетевых GPT-ассистентов для обработки обращений клиентов 24/7, автоматический парсинг данных и оптимизация рутины.",
      services: JSON.stringify(["AI-консультант", "Обучение на данных компании", "Автоматизация воронки", "Аналитика"]),
      features: JSON.stringify(["Снижение расходов на поддержку", "Мгновенные ответы клиентам", "Работа без выходных"]),
      order: 4,
    },
    {
      title: "TELEGRAM BUSINESS",
      slug: "telegram-business",
      subtitle: "Максимальная монетизация в Telegram",
      description: "Комплексное развитие бизнеса в Telegram: WebApp магазин внутри мессенджера, бот для воронки продаж, продвижение канала и фирменные стикеры.",
      services: JSON.stringify(["Telegram WebApp", "Telegram-бот", "Продвижение канала", "TGS Стикеры"]),
      features: JSON.stringify(["Покупки прямо в Telegram", "Автоматические рассылки", "Высокая вовлеченность"]),
      order: 5,
    },
  ];

  for (const sol of solutionsData) {
    await prisma.solution.upsert({
      where: { slug: sol.slug },
      update: sol,
      create: sol,
    });
  }

  // 10. Portfolio Projects
  const portfolioData = [
    {
      title: "FinTech Digital Portal",
      slug: "fintech-portal",
      client: "Capital Investment Group",
      category: "WEBSITES",
      shortDesc: "Корпоративная финансовая платформа с личным кабинетом инвестора и аналитикой в реальном времени.",
      challenge: "Требовалось создать сверхбыструю защищенную систему для презентации инвестиционных портфелей с мгновенным откликом.",
      solution: "Разработана архитектура на Next.js с серверным рендерингом, защитой сессий и интерактивными финансовыми графиками.",
      technologies: JSON.stringify(["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"]),
      results: "+280% прирост входящих институциональных инвесторов за первые 3 месяца.",
      coverImage: "/logo.png",
      order: 1,
    },
    {
      title: "AI Assistant & Telegram Ecosystem",
      slug: "ai-telegram-ecosystem",
      client: "Smart Logistics Asia",
      category: "AI",
      shortDesc: "Интеллектуальная система распределения заказов и круглосуточной поддержки водителей через Telegram.",
      challenge: "Операторы не справлялись с обработкой сотен заявок в пиковые часы доставок.",
      solution: "Интегрирован кастомный GPT-ассистент, распознающий голосовые и текстовые сообщения на русском и узбекском языках.",
      technologies: JSON.stringify(["Python", "OpenAI API", "Node.js", "Telegram Bot API", "Redis"]),
      results: "Время ответа сократилось с 14 минут до 3 секунд, автоматизировано 84% рутинных обращений.",
      coverImage: "/logo.png",
      order: 2,
    },
    {
      title: "E-Commerce Luxury Brand",
      slug: "luxury-brand-ecommerce",
      client: "Aura Premium Goods",
      category: "WEBSITES",
      shortDesc: "Премиальный интернет-магазин с поддержкой оплаты в один клик и динамической 3D-демонстрацией товаров.",
      challenge: "Создать ощущение эксклюзивного бутика в цифровой среде без потери производительности на смартфонах.",
      solution: "Минималистичный дизайн в темных тонах с золотыми акцентами, оптимизированный Three.js рендер и интеграция Payme/Click.",
      technologies: JSON.stringify(["React", "Three.js", "Next.js", "Tailwind CSS", "Payme API"]),
      results: "Конверсия в покупку составила 4.8%, что в 2.5 раза выше среднего показателя по отрасли.",
      coverImage: "/logo.png",
      order: 3,
    },
  ];

  for (const p of portfolioData) {
    await prisma.portfolioProject.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  // 11. FAQ Items
  const faqData = [
    {
      question: "С чего начинается сотрудничество с TARGET PRO?",
      answer: "С подробного анализа вашей задачи. Вы можете заполнить форму брифа, воспользоваться конфигуратором проекта на сайте или связаться с нами напрямую через Telegram @Mr_Zarrux или по телефону +998932368910. Мы составим прозрачное коммерческое предложение с точными этапами и сроками.",
      category: "GENERAL",
      order: 1,
    },
    {
      question: "Работаете ли вы по официальному договору?",
      answer: "Да, мы работаем официально с заключением договора, четко зафиксированным техническим заданием, этапами оплаты и гарантийными обязательствами.",
      category: "GENERAL",
      order: 2,
    },
    {
      question: "Как рассчитывается стоимость услуг?",
      answer: "В зависимости от масштаба задачи: для типовых услуг действует прозрачный фиксированный прайс, для сложных нестандартных систем (AI, софт, парсинг, ERP) формируется индивидуальная смета после детального анализа требований.",
      category: "PRICING",
      order: 3,
    },
    {
      question: "Предоставляется ли поддержка после сдачи проекта?",
      answer: "Обязательно. Мы не бросаем проекты после запуска: обеспечиваем мониторинг стабильности, резервное копирование данных, консультации и дальнейшее развитие функционала.",
      category: "SUPPORT",
      order: 4,
    },
  ];

  for (const f of faqData) {
    const existing = await prisma.fAQ.findFirst({ where: { question: f.question } });
    if (!existing) {
      await prisma.fAQ.create({ data: f });
    }
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
