"use client";

import React, { useState } from "react";
import { Star, Globe2, Quote } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Review {
  id: number;
  name: string;
  role: string;
  country: string;
  countryCode: string;
  flag: string;
  avatar: string;
  text: string;
}

export default function ClientReviewsMarquee() {
  const { language } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);

  // 50 unique client reviews from around the globe in RU, UZ (Latin), UZ (Cyrillic), EN, and other international languages
  const reviews: Review[] = [
    {
      id: 1,
      name: "Алексей Иванов",
      role: "Директор ресторана",
      country: "Россия",
      countryCode: "ru",
      flag: "🇷🇺",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      text: "TARGET PRO помогли нам увеличить количество клиентов в 3 раза. Отличная работа, стабильная архитектура и быстрая поддержка 24/7!",
    },
    {
      id: 2,
      name: "Dilshod Karimov",
      role: "Менеджер логистической компании",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      text: "TARGET PRO bilan ishlash juda qulay va ishonchli. Sayt va Telegram-bot integratsiyasi orqali savdolarimiz yangi bosqichga ko‘tarildi.",
    },
    {
      id: 3,
      name: "Азиза Раҳимова",
      role: "Управляющий автосервисом",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
      text: "TARGET PRO хизмати жуда яхши. Таргетинг ва реклама натижалари кутилганидан ҳам юқори бўлди. Ташаккур билдирамиз!",
    },
    {
      id: 4,
      name: "Michael Johnson",
      role: "Владелец сети магазинов",
      country: "United Kingdom",
      countryCode: "gb",
      flag: "🇬🇧",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      text: "TARGET PRO helped us reach new customers and significantly improve our online growth. Truly exceptional engineering precision.",
    },
    {
      id: 5,
      name: "Сардор Мирзаев",
      role: "Главный врач медицинского центра",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
      text: "Bizning to‘lov tizimlarimiz va CRM bilan to‘liq integratsiya qilib berishdi. Serverlar uzluksiz, barqaror ishlamoqda.",
    },
    {
      id: 6,
      name: "Дмитрий Смирнов",
      role: "Руководитель строительной компании",
      country: "Казахстан",
      countryCode: "kz",
      flag: "🇰🇿",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
      text: "Автоматизация заявок и бот для клиентов сэкономили нам сотни часов в месяц. Ребята знают своё дело на 100%.",
    },
    {
      id: 7,
      name: "Sarah Jenkins",
      role: "Основатель интернет-магазина",
      country: "United States",
      countryCode: "us",
      flag: "🇺🇸",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
      text: "The Next.js web application built by TARGET PRO delivered lightning-fast load speeds and doubled our conversion rate.",
    },
    {
      id: 8,
      name: "Жаҳонгир Усмонов",
      role: "Директор по маркетингу",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
      text: "Каталог ва интернет-дўкон жуда тушунарли яратилди. Мижозларимиз онлайн буюртма беришдан жуда мамнун.",
    },
    {
      id: 9,
      name: "Elena Rostova",
      role: "Технический директор IT-проектов",
      country: "Россия",
      countryCode: "ru",
      flag: "🇷🇺",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      text: "Премиальный стиль, продуманный UI/UX и поток реальных заявок. Клиенты постоянно хвалят наш новый сайт.",
    },
    {
      id: 10,
      name: "Nodirbek Alimov",
      role: "Управляющий отелем",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
      text: "Xalqaro hamkorlarimiz uchun ko‘p tilli korporativ portal tayyorlab berishdi. Sifat va muddat a’lo darajada bajarildi.",
    },
    {
      id: 11,
      name: "Tariq Al-Mansoor",
      role: "Владелец фитнес-клуба",
      country: "United Arab Emirates",
      countryCode: "ae",
      flag: "🇦🇪",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
      text: "Working with TARGET PRO was seamless. High-converting landing pages tailored for our luxury real estate portfolio.",
    },
    {
      id: 12,
      name: "Шаҳноза Юлдошева",
      role: "Руководитель образовательного центра",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&auto=format&fit=crop&q=80",
      text: "Инстаграм ва таргет реклама орқали мижозлар оқими кескин кўпайди. Профессионал муносабат учун раҳмат!",
    },
    {
      id: 13,
      name: "Maximilian Weber",
      role: "Директор мебельной фабрики",
      country: "Germany",
      countryCode: "de",
      flag: "🇩🇪",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
      text: "Superb architectural standards. Secure APIs, zero latency, and beautiful frontend execution. Highly recommended.",
    },
    {
      id: 14,
      name: "Анна Мельникова",
      role: "Управляющий транспортной компанией",
      country: "Беларусь",
      countryCode: "by",
      flag: "🇧🇾",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80",
      text: "Команда TARGET PRO внедрила сквозную аналитику и AI-бота. Окупаемость маркетингового бюджета выросла на 85%.",
    },
    {
      id: 15,
      name: "Bobur Tursunov",
      role: "Владелец салона красоты",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=120&auto=format&fit=crop&q=80",
      text: "Kuryerlar va mijozlar uchun maxsus avtomatlashtirilgan Telegram bot tayyorlashdi. Buyurtmalar soni 4 baravar oshdi.",
    },
    {
      id: 16,
      name: "Liam O'Connor",
      role: "Руководитель агрохолдинга",
      country: "Ireland",
      countryCode: "ie",
      flag: "🇮🇪",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80",
      text: "Outstanding communication and top-tier code quality. The deployment went flawlessly with zero downtime.",
    },
    {
      id: 17,
      name: "Мурод Ҳасанов",
      role: "Директор оптовой базы",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&auto=format&fit=crop&q=80",
      text: "TARGET PRO жамоаси брендимизнинг янги каталогини жуда чиройли қилди. Савдо бўлимимизга буюртмалар тўхтовсиз келмоқда.",
    },
    {
      id: 18,
      name: "Ольга Воронова",
      role: "Владелец ювелирного бутика",
      country: "Россия",
      countryCode: "ru",
      flag: "🇷🇺",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      text: "Сайт получился невероятно дорогим и изысканным. Конверсия из мобильного трафика превзошла все ожидания!",
    },
    {
      id: 19,
      name: "Otabek Qodirov",
      role: "Управляющий кофейней",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=120&auto=format&fit=crop&q=80",
      text: "Qurilish kompaniyamiz uchun interaktiv kalkulyator va arizalar tizimi yaratildi. Mijozlarimizga hisoblash juda qulay.",
    },
    {
      id: 20,
      name: "Chao Zhang",
      role: "Руководитель отдела продаж",
      country: "Singapore",
      countryCode: "sg",
      flag: "🇸🇬",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      text: "Target Pro delivered our international multiligual portal on time. High reliability and flawless responsive UX.",
    },
    {
      id: 21,
      name: "Рустам Ахметов",
      role: "Директор типографии",
      country: "Узбекистан",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
      text: "Запустили рекламу в Meta и Telegram. ROI составил более 340% в первый же месяц. Работаем на постоянной основе!",
    },
    {
      id: 22,
      name: "Шуҳрат Назаров",
      role: "Основатель digital-агентства",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      text: "Клиника учун беморларни рўйхатга олувчи онлайн тизим ишга туширилди. Беморлар қабули тартибли ва тезлашди.",
    },
    {
      id: 23,
      name: "Emma Watson",
      role: "Владелец автосалона",
      country: "Australia",
      countryCode: "au",
      flag: "🇦🇺",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      text: "The 3D interactive graphics and fluid motion made our product look world-class. Truly premium digital agency.",
    },
    {
      id: 24,
      name: "Ziyoda Salimova",
      role: "Управляющий стоматологической клиникой",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
      text: "Bolalar kiyimlari do‘konimiz uchun internet-magazin yaratib berishdi. Click va Payme to‘lovlari bir zumda ulandi.",
    },
    {
      id: 25,
      name: "Кирилл Белов",
      role: "Руководитель дистрибьюторской сети",
      country: "Россия",
      countryCode: "ru",
      flag: "🇷🇺",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
      text: "Чистая кодовая база, Next.js, мгновенный отклик базы данных и защита от перегрузок. Высочайший уровень профессионализма.",
    },
    {
      id: 26,
      name: "Ҳамидулла Зокиров",
      role: "Директор производства упаковки",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
      text: "Қишлоқ хўжалиги маҳсулотларини экспорт қилиш учун хорижий бозорга қаратилган веб-сайт яратилди. Натижадан миннатдормиз!",
    },
    {
      id: 27,
      name: "Lucas Silva",
      role: "Владелец сети аптек",
      country: "Brazil",
      countryCode: "br",
      flag: "🇧🇷",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
      text: "The lead acquisition pipelines built by TARGET PRO dramatically expanded our B2B pipeline across Latin America.",
    },
    {
      id: 28,
      name: "Ilhom Fayziyev",
      role: "Управляющий базой отдыха",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=120&auto=format&fit=crop&q=80",
      text: "Mehmonxonamiz xonalarini bron qilish tizimi ajoyib ishlamoqda. Xorijiy sayyohlar uchun qulay va zamonaviy ko‘rinishda.",
    },
    {
      id: 29,
      name: "Екатерина Попова",
      role: "Руководитель логистического терминала",
      country: "Россия",
      countryCode: "ru",
      flag: "🇷🇺",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80",
      text: "Дизайн в стиле Black & Gold подчеркнул премиальность нашего бренда. Продажи выросли уже на второй неделе после релиза.",
    },
    {
      id: 30,
      name: "Davronbek Shukurov",
      role: "Директор туристического агентства",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80",
      text: "O‘quv markazimizga talabalarni jalb qilish bo‘yicha to‘liq marketing voronkasi qurib berildi. Guruhlar 100% to‘ldi.",
    },
    {
      id: 31,
      name: "Daniel Fischer",
      role: "Владелец кондитерской фабрики",
      country: "Switzerland",
      countryCode: "ch",
      flag: "🇨🇭",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      text: "Precision, transparency, and top-tier technical delivery. TARGET PRO is our go-to engineering team in Central Asia.",
    },
    {
      id: 32,
      name: "Малика Эргашева",
      role: "Управляющий жилым комплексом",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&auto=format&fit=crop&q=80",
      text: "СММ ва контент яратиш бўйича хизматлари жуда юқори сифатда. Таргетинг тўғри аудиторияни топиб берди.",
    },
    {
      id: 33,
      name: "Игорь Соколов",
      role: "Директор текстильного комбината",
      country: "Казахстан",
      countryCode: "kz",
      flag: "🇰🇿",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
      text: "Интеграция с нашими контроллерами и мобильная панель работают идеально. Надежный партнер для масштабирования бизнеса.",
    },
    {
      id: 34,
      name: "Bekzod Rahmonov",
      role: "Руководитель службы доставки",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
      text: "Yuklarni kuzatish va hisob-kitob qilish dasturi ishimizni 5 barobar yengillashtirdi. TARGET PRO jamoasiga rahmat!",
    },
    {
      id: 35,
      name: "Chloe Martin",
      role: "Владелец центра детского развития",
      country: "Canada",
      countryCode: "ca",
      flag: "🇨🇦",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      text: "Remarkable performance on Next.js. Fast loading, great SEO scores, and continuous support after deployment.",
    },
    {
      id: 36,
      name: "Умиджон Бозоров",
      role: "Управляющий частной клиникой",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
      text: "Бизнес жараёнларимизни рақамлаштириш бўйича берган маслаҳатлари ва ишлари жуда самарали бўлди. Ҳамкоримизга раҳмат!",
    },
    {
      id: 37,
      name: "Марина Козлова",
      role: "Директор завода стройматериалов",
      country: "Россия",
      countryCode: "ru",
      flag: "🇷🇺",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      text: "Понятные тарифы, соблюдение сроков до дня и круглосуточная поддержка. Все наши клиенты в восторге от нового сайта.",
    },
    {
      id: 38,
      name: "Akmal Saidov",
      role: "Руководитель юридической фирмы",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      text: "Kompaniyamizning obro‘sini ko‘rsatib beruvchi ajoyib brending va korporativ sayt yaratildi. Har tomonlama a’lo!",
    },
    {
      id: 39,
      name: "Alexander Becker",
      role: "Владелец сети пекарен",
      country: "Austria",
      countryCode: "at",
      flag: "🇦🇹",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      text: "Fast turnarounds, clean modular structure, and deep domain expertise in web technologies. 5 stars all the way.",
    },
    {
      id: 40,
      name: "Гулноза Камолова",
      role: "Управляющий автопарком",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
      text: "TARGET PRO билан ишлаш жуда мазмунли бўлди. Таргетинг орқали кунлик лидлар сони 50 тадан ошди.",
    },
    {
      id: 41,
      name: "Владислав Морозов",
      role: "Директор языковой школы",
      country: "Россия",
      countryCode: "ru",
      flag: "🇷🇺",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
      text: "Очень сильная техническая экспертиза. Сделали то, от чего отказались другие агентства. Рекомендую TARGET PRO.",
    },
    {
      id: 42,
      name: "Sherzod Ismoilov",
      role: "Руководитель импортно-экспортной компании",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=120&auto=format&fit=crop&q=80",
      text: "Test sinovlari va onlayn darslar platformasini tez va sifatli ishlab chiqishdi. Serverlar uzluksiz ishlamoqda.",
    },
    {
      id: 43,
      name: "Sophia Martinez",
      role: "Владелец студии дизайна",
      country: "Spain",
      countryCode: "es",
      flag: "🇪🇸",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
      text: "The e-commerce platform developed by TARGET PRO helped us expand into multiple European countries simultaneously.",
    },
    {
      id: 44,
      name: "Баҳодир Собиров",
      role: "Управляющий ресторанным комплексом",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=120&auto=format&fit=crop&q=80",
      text: "Завод ва саноат маҳсулотларимиз учун мустаҳкам ва замонавий портал яратилди. Йирик буюртмачилар сони кўпайди.",
    },
    {
      id: 45,
      name: "Николай Павлов",
      role: "Директор IT-интегратора",
      country: "Казахстан",
      countryCode: "kz",
      flag: "🇰🇿",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
      text: "Парсинг цен, синхронизация со складом и интеграция с CRM сработали как часы. Отличные специалисты.",
    },
    {
      id: 46,
      name: "Shohruh Mirzaxmedov",
      role: "Руководитель службы такси",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
      text: "Elektron QR-menyu va Telegram yetkazib berish boti tufayli restoranimiz daromadi 40% ga ko‘paydi. Katta rahmat!",
    },
    {
      id: 47,
      name: "Oliver Hansen",
      role: "Владелец магазина электроники",
      country: "Norway",
      countryCode: "no",
      flag: "🇳🇴",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80",
      text: "Impressive attention to detail, scalable microservices architecture, and clean Next.js React code. Outstanding team.",
    },
    {
      id: 48,
      name: "Дилфуза Муҳаммадиева",
      role: "Управляющий банным комплексом",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&auto=format&fit=crop&q=80",
      text: "Бренд дизайн ва онлайн кўргазма залимиз кўрганларни ҳайратда қолдирмоқда. TARGET PRO профессионаллар жамоаси!",
    },
    {
      id: 49,
      name: "Сергей Кузнецов",
      role: "Директор по развитию франшизы",
      country: "Россия",
      countryCode: "ru",
      flag: "🇷🇺",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      text: "Запустили рекламу в Meta и Telegram. ROI составил более 340% в первый же месяц. Работаем на постоянной основе!",
    },
    {
      id: 50,
      name: "Farrux Zokirov",
      role: "Руководитель логистического склада",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
      text: "TARGET PRO bilan hamkorlik biznesimizga yangi sur’at bag‘ishladi. Tezkor qo‘llab-quvvatlash va yuqori natijadorlik!",
    },
    {
      id: 51,
      name: "Дмитрий Воропаев",
      role: "Владелец цветочного бутика",
      country: "Россия",
      countryCode: "ru",
      flag: "🇷🇺",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      text: "Автоматизация оптовых поставок и личный кабинет агрохолдинга от TARGET PRO окупились за первые два месяца работы.",
    },
    {
      id: 52,
      name: "Kamola Rustamova",
      role: "Управляющий загородным клубом",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
      text: "Sayyohlar uchun qulay bron tizimi va ko‘p tilli veb-sayt yaratildi. Yevropadan kelayotgan buyurtmalar 3 barobar ko‘paydi.",
    },
    {
      id: 53,
      name: "Фарҳод Низомов",
      role: "Директор клининговой компании",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      text: "Металл конструкциялар заводимиз учун яратилган B2B портали ҳамкорларимиз билан ҳисоб-китобни жуда соддалаштирди.",
    },
    {
      id: 54,
      name: "William Davis",
      role: "Руководитель девелоперского проекта",
      country: "United Kingdom",
      countryCode: "gb",
      flag: "🇬🇧",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      text: "TARGET PRO delivers exceptional high-load architecture with rock-solid Next.js performance and zero security vulnerabilities.",
    },
    {
      id: 55,
      name: "Жасур Тўраев",
      role: "Владелец бренда одежды",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
      text: "Қандолат маҳсулотларимиз учун чиройли интернет-дўкон ва Telegram орқали онлайн тўлов тизимини йўлга қўйиб беришди.",
    },
    {
      id: 56,
      name: "Алина Сергеева",
      role: "Управляющий охранным предприятием",
      country: "Беларусь",
      countryCode: "by",
      flag: "🇧🇾",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
      text: "Сквозная аналитика и таргетированная реклама дали рекордное количество новых постоянных покупателей. Огромное спасибо!",
    },
    {
      id: 57,
      name: "Sardorbek Eshonqulov",
      role: "Директор фермерского хозяйства",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
      text: "Avtomobillarga xizmat ko‘rsatish va ehtiyot qismlarni buyurtma qilish boti haydovchilarimizga juda manzur bo‘ldi.",
    },
    {
      id: 58,
      name: "Marcus Lindner",
      role: "Руководитель инженерного бюро",
      country: "Switzerland",
      countryCode: "ch",
      flag: "🇨🇭",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
      text: "Impressed by the technical discipline and execution velocity. Complex financial workflows deployed on schedule.",
    },
    {
      id: 59,
      name: "Мавлуда Каримова",
      role: "Владелец сети барбершопов",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      text: "Болалар ўқув марказимиз учун ота-оналар билан мулоқот қилувчи СМС ва Телеграм тизими ишга туширилди. Ҳаммаси аъло даражада!",
    },
    {
      id: 60,
      name: "Тимур Галиев",
      role: "Управляющий супермаркетом",
      country: "Казахстан",
      countryCode: "kz",
      flag: "🇰🇿",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
      text: "Интерактивная 3D-визуализация жилых комплексов на сайте увеличила поток входящих звонков от покупателей на 70%.",
    },
    {
      id: 61,
      name: "Jessica Miller",
      role: "Директор автомоечного комплекса",
      country: "United States",
      countryCode: "us",
      flag: "🇺🇸",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      text: "TARGET PRO brought cutting-edge design and flawless responsive performance to our digital storefront. Top tier talent.",
    },
    {
      id: 62,
      name: "Ulug‘bek Qosimov",
      role: "Руководитель рекламной службы",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
      text: "Issiqxona va qishloq xo‘jaligi mahsulotlarini eksport qilish bo‘yicha xalqaro veb-portal tayyorlab berishdi. Minnatdormiz!",
    },
    {
      id: 63,
      name: "Оксана Николаева",
      role: "Владелец сервисного центра бытовой техники",
      country: "Россия",
      countryCode: "ru",
      flag: "🇷🇺",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80",
      text: "Запись пациентов через сайт и интеграция с медицинской базой данных сэкономили десятки часов работы администраторов.",
    },
    {
      id: 64,
      name: "Озодбек Ҳайдаров",
      role: "Управляющий спа-отелем",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=120&auto=format&fit=crop&q=80",
      text: "Мебелларимиз каталоги ва нарх ҳисоблаш калькулятори сайтимизни мижозлар учун жуда қулай қилди. Савдолар ошди.",
    },
    {
      id: 65,
      name: "Ahmed Al-Zahrawi",
      role: "Директор металлобазы",
      country: "United Arab Emirates",
      countryCode: "ae",
      flag: "🇦🇪",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      text: "Fast, reliable API integrations with cargo tracking across Middle East hubs. The engineering quality is world class.",
    },
    {
      id: 66,
      name: "Shoira Yusupova",
      role: "Руководитель курьерской службы",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&auto=format&fit=crop&q=80",
      text: "Elektron menyu va mehmonlarni qabul qilish tizimi restoranimiz imidjini yangi darajaga olib chiqdi.",
    },
    {
      id: 67,
      name: "Евгений Романов",
      role: "Владелец частного детского сада",
      country: "Россия",
      countryCode: "ru",
      flag: "🇷🇺",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
      text: "Идеальная защита данных, шифрование сессий и нулевые задержки. TARGET PRO — настоящие инженеры своего дела.",
    },
    {
      id: 68,
      name: "Ғайрат Мансуров",
      role: "Управляющий кейтеринговой компанией",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=120&auto=format&fit=crop&q=80",
      text: "Озуқа маҳсулотлари улгуржи савдоси учун онлайн буюртма тизими тузилди. Барча вилоятлардан буюртмалар оляпмиз.",
    },
    {
      id: 69,
      name: "Stefan Kraft",
      role: "Директор по электронной коммерции",
      country: "Austria",
      countryCode: "at",
      flag: "🇦🇹",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      text: "Transparent agile sprints and dependable cloud deployments. Outstanding technology partner for scalable web applications.",
    },
    {
      id: 70,
      name: "Bekmurod Jalilov",
      role: "Руководитель транспортного цеха",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
      text: "To‘lov tizimlari va bank integratsiyalari xavfsiz va tezkor ishga tushirildi. TARGET PRO jamoasiga yuksak baho beramiz.",
    },
    {
      id: 71,
      name: "Марина Шелест",
      role: "Владелец фотостудии",
      country: "Казахстан",
      countryCode: "kz",
      flag: "🇰🇿",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
      text: "Поток целевых заявок на кредитные продукты вырос в 4 раза благодаря персонализированной воронке в мессенджерах.",
    },
    {
      id: 72,
      name: "Ҳасан Норматов",
      role: "Управляющий спортивным комплексом",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
      text: "Кўзойнаклар ва оптика маҳсулотлари учун онлайн каталог яратилди. Харидорларимиз керакли маҳсулотни осон топишмоқда.",
    },
    {
      id: 73,
      name: "Carlos Mendoza",
      role: "Директор агентства недвижимости",
      country: "Spain",
      countryCode: "es",
      flag: "🇪🇸",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      text: "The Next.js framework combined with fluid 3D elements gave our European retail platform unparalleled customer engagement.",
    },
    {
      id: 74,
      name: "Nodira Rahmatova",
      role: "Руководитель производственной линии",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
      text: "Mijozlarimiz Telegram orqali o‘zlariga qulay vaqtga onlayn yozilmoqda. Ustalarimiz jadvali to‘liq tartibga tushdi.",
    },
    {
      id: 75,
      name: "Виктор Самойлов",
      role: "Владелец магазина автозапчастей",
      country: "Россия",
      countryCode: "ru",
      flag: "🇷🇺",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80",
      text: "Синхронизация склада запчастей с сайтом и бот предварительной записи на ремонт повысили средний чек на 35%.",
    },
    {
      id: 76,
      name: "Собиржон Камолов",
      role: "Управляющий сетью кофеен",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
      text: "Миллий гиламларимизнинг экспорти учун яратилган каталог чет эллик харидорларга жуда маъқул бўлди. Раҳмат!",
    },
    {
      id: 77,
      name: "Chloe Tremblay",
      role: "Директор диагностической лаборатории",
      country: "Canada",
      countryCode: "ca",
      flag: "🇨🇦",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      text: "Seamless delivery with ultra-responsive UX. TARGET PRO team demonstrated deep expertise across the modern full-stack.",
    },
    {
      id: 78,
      name: "Eldor Vohidov",
      role: "Руководитель учебного комбината",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
      text: "O‘quvchilar uchun darslar va uyga vazifalar tekshiruvchi maxsus platforma barpo etildi. O‘qituvchilarimiz juda xursand.",
    },
    {
      id: 79,
      name: "Константин Орлов",
      role: "Владелец мебельного салона",
      country: "Россия",
      countryCode: "ru",
      flag: "🇷🇺",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      text: "Качественная верстка, строгие сроки и профессиональная техническая поддержка. Сотрудничеством очень довольны.",
    },
    {
      id: 80,
      name: "Шавкат Иброҳимов",
      role: "Управляющий гостиничным сервисом",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
      text: "Юк ташиш машиналарини кузатиш ва мижозларга автоматик хабар юбориш тизими ишимизни жуда енгиллаштирди.",
    },
    {
      id: 81,
      name: "Patrick Brennan",
      role: "Директор комбината питания",
      country: "Ireland",
      countryCode: "ie",
      flag: "🇮🇪",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      text: "Superb engineering quality. We scaled our SaaS product effortlessly thanks to TARGET PRO's clean architecture.",
    },
    {
      id: 82,
      name: "Zafarbek Murodov",
      role: "Руководитель складского комплекса",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
      text: "Oziq-ovqat mahsulotlarini yetkazib berish bo‘yicha tezkor veb-ilova va bot yaratildi. Aholi orasida talab juda katta.",
    },
    {
      id: 83,
      name: "Наталья Григорьева",
      role: "Владелец полиграфического центра",
      country: "Беларусь",
      countryCode: "by",
      flag: "🇧🇾",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&auto=format&fit=crop&q=80",
      text: "Дизайн и подача материалов в стиле Black & Gold подчеркнули статус нашего медиа-холдинга. Великолепная работа!",
    },
    {
      id: 84,
      name: "Улуғбек Ботиров",
      role: "Управляющий сетью пиццерий",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
      text: "Интерьер ва уй безаклари дўконимиз учун замонавий интернет-магазин тузиб беришди. Харидорлар кўпаймоқда.",
    },
    {
      id: 85,
      name: "Henrik Nygård",
      role: "Директор по качеству продукции",
      country: "Norway",
      countryCode: "no",
      flag: "🇳🇴",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      text: "High coding standards, strict adherence to security protocols, and exceptional responsiveness. Highly recommended.",
    },
    {
      id: 86,
      name: "Jamshidbek Olimov",
      role: "Руководитель экспедиторской службы",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=120&auto=format&fit=crop&q=80",
      text: "Hunarmandchilik mahsulotlarimizni dunyo bo‘ylab sotish uchun ajoyib sayt yaratildi. Chet ellik xaridorlar oqimi oshdi.",
    },
    {
      id: 87,
      name: "Артем Белоусов",
      role: "Владелец магазина спорттоваров",
      country: "Казахстан",
      countryCode: "kz",
      flag: "🇰🇿",
      avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=120&auto=format&fit=crop&q=80",
      text: "Удобная система электронного весового контроля и документооборота сэкономила нам сотни часов в уборочный сезон.",
    },
    {
      id: 88,
      name: "Муҳаммадали Исломов",
      role: "Управляющий сервисным отделом",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
      text: "Автомобил тюнинг хизматларимиз учун инстаграм ва веб-сайт тарғиботи орқали навбатлар бир ой олдиндан тўлмоқда.",
    },
    {
      id: 89,
      name: "Wei Chen",
      role: "Директор по закупкам и снабжению",
      country: "Singapore",
      countryCode: "sg",
      flag: "🇸🇬",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      text: "TARGET PRO built our multi-currency e-commerce portal with flawless speed and precision. A joy to collaborate with.",
    },
    {
      id: 90,
      name: "Lola To‘xtasinova",
      role: "Руководитель маркетингового агентства",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
      text: "Bemorlar uchun tahlil javoblarini Telegram orqali yuborish tizimi ishga tushirildi. Qabulxonamizda navbatlar yo‘qoldi.",
    },
    {
      id: 91,
      name: "Роман Тарасов",
      role: "Владелец магазина детских товаров",
      country: "Россия",
      countryCode: "ru",
      flag: "🇷🇺",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
      text: "Интерфейс мобильного приложения и синхронизация с умными устройствами работают безотказно. Большое спасибо команде!",
    },
    {
      id: 92,
      name: "Бахтиёр Саидов",
      role: "Управляющий банкетным залом",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      text: "Тўй ва тадбирларга миллий ош буюртма қилиш ботимиз орқали мижозлар бир зумда буюртма бермоқда. Натижа ажойиб!",
    },
    {
      id: 93,
      name: "Oliver Smith",
      role: "Директор деревообрабатывающего завода",
      country: "Australia",
      countryCode: "au",
      flag: "🇦🇺",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
      text: "Fast, reliable engineering execution and great communication. The interactive investment dashboard works seamlessly.",
    },
    {
      id: 94,
      name: "Nilufar Rahimova",
      role: "Руководитель службы клиентского сервиса",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
      text: "Xususiy bog‘chamiz uchun ota-onalarni jalb qilish reklama kampaniyasi natijasida guruhlarimiz to‘liq shakllandi.",
    },
    {
      id: 95,
      name: "Сергей Лазарев",
      role: "Владелец оптического салона",
      country: "Россия",
      countryCode: "ru",
      flag: "🇷🇺",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80",
      text: "Парсинг логистических бирж и автоматическое распределение заявок сократили расходы отдела логистики на 45%.",
    },
    {
      id: 96,
      name: "Олимжон Шодиев",
      role: "Управляющий распределительным центром",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
      text: "Заводимиз маҳсулотлари учун онлайн прайс-лист ва буюртма бериш тизими жуда сифатли ва мустаҳкам тайёрланди.",
    },
    {
      id: 97,
      name: "Gabriel Santos",
      role: "Директор швейного производства",
      country: "Brazil",
      countryCode: "br",
      flag: "🇧🇷",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
      text: "The marketing funnel and lead automation built by TARGET PRO delivered exceptional ROI across our digital channels.",
    },
    {
      id: 98,
      name: "Zuhra Alimova",
      role: "Руководитель оптовых продаж",
      country: "O‘zbekiston",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
      text: "Kiyimlar kolleksiyamiz uchun yaratilgan zamonaviy veb-sayt va Instagram dizaynlari brendimiz nufuzini yuksaltirdi.",
    },
    {
      id: 99,
      name: "Андрей Федотов",
      role: "Владелец студии звукозаписи",
      country: "Россия",
      countryCode: "ru",
      flag: "🇷🇺",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      text: "Приложение для покупки клубных карт и расписания тренировок увеличило онлайн-продажи абонементов в 3 раза.",
    },
    {
      id: 100,
      name: "Шерзод Ҳамидов",
      role: "Управляющий сетью автомоек",
      country: "Ўзбекистон",
      countryCode: "uz",
      flag: "🇺🇿",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
      text: "Маиший техника таъмирлаш хизматимиз учун онлайн ариза ва усталарни йўналтириш тизими яратилди. Ишимиз анча тезлашди!",
    },

  ];

  const headers = {
    ru: {
      tag: "ОТЗЫВЫ КЛИЕНТОВ",
      title: "НАМ ДОВЕРЯЮТ КЛИЕНТЫ ПО ВСЕМУ МИРУ",
      desc: "Реальные результаты бизнеса, увеличение продаж и высокотехнологичные решения от команды TARGET PRO.",
    },
    uz: {
      tag: "MIJOZLAR FIKRLARI",
      title: "DUNYO BO‘YLAB BIZNESLAR BIZGA ISHONADI",
      desc: "TARGET PRO jamoasi tomonidan yaratilgan haqiqiy natijalar, sotuvlar o‘sishi va yuqori texnologik yechimlar.",
    },
    en: {
      tag: "CLIENT REVIEWS",
      title: "TRUSTED BY CLIENTS WORLDWIDE",
      desc: "Real business outcomes, revenue scaling, and cutting-edge engineering delivered by the TARGET PRO team.",
    },
  }[language];

  return (
    <section className="py-24 relative overflow-hidden bg-transparent border-t border-white/5">
      {/* Background Subtle Cyber Glow and Tech Ambient */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold/5 blur-[160px] pointer-events-none" />
      <div className="absolute right-10 top-10 w-[300px] h-[300px] bg-[#00C8FF]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-bold uppercase tracking-widest mb-3">
          <Globe2 className="w-3.5 h-3.5" />
          <span>{headers.tag}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
          {headers.title}
        </h2>
        <p className="text-xs sm:text-sm text-metallic max-w-2xl mx-auto mt-3 leading-relaxed">
          {headers.desc}
        </p>
      </div>

      {/* Infinite Horizontal Carousel Marquee */}
      <div
        className="relative w-full overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left & Right Edge Vignette Gradient for Seamless Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

        {/* Moving Container (Double Array for Seamless Loop) */}
        <div
          className="animate-marquee-smooth flex items-stretch gap-6 px-4"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {[...reviews, ...reviews].map((rev, index) => (
            <div
              key={`${rev.id}-${index}`}
              className="w-[310px] sm:w-[350px] shrink-0 glass-card rounded-2xl p-6 flex flex-col justify-between border border-white/10 hover:border-gold/60 transition-all duration-300 relative group hover:scale-[1.03] hover:shadow-[0_10px_35px_rgba(255,194,0,0.22)] bg-gradient-to-b from-[#16110D]/90 to-[#0B0907]/90 backdrop-blur-xl"
            >
              {/* Top Row: Stars + Country Flag Badge */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="flex items-center px-2 py-1 rounded-full bg-white/5 border border-white/10 group-hover:border-gold/30 transition-colors shadow-sm">
                    <img
                      src={`/flags/${rev.countryCode}.png`}
                      alt={rev.country}
                      className="w-5 h-3.5 rounded-[2px] object-cover shadow-sm shrink-0"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-metallic/90 leading-relaxed italic mb-6">
                  «{rev.text}»
                </p>
              </div>

              {/* Bottom Row: Client Avatar, Name & Real Flag */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold/40 shrink-0 group-hover:border-gold transition-colors shadow-[0_0_12px_rgba(255,194,0,0.25)]">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm font-bold text-white group-hover:text-gold transition-colors truncate mb-0.5">
                    {rev.name}
                  </div>
                  <div className="text-[11px] text-metallic/70 truncate mb-1">
                    {rev.role}
                  </div>
                  <div className="text-[11px] font-medium text-gold/90 flex items-center gap-1.5">
                    <img
                      src={`/flags/${rev.countryCode}.png`}
                      alt={rev.country}
                      className="w-4 h-2.5 rounded-[2px] object-cover shadow-sm border border-white/10 shrink-0"
                      loading="lazy"
                    />
                    <span className="truncate">{rev.country}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
