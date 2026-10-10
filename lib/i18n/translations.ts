export type Language = "ru" | "uz" | "en";

export interface Translations {
  nav: {
    home: string;
    services: string;
    solutions: string;
    portfolio: string;
    ai: string;
    about: string;
    contact: string;
    calculator: string;
    discuss: string;
  };
  hero: {
    tag: string;
    title1: string;
    title2: string;
    slogan: string;
    subtext: string;
    btnServices: string;
    btnDiscuss: string;
    scroll: string;
  };
  strip: {
    perf: string;
    security: string;
    turnkey: string;
  };
  services: {
    tag: string;
    title: string;
    all12: string;
    searchPlaceholder: string;
    found: string;
    allServices: string;
    categories: string;
    notFound: string;
    notFoundDesc: string;
    viewDetails: string;
    addToProject: string;
    priceCustom: string;
    priceFrom: string;
  };
  serviceDetail: {
    orderService: string;
    consultation: string;
    included: string;
    workflow: string;
    faq: string;
    needCalculation: string;
    leaveRequest: string;
    step: string;
  };
  solutions: {
    tag: string;
    title: string;
    desc: string;
    package: string;
    includedServices: string;
    advantages: string;
    details: string;
    order: string;
  };
  portfolio: {
    tag: string;
    title: string;
    desc: string;
    allWorks: string;
    client: string;
    explore: string;
    challenge: string;
    solution: string;
    result: string;
    techUsed: string;
    discussSimilar: string;
  };
  aiPage: {
    tag: string;
    title: string;
    highlight: string;
    desc: string;
    gptTitle: string;
    gptDesc: string;
    automationTitle: string;
    automationDesc: string;
    scrapingTitle: string;
    scrapingDesc: string;
    archTitle: string;
    step1: string;
    step1Desc: string;
    step2: string;
    step2Desc: string;
    step3: string;
    step3Desc: string;
    step4: string;
    step4Desc: string;
    btnIntegrate: string;
  };
  aboutPage: {
    tag: string;
    title: string;
    desc: string;
    ownerBadge: string;
    btnPersonalTg: string;
    valuesResult: string;
    valuesResultDesc: string;
    valuesSpeed: string;
    valuesSpeedDesc: string;
    valuesSecurity: string;
    valuesSecurityDesc: string;
  };
  calculator: {
    tag: string;
    title: string;
    desc: string;
    step: string;
    of: string;
    step7Final: string;
    projectFormed: string;
    projectFormedDesc: string;
    btnNext: string;
    btnBack: string;
    btnSubmit: string;
    btnSubmitting: string;
    btnRecalculate: string;
    summaryDirection: string;
    summaryGoal: string;
    summaryServices: string;
    summaryTimeline: string;
    summaryBudget: string;
    summaryEstimate: string;
    nameLabel: string;
    phoneLabel: string;
    tgLabel: string;
    companyLabel: string;
    successTitle: string;
    successDesc: string;
    step1Title: string;
    step1Sub: string;
    step2Title: string;
    step2Sub: string;
    step3Title: string;
    step3Sub: string;
    step4Title: string;
    step4Sub: string;
    step5Title: string;
    step5Sub: string;
    step6Title: string;
    step6Sub: string;
  };
  brief: {
    tag: string;
    title: string;
    desc: string;
    nameLabel: string;
    phoneLabel: string;
    companyLabel: string;
    tgLabel: string;
    emailLabel: string;
    webLabel: string;
    businessTypeLabel: string;
    goalLabel: string;
    budgetLabel: string;
    timelineLabel: string;
    descLabel: string;
    fileLabel: string;
    uploadHint: string;
    btnSubmit: string;
    btnSubmitting: string;
    successTitle: string;
    successDesc: string;
    btnAnother: string;
  };
  contact: {
    tag: string;
    title: string;
    desc: string;
    directTitle: string;
    phoneLabel: string;
    tgLabel: string;
    emailLabel: string;
    locationLabel: string;
    socialTitle: string;
    mapTitle: string;
    btnRoute: string;
  };
  workflow: {
    tag: string;
    title: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
    step6Title: string;
    step6Desc: string;
  };
  faq: {
    tag: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  operatorWidget: {
    online: string;
    responseSpeed: string;
    helloTitle: string;
    helloDesc: string;
    serviceSelected: string;
    askQuestion: string;
    writeTelegram: string;
    callPhone: string;
    writeEmail: string;
    fillBrief: string;
    tooltip: string;
    chatTitle: string;
    inputPlaceholder: string;
    sendBtn: string;
    backBtn: string;
    newQuestionBtn: string;
    yesLeaveLead: string;
    askAnotherQuestion: string;
    leaveLeadBtn: string;
    unknownAnswer: string;
    leadFormTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    serviceLabel: string;
    selectServicePlaceholder: string;
    questionLabel: string;
    questionPlaceholder: string;
    submitLeadBtn: string;
    submittingLeadBtn: string;
    successTitle: string;
    successDesc: string;
    closeBtn: string;
    errName: string;
    errPhone: string;
    errEmail: string;
    errQuestion: string;
    errService: string;
    errSendFailed: string;
    serviceOptions: {
      website: string;
      landing: string;
      ecommerce: string;
      smm: string;
      target: string;
      seo: string;
      telegram: string;
      botDev: string;
      design: string;
      branding: string;
      aiAuto: string;
      other: string;
    };
    faqAnswers: {
      website: string;
      landing: string;
      price: string;
      telegram: string;
      smm: string;
      target: string;
      seo: string;
      bot: string;
      design: string;
      brief: string;
      ai: string;
    };
  };
  bottomCta: {
    title1: string;
    title2: string;
    desc: string;
    btnCalc: string;
    btnBrief: string;
  };
  footer: {
    navTitle: string;
    directionsTitle: string;
    contactTitle: string;
    adminPanel: string;
    rights: string;
  };
  scene3d: {
    websiteTitle: string;
    websiteDesc: string;
    aiTitle: string;
    aiDesc: string;
    smmTitle: string;
    smmDesc: string;
    botTitle: string;
    botDesc: string;
    seoTitle: string;
    seoDesc: string;
    designTitle: string;
    designDesc: string;
    videoTitle: string;
    videoDesc: string;
    marketingTitle: string;
    marketingDesc: string;
    ecommerceTitle: string;
    ecommerceDesc: string;
    itTitle: string;
    itDesc: string;
    softwareDevTitle: string;
    softwareDevDesc: string;
    printingTitle: string;
    printingDesc: string;
    btnDetails: string;
  };
  categoryMap: Record<string, string>;
  serviceMap: Record<string, { title: string; desc: string }>;
}

export const translations: Record<Language, Translations> = {
  ru: {
    nav: {
      home: "Главная",
      services: "Услуги",
      solutions: "Решения",
      portfolio: "Портфолио",
      ai: "AI & Автоматизация",
      about: "О компании",
      contact: "Контакты",
      calculator: "Калькулятор",
      discuss: "Обсудить проект",
    },
    hero: {
      tag: "Цифровая платформа полного цикла",
      title1: "TARGET",
      title2: "PRO",
      slogan: "«Технологии, которые двигают бизнес.»",
      subtext: "Разработка • AI • Автоматизация • SMM • Продвижение • Дизайн • IT",
      btnServices: "НАШИ УСЛУГИ",
      btnDiscuss: "ОБСУДИТЬ ПРОЕКТ",
      scroll: "Исследовать экосистему",
    },
    strip: {
      perf: "Высокая производительность",
      security: "Безопасность и надежность",
      turnkey: "Запуск под ключ",
    },
    services: {
      tag: "Marketplace",
      title: "Каталог услуг TARGET PRO",
      all12: "Все 12 направлений",
      searchPlaceholder: "Что вам нужно? (например: сайт, telegram, бот, seo, дизайн)...",
      found: "Найдено услуг:",
      allServices: "Все услуги",
      categories: "Категории",
      notFound: "Услуги по вашему запросу не найдены.",
      notFoundDesc: "Попробуйте изменить поисковый запрос или выбрать другую категорию.",
      viewDetails: "Подробнее",
      addToProject: "В проект",
      priceCustom: "Индивидуально",
      priceFrom: "От",
    },
    serviceDetail: {
      orderService: "ЗАКАЗАТЬ УСЛУГУ",
      consultation: "Консультация в Telegram",
      included: "Что входит в услугу",
      workflow: "Как проходит работа",
      faq: "Вопросы и ответы",
      needCalculation: "Нужен точный расчет по услуге",
      leaveRequest: "ОСТАВИТЬ ЗАЯВКУ",
      step: "ШАГ",
    },
    solutions: {
      tag: "Ecosystem",
      title: "Готовые решения",
      desc: "Комплексы цифровых услуг, подобранные под конкретные сценарии развития вашего бизнеса.",
      package: "Пакетное решение",
      includedServices: "Что входит в комплекс:",
      advantages: "Преимущества комплекса:",
      details: "Подробнее о решении",
      order: "Заказать решение",
    },
    portfolio: {
      tag: "Showcase",
      title: "Портфолио проектов",
      desc: "Примеры реализованных систем, веб-платформ, Telegram-ботов и маркетинговых решений.",
      allWorks: "Смотреть все работы",
      client: "Клиент:",
      explore: "EXPLORE CASE",
      challenge: "Задача",
      solution: "Решение",
      result: "Результат",
      techUsed: "Использованные технологии:",
      discussSimilar: "ОБСУДИТЬ ПОХОЖИЙ ПРОЕКТ",
    },
    aiPage: {
      tag: "Next-Gen AI Integration",
      title: "AI РАБОТАЕТ",
      highlight: "НА ВАС",
      desc: "Внедрение нейросетей, автономных AI-агентов, умных Telegram-ботов и сквозной автоматизации бизнес-процессов.",
      gptTitle: "Умные GPT-ассистенты",
      gptDesc: "Чат-боты, обученные на базе регламентов вашей компании. Консультируют клиентов 24/7, квалифицируют заявки и передают лиды в CRM.",
      automationTitle: "Автоматизация рутины",
      automationDesc: "Сквозная связка сайтов, мессенджеров, учетных программ и таблиц. Автоматическое формирование счетов, актов и отчетов без участия человека.",
      scrapingTitle: "Парсинг и сбор данных",
      scrapingDesc: "Автоматический сбор контактных баз, анализ цен конкурентов на маркетплейсах и регулярная выгрузка структурированных данных.",
      archTitle: "Архитектура внедрения AI в ваш бизнес",
      step1: "01. СБОР ЗНАНИЙ",
      step1Desc: "Оцифровка прайсов, регламентов и ответов на частые вопросы клиентов.",
      step2: "02. ОБУЧЕНИЕ МОДЕЛИ",
      step2Desc: "Тонкая настройка системных промптов и контекстного хранилища эмбеддингов.",
      step3: "03. ИНТЕГРАЦИЯ",
      step3Desc: "Подключение к Telegram-боту, сайту, телефонии и CRM-системе.",
      step4: "04. МОНИТОРИНГ",
      step4Desc: "Контроль точности ответов, аналитика диалогов и постоянное улучшение.",
      btnIntegrate: "ВНЕДРИТЬ AI В МОЙ БИЗНЕС",
    },
    aboutPage: {
      tag: "Company Profile",
      title: "О КОМПАНИИ TARGET",
      desc: "Мы объединяем передовые веб-технологии, внедрение искусственного интеллекта и результативный performance-маркетинг для вывода бизнеса на новый уровень.",
      ownerBadge: "Основатель & Руководитель",
      btnPersonalTg: "Написать лично в Telegram",
      valuesResult: "Фокус на результат",
      valuesResultDesc: "Мы не делаем дизайн ради дизайна. Каждый сайт, бот или кампания направлены на рост конверсий и выручки.",
      valuesSpeed: "Скорость и AI",
      valuesSpeedDesc: "Используем современные фреймворки и нейросетевые инструменты для быстрого запуска без потери качества.",
      valuesSecurity: "Надежность 24/7",
      valuesSecurityDesc: "Безопасность баз данных, защита от сбоев, регулярные бэкапы и долгосрочное партнерское сопровождение.",
    },
    calculator: {
      tag: "Configurator",
      title: "Конфигуратор проекта",
      desc: "Соберите индивидуальный пакет услуг за 7 простых шагов и получите прозрачный предварительный расчет.",
      step: "ШАГ",
      of: "из",
      step7Final: "Шаг 7 из 7 • Финал",
      projectFormed: "ВАШ ПРОЕКТ СФОРМИРОВАН",
      projectFormedDesc: "Проверьте конфигурацию и оставьте контакты для получения персонального расчета.",
      btnNext: "Далее",
      btnBack: "Назад",
      btnSubmit: "ОТПРАВИТЬ ЗАПРОС",
      btnSubmitting: "ОТПРАВКА...",
      btnRecalculate: "Рассчитать еще один проект",
      summaryDirection: "Направление:",
      summaryGoal: "Главная цель:",
      summaryServices: "Выбранные услуги:",
      summaryTimeline: "Желаемый срок:",
      summaryBudget: "Бюджет:",
      summaryEstimate: "Предварительная смета:",
      nameLabel: "Ваше имя *",
      phoneLabel: "Телефон *",
      tgLabel: "Telegram (никнейм)",
      companyLabel: "Компания / Бренд",
      successTitle: "ВАШ ПРОЕКТ СФОРМИРОВАН",
      successDesc: "Заявка успешно сохранена в системе TARGET PRO. Наш специалист свяжется с вами в ближайшее время.",
      step1Title: "Какой у вас бизнес?",
      step1Sub: "Выберите сферу вашей деятельности",
      step2Title: "Что нужно решить в первую очередь?",
      step2Sub: "Главная цель обращения к TARGET PRO",
      step3Title: "Выберите необходимые услуги",
      step3Sub: "Можно выбрать несколько пунктов",
      step4Title: "Какие платформы планируете использовать?",
      step4Sub: "Каналы привлечения клиентов",
      step5Title: "Желаемый срок реализации",
      step5Sub: "Когда проект должен быть запущен?",
      step6Title: "Ориентировочный бюджет",
      step6Sub: "Планируемый диапазон инвестиций",
    },
    brief: {
      tag: "Project Brief",
      title: "Техническое задание",
      desc: "Заполните онлайн-бриф для детальной оценки сроков и бюджета вашего проекта.",
      nameLabel: "Контактное лицо (Имя) *",
      phoneLabel: "Номер телефона *",
      companyLabel: "Компания / Бренд",
      tgLabel: "Telegram",
      emailLabel: "Электронная почта",
      webLabel: "Текущий сайт / соцсети (если есть)",
      businessTypeLabel: "Сфера бизнеса",
      goalLabel: "Главная цель проекта",
      budgetLabel: "Планируемый бюджет",
      timelineLabel: "Сроки запуска",
      descLabel: "Подробное описание задачи / ТЗ *",
      fileLabel: "Прикрепить файл / ТЗ / презентацию",
      uploadHint: "Нажмите для выбора файла (PDF, DOCX, ZIP, PNG до 50MB)",
      btnSubmit: "ОТПРАВИТЬ ТЕХНИЧЕСКОЕ ЗАДАНИЕ",
      btnSubmitting: "СОХРАНЕНИЕ...",
      successTitle: "ТЕХНИЧЕСКОЕ ЗАДАНИЕ ПРИНЯТО",
      successDesc: "Бриф успешно сохранен в базе данных TARGET PRO. Команда подготовит детальное КП.",
      btnAnother: "Отправить еще один бриф",
    },
    contact: {
      tag: "Get In Touch",
      title: "Контакты TARGET PRO",
      desc: "Свяжитесь с нами любым удобным способом для обсуждения задач, аудита или запуска проекта.",
      directTitle: "Прямая связь и реквизиты",
      phoneLabel: "Телефон",
      tgLabel: "Telegram",
      emailLabel: "Email",
      locationLabel: "Локация и график",
      socialTitle: "Мы в соцсетях",
      mapTitle: "Карта и маршрут",
      btnRoute: "ПОКАЗАТЬ МАРШРУТ",
    },
    workflow: {
      tag: "Workflow",
      title: "КАК МЫ РАБОТАЕМ",
      step1Title: "Анализ",
      step1Desc: "Глубокое изучение ниши и целей",
      step2Title: "Стратегия",
      step2Desc: "Пошаговый план и архитектура",
      step3Title: "Разработка",
      step3Desc: "Чистый код и современный визуал",
      step4Title: "Запуск",
      step4Desc: "Безопасный деплой и релиз",
      step5Title: "Оптимизация",
      step5Desc: "Аналитика и тюнинг конверсии",
      step6Title: "Масштаб",
      step6Desc: "Рост прибыли и трафика",
    },
    faq: {
      tag: "FAQ",
      title: "ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ",
      items: [
        {
          question: "С ЧЕГО НАЧИНАЕТСЯ СОТРУДНИЧЕСТВО С TARGET PRO?",
          answer: "С подробного анализа вашей задачи. Вы можете заполнить бриф, связаться через Telegram @Mr_Zarrux или позвонить по номеру +998932368910. Мы составим прозрачное коммерческое предложение с точными этапами и сроками.",
        },
        {
          question: "РАБОТАЕТЕ ЛИ ВЫ ПО ОФИЦИАЛЬНОМУ ДОГОВОРУ?",
          answer: "Да, мы работаем официально с заключением договора, четко зафиксированным техническим заданием, этапами оплаты и юридическими гарантиями.",
        },
        {
          question: "КАК РАССЧИТЫВАЕТСЯ СТОИМОСТЬ УСЛУГ?",
          answer: "В зависимости от масштаба задачи: для типовых решений действует фиксированный прозрачный прайс, для сложных нестандартных систем рассчитывается индивидуальная смета после детального аудита.",
        },
        {
          question: "ПРЕДОСТАВЛЯЕТСЯ ЛИ ПОДДЕРЖКА ПОСЛЕ СДАЧИ ПРОЕКТА?",
          answer: "Обязательно. Мы обеспечиваем технический мониторинг стабильности, резервное копирование данных, консультации и дальнейшее развитие функционала.",
        },
      ],
    },
    operatorWidget: {
      online: "Онлайн",
      responseSpeed: "Ответим в ближайшее время",
      helloTitle: "Здравствуйте! 👋",
      helloDesc: "Чем можем помочь?",
      serviceSelected: "Отличный выбор! 👋\nЕсли хотите, я помогу подобрать решение под вашу задачу.",
      askQuestion: "Задать вопрос",
      writeTelegram: "Написать в Telegram",
      callPhone: "Позвонить: +998932368910",
      writeEmail: "Написать на Email",
      fillBrief: "ЗАПОЛНИТЬ БРИФ",
      tooltip: "Онлайн • Помочь с выбором?",
      chatTitle: "Консультант TARGET PRO",
      inputPlaceholder: "Введите ваш вопрос...",
      sendBtn: "ОТПРАВИТЬ",
      backBtn: "Назад",
      newQuestionBtn: "← Новый вопрос",
      yesLeaveLead: "ДА, ОСТАВИТЬ ЗАЯВКУ",
      askAnotherQuestion: "ЗАДАТЬ ДРУГОЙ ВОПРОС",
      leaveLeadBtn: "ОСТАВИТЬ ЗАЯВКУ",
      unknownAnswer: "Спасибо за ваш вопрос! Чтобы дать точный ответ с расчетом и деталями, оставьте контактные данные, и наш специалист свяжется с вами в течение 10 минут.",
      leadFormTitle: "Оставить заявку",
      nameLabel: "Ваше имя *",
      namePlaceholder: "Как к вам обращаться?",
      phoneLabel: "Телефон *",
      phonePlaceholder: "+998 90 123 45 67",
      emailLabel: "Email",
      emailPlaceholder: "example@domain.com",
      companyLabel: "Компания / Проект",
      companyPlaceholder: "Название компании (необязательно)",
      serviceLabel: "Интересующая услуга",
      selectServicePlaceholder: "Выберите услугу",
      questionLabel: "Ваш вопрос / задача *",
      questionPlaceholder: "Опишите задачу или проект...",
      submitLeadBtn: "ОТПРАВИТЬ ЗАЯВКУ",
      submittingLeadBtn: "ОТПРАВКА...",
      successTitle: "Заявка отправлена! ✅",
      successDesc: "Спасибо! Наш ведущий специалист свяжется с вами в течение 10 минут для обсуждения задачи.",
      closeBtn: "ЗАКРЫТЬ",
      errName: "Имя должно содержать минимум 2 символа",
      errPhone: "Введите корректный номер телефона",
      errEmail: "Введите корректный адрес email",
      errQuestion: "Опишите ваш вопрос подробнее (от 5 символов)",
      errService: "Выберите интересующую услугу",
      errSendFailed: "Ошибка отправки. Попробуйте еще раз или напишите нам в Telegram.",
      serviceOptions: {
        website: "Создание сайта",
        landing: "Landing Page",
        ecommerce: "Интернет-магазин",
        smm: "SMM продвижение",
        target: "Таргетированная реклама",
        seo: "SEO продвижение",
        telegram: "Продвижение в Telegram",
        botDev: "Разработка ботов",
        design: "Дизайн и брендинг",
        branding: "Разработка логотипов",
        aiAuto: "AI и автоматизация",
        other: "Другое направление",
      },
      faqAnswers: {
        website: "Мы создаем высоконагруженные сайты, порталы и веб-сервисы на Next.js с адаптивным премиум-дизайном, SEO-подготовкой и интеграцией с CRM под ключ.",
        landing: "Landing Page разрабатывается за 5–10 дней с конверсионной структурой, продающими текстами, 3D-анимациями и мгновенным сбором лидов.",
        price: "Стоимость рассчитывается индивидуально под масштаб проекта: лендинги от $300, корпоративные сайты от $700, боты и автоматизация от $200. Хотите точный расчет?",
        telegram: "Мы разрабатываем Telegram-ботов любой сложности (магазины, воронки, платежи, AI-боты), а также привлекаем целевых подписчиков в каналы.",
        smm: "Комплексный SMM включает стратегию, регулярный контент-план, съемку Reels, Stories, визуал и таргет с фокусом на окупаемость рекламы.",
        target: "Настраиваем таргетированную рекламу в Meta (Instagram/Facebook) с аналитикой окупаемости (ROAS) и непрерывной оптимизацией лид-форм.",
        seo: "Комплексное SEO продвижение выводит сайт в топ-1 Google и Яндекс по целевым коммерческим запросам за счет чистой структуры и авторитета.",
        bot: "Боты TARGET PRO автоматизируют продажи 24/7, принимают оплату через Click/Payme/Stripe, синхронизируются с CRM и консультируют через AI.",
        design: "Создаем премиальный дизайн: фирменный стиль, логотипы, брендбуки, UI/UX интерфейсы и анимированные стикерпаки.",
        brief: "Заполнение брифа занимает всего 3 минуты и позволяет нам заранее подготовить точную смету и архитектуру решения под ваш бизнес.",
        ai: "Внедряем искусственный интеллект: умные AI-ассистенты для клиентской поддержки, автоматический парсинг данных и генерация контента.",
      },
    },
    bottomCta: {
      title1: "Готовы масштабировать",
      title2: "ваш бизнес?",
      desc: "Оставьте заявку на бесплатную консультацию или воспользуйтесь интерактивным калькулятором для расчета стоимости проекта.",
      btnCalc: "Открыть калькулятор",
      btnBrief: "Заполнить бриф",
    },
    footer: {
      navTitle: "Навигация",
      directionsTitle: "Направления",
      contactTitle: "Прямая связь",
      adminPanel: "Панель администратора",
      rights: "Все права защищены.",
    },
    scene3d: {
      websiteTitle: "ВЕБ-САЙТЫ И СЕРВИСЫ",
      websiteDesc: "Корпоративные порталы, лендинги и high-load сервисы",
      aiTitle: "AI И АВТОМАТИЗАЦИЯ",
      aiDesc: "Нейросети, умные ассистенты и парсинг бизнес-процессов",
      smmTitle: "SMM И СОЦСЕТИ",
      smmDesc: "Стратегия, креатив, таргетинг и виральный контент",
      botTitle: "TELEGRAM БОТЫ",
      botDesc: "Автоворонки, интеграции с CRM и боты приёма платежей",
      seoTitle: "SEO И ТРАФИК",
      seoDesc: "Вывод в топ Google и Яндекс, органический поток лидов",
      designTitle: "ДИЗАЙН И БРЕНДИНГ",
      designDesc: "Айдентика, премиальный UI/UX и брендбуки",
      videoTitle: "ВИДЕО И МЕДИА",
      videoDesc: "Продакшн, reels, 3D-анимация и промо-ролики",
      marketingTitle: "МАРКЕТИНГ",
      marketingDesc: "Сквозная аналитика, контекст и performance-стратегии",
      ecommerceTitle: "ИНТЕРНЕТ-МАГАЗИНЫ",
      ecommerceDesc: "E-commerce платформы с приемом онлайн-оплат",
      itTitle: "IT И БЕЗОПАСНОСТЬ",
      itDesc: "Серверная инфраструктура, защита данных и DevOps",
      softwareDevTitle: "РАЗРАБОТКА ПО",
      softwareDevDesc: "Сложные веб-сервисы, CRM-системы, API и архитектура кода",
      printingTitle: "ПОЛИГРАФИЯ",
      printingDesc: "Премиальная печать, мерч, вывески и упаковка",
      btnDetails: "Подробнее →",
    },
    categoryMap: {
      "development-technology": "РАЗРАБОТКА И ТЕХНОЛОГИИ",
      "smm-promotion": "SMM И ПРОДВИЖЕНИЕ",
      "social-media": "СОЦИАЛЬНЫЕ СЕТИ",
      "content-platforms": "КОНТЕНТ-ПЛОЩАДКИ",
      "maps-reputation": "КАРТЫ И РЕПУТАЦИЯ",
      "seo-traffic": "SEO И ТРАФИК",
      "app-promotion": "ПРИЛОЖЕНИЯ",
      "design-creative": "ДИЗАЙН И КРЕАТИВ",
      "animated-stickers": "АНИМИРОВАННЫЕ СТИКЕРЫ",
      "media-advertising": "МЕДИА И РЕКЛАМА",
      "printing": "ПОЛИГРАФИЯ И ПЕЧАТЬ",
      "it-technical-services": "IT И ТЕХНИЧЕСКИЕ СЕРВИСЫ",
    },
    serviceMap: {
      "website-development": { title: "Создание сайтов", desc: "Корпоративные сайты и веб-системы премиум-уровня с высокой конверсией." },
      "mini-sites": { title: "Мини-сайты", desc: "Быстрые одностраничные сайты-визитки для экспертов и малого бизнеса." },
      "landing-pages": { title: "Landing Pages", desc: "Продающие посадочные страницы с акцентом на максимальную конверсию в заявку." },
      "e-commerce": { title: "Интернет-магазины", desc: "Масштабируемые интернет-магазины с каталогом, корзиной и приемом платежей." },
      "telegram-bots": { title: "Telegram-боты", desc: "Умные Telegram-боты для заказов, рассылок, воронок продаж и поддержки клиентов." },
      "software-development": { title: "Разработка софта и программ", desc: "Индивидуальное ПО для автоматизации бизнес-процессов, десктоп и веб-софт." },
      "data-scraping": { title: "Парсинг и сбор данных", desc: "Автоматизированный парсинг сайтов, баз данных, маркетплейсов и каталогов." },
      "process-automation": { title: "Автоматизация процессов", desc: "Связка сервисов, авто-обработка заявок, уведомления в мессенджеры и CRM." },
      "api-crm-integrations": { title: "API и CRM интеграции", desc: "Подключение AmoCRM, Bitrix24, МойСклад, 1С, телефонии и внешних API." },
      "ai-development": { title: "AI-разработка", desc: "Внедрение искусственного интеллекта: GPT-ассистенты, боты-консультанты, анализ данных." },
      "full-smm-promotion": { title: "Комплексное продвижение", desc: "Стратегия, контент, визуал, таргетинг и системный рост продаж из соцсетей." },
      "account-management": { title: "Ведение аккаунтов", desc: "Регулярный постинг, Stories, Reels, оформление ленты и коммуникация." },
      "content-strategy": { title: "Контент-стратегия", desc: "Разработка смысловой архитектуры контента для роста охватов и продаж." },
      "client-acquisition": { title: "Привлечение клиентов и масштабирование", desc: "Генерация целевых заявок и масштабирование рекламных бюджетов с окупаемостью." },
      "instagram-promotion": { title: "Instagram продвижение", desc: "Подписчики, лайки, просмотры Reels, Stories, комментарии и охват." },
      "telegram-channel-promotion": { title: "Telegram продвижение", desc: "Привлечение аудитории в каналы, просмотры публикаций, реакции и активность." },
      "tiktok-promotion": { title: "TikTok продвижение", desc: "Просмотры, лайки, подписчики и вывод видео в тренды и рекомендации TikTok." },
      "youtube-promotion": { title: "YouTube продвижение", desc: "Подписчики, просмотры длинных видео и Shorts, часы просмотров для монетизации." },
      "other-social-platforms": { title: "Продвижение Facebook, VK, X, Twitch", desc: "Охваты, подписчики и активность на дополнительных социальных платформах." },
      "yandex-zen-promotion": { title: "Яндекс Дзен", desc: "Статьи, дочитывания, подписчики каналов и вывод публикаций в ленту рекомендаций." },
      "audio-visual-platforms": { title: "Pinterest, SoundCloud, Shazam", desc: "Прослушивания треков, распознавания в Shazam, пины и трафик из Pinterest." },
      "google-maps-reputation": { title: "Google Карты и Google Business", desc: "Оформление карточки, отзывы, подъем рейтинга и вывод компании в топ выдачи карт." },
      "2gis-yandex-maps": { title: "2GIS и Яндекс Карты", desc: "Оптимизация профилей в 2ГИС и Яндекс.Картах, повышение позиций в навигаторах." },
      "serm-reputation-management": { title: "Управление репутацией (SERM)", desc: "Очистка поисковой выдачи от негатива, формирование позитивного имиджа бренда." },
      "seo-promotion": { title: "SEO продвижение сайтов", desc: "Вывод сайта в топ-1 Google и Яндекс по целевым коммерческим запросам." },
      "seo-audit": { title: "SEO аудит и оптимизация", desc: "Детальный анализ ошибок сайта, скорости загрузки и индексации поисковиками." },
      "mobile-app-growth": { title: "Продвижение мобильных приложений", desc: "Реальные установки, вывод в топы категорий Google Play и App Store." },
      "logo-branding": { title: "Разработка логотипов и брендинг", desc: "Премиальные логотипы, шрифтовые пары, фирменные цвета и полный брендбук." },
      "smm-design": { title: "SMM дизайн и обложки", desc: "Оформление профилей, обложки актуального, шаблоны постов и анимационные заставки." },
      "menu-design": { title: "Дизайн меню ресторанов и кафе", desc: "Продающее меню для заведений: печатные каталоги, электронные QR-меню." },
      "telegram-tgs-stickers": { title: "Telegram анимированные стикеры (TGS)", desc: "Векторные плавные стикерпаки для брендов и блогеров в формате TGS." },
      "whatsapp-webp-stickers": { title: "WhatsApp стикеры (WEBP)", desc: "Адаптированные стикеры и гиф-анимации для общения с клиентами в WhatsApp." },
      "video-production": { title: "Видеомонтаж и рекламные ролики", desc: "Монтаж Reels, промо-роликов, динамичные эффекты, саунд-дизайн и цветокоррекция." },
      "targeted-advertising": { title: "Таргетированная реклама", desc: "Настройка рекламы в Meta (Instagram/Facebook) с прозрачной окупаемостью лидов." },
      "printing-services": { title: "Печать полиграфии и мерча", desc: "Качественная печать визиток, буклетов, баннеров и брендированной продукции." },
      "windows-installation-optimization": { title: "Установка и оптимизация Windows", desc: "Чистая установка Windows 10/11, настройка драйверов, удаление мусора и ускорение системы." },
      "virus-removal-pc-cleaning": { title: "Чистка ПК и удаление вирусов", desc: "Удаление вредоносных программ, майнеров, очистка от пыли и замена термопасты." },
      "network-vpn-remote-access": { title: "Настройка сетей, VPN и удаленный доступ", desc: "Настройка роутеров, локальных сетей, безопасных VPN и удаленной помощи." },
    },
  },

  uz: {
    nav: {
      home: "Bosh sahifa",
      services: "Xizmatlar",
      solutions: "Yechimlar",
      portfolio: "Loyihalar",
      ai: "AI & Avtomatlashtirish",
      about: "Biz haqimizda",
      contact: "Bog‘lanish",
      calculator: "Kalkulyator",
      discuss: "Loyiha muhokamasi",
    },
    hero: {
      tag: "To‘liq siklli raqamli platforma",
      title1: "TARGET",
      title2: "PRO",
      slogan: "«Biznesingizni rivojlantiruvchi texnologiyalar.»",
      subtext: "Dasturlash • AI • Avtomatlashtirish • SMM • Rivojlantirish • Dizayn • IT",
      btnServices: "XIZMATLARIMIZ",
      btnDiscuss: "LOYIHANI MUHOKAMA QILISH",
      scroll: "Ekotizimni o‘rganish",
    },
    strip: {
      perf: "Yuqori unumdorlik",
      security: "Xavfsizlik va ishonchlilik",
      turnkey: "To‘liq tayyor ishga tushirish",
    },
    services: {
      tag: "Marketplace",
      title: "TARGET PRO xizmatlar katalogi",
      all12: "Barcha 12 yo‘nalish",
      searchPlaceholder: "Sizga nima kerak? (masalan: sayt, telegram, bot, seo, dizayn)...",
      found: "Topilgan xizmatlar:",
      allServices: "Barcha xizmatlar",
      categories: "Kategoriyalar",
      notFound: "So‘rovingiz bo‘yicha xizmatlar topilmadi.",
      notFoundDesc: "Iltimos, qidiruv so‘zini o‘zgartiring yoki boshqa toifani tanlang.",
      viewDetails: "Batafsil",
      addToProject: "Loyihaga qo‘shish",
      priceCustom: "Individual",
      priceFrom: "Boshlab",
    },
    serviceDetail: {
      orderService: "XIZMATGA BUYURTMA BERISH",
      consultation: "Telegram orqali maslahat",
      included: "Xizmat tarkibiga nimalar kiradi",
      workflow: "Ish jarayoni qanday kechadi",
      faq: "Savol-javoblar",
      needCalculation: "Xizmat bo‘yicha aniq hisob-kitob kerakmi",
      leaveRequest: "SO‘ROV YUBORISH",
      step: "QADAM",
    },
    solutions: {
      tag: "Ecosystem",
      title: "Tayyor yechimlar",
      desc: "Biznesingizning o‘sishiga moslangan kompleks raqamli xizmatlar to‘plami.",
      package: "Paket yechim",
      includedServices: "Yechim tarkibi:",
      advantages: "Afzalliklar:",
      details: "Yechim haqida batafsil",
      order: "Yechimga buyurtma berish",
    },
    portfolio: {
      tag: "Showcase",
      title: "Bajarilgan ishlar portfeli",
      desc: "Biz yaratgan veb-tizimlar, Telegram-botlar, AI yechimlari va marketing natijalari.",
      allWorks: "Barcha ishlarni ko‘rish",
      client: "Buyurtmachi:",
      explore: "KEYS BILAN TANISHISH",
      challenge: "Vazifa",
      solution: "Yechim",
      result: "Natija",
      techUsed: "Qo‘llanilgan texnologiyalar:",
      discussSimilar: "SHUNGA O‘XSHASH LOYIHANI MUHOKAMA QILISH",
    },
    aiPage: {
      tag: "Next-Gen AI Integration",
      title: "AI BIZNESINGIZ UCHUN",
      highlight: "ISHLAYDI",
      desc: "Sun’iy intellekt, avtonom AI-agentlar, aqlli Telegram-botlar va to‘liq biznes jarayonlarini avtomatlashtirish.",
      gptTitle: "Aqlli GPT-yordamchilar",
      gptDesc: "Kompaniyangiz qoidalariga o‘rgatilgan chat-botlar. Mijozlarga 24/7 xizmat ko‘rsatadi va arizalarni CRM ga kiritadi.",
      automationTitle: "Muntazam vazifalarni avtomatlashtirish",
      automationDesc: "Saytlar, messenjerlar, hisob-kitob dasturlari va jadvallarni yagona zanjirga ulash. Hujjatlar inson omilisiz yaratiladi.",
      scrapingTitle: "Parsing va ma’lumotlar yig‘ish",
      scrapingDesc: "Kontaktlar bazasini yig‘ish, raqobatchilar narxlarini tahlil qilish va ma’lumotlarni tizimlashtirish.",
      archTitle: "AI texnologiyalarini joriy etish bosqichlari",
      step1: "01. MA’LUMOTLARNI YIG‘ISH",
      step1Desc: "Narxlar, standartlar va tez-tez beriladigan savollarni raqamlashtirish.",
      step2: "02. MODELNI O‘RGATISH",
      step2Desc: "Tizim qoidalarini aniq sozlash va kontekst bazasini yaratish.",
      step3: "03. INTEGRATSIYA",
      step3Desc: "Telegram-bot, sayt, telefoniya va CRM tizimiga to‘liq ulash.",
      step4: "04. NAZORAT VA MONITOTING",
      step4Desc: "Javoblar aniqligini nazorat qilish va doimiy ravishda mukammallashtirish.",
      btnIntegrate: "AI-NI BIZNESIMGA JORIY QILISH",
    },
    aboutPage: {
      tag: "Company Profile",
      title: "TARGET PRO HAQIDA",
      desc: "Biznesingizni yangi bosqichga olib chiqish uchun ilg‘or veb-texnologiyalar, sun’iy intellekt va natijador marketingni birlashtiramiz.",
      ownerBadge: "Asoschi & Rahbar",
      btnPersonalTg: "Telegramda shaxsan bog‘lanish",
      valuesResult: "Natijaga yo‘naltirilganlik",
      valuesResultDesc: "Shunchaki dizayn uchun ishlamaymiz. Har bir sayt yoki bot daromad va arizalar sonini oshirishga xizmat qiladi.",
      valuesSpeed: "Tezlik va AI",
      valuesSpeedDesc: "Sifatni yo‘qotmasdan loyihalarni tezkor ishga tushirish uchun zamonaviy vositalardan foydalanamiz.",
      valuesSecurity: "24/7 Ishonchlilik",
      valuesSecurityDesc: "Ma’lumotlar xavfsizligi, muntazam nusxalash (backup) va uzoq muddatli hamkorlik kafolati.",
    },
    calculator: {
      tag: "Configurator",
      title: "Loyiha kalkulyatori",
      desc: "7 ta oddiy qadamda o‘z loyihangizni to‘plang va dastlabki smetani oling.",
      step: "QADAM",
      of: "dan",
      step7Final: "7-qadam • Yakuniy bosqich",
      projectFormed: "SIZNING LOYIHANGIZ SHAKLLANDI",
      projectFormedDesc: "Konfiguratsiyani tekshiring va shaxsiy hisob-kitob uchun kontaktlaringizni qoldiring.",
      btnNext: "Keyingisi",
      btnBack: "Orqaga",
      btnSubmit: "SO‘ROV YUBORISH",
      btnSubmitting: "YUBORILMOQDA...",
      btnRecalculate: "Yana bitta loyihani hisoblash",
      summaryDirection: "Yo‘nalish:",
      summaryGoal: "Asosiy maqsad:",
      summaryServices: "Tanlangan xizmatlar:",
      summaryTimeline: "Kerakli muddat:",
      summaryBudget: "Byudjet:",
      summaryEstimate: "Dastlabki smeta:",
      nameLabel: "Ismingiz *",
      phoneLabel: "Telefon raqamingiz *",
      tgLabel: "Telegram (foydalanuvchi nomi)",
      companyLabel: "Kompaniya / Brend",
      successTitle: "LOYIHANGIZ SHAKLLANTIRILDI",
      successDesc: "Ariza TARGET PRO tizimiga muvaffaqiyatli saqlandi. Mutaxassisimiz tez orada siz bilan bog‘lanadi.",
      step1Title: "Biznesingiz qaysi sohada?",
      step1Sub: "Faoliyat turini tanlang",
      step2Title: "Birinchi navbatda nima qilish kerak?",
      step2Sub: "TARGET PRO ga murojaatdan asosiy maqsad",
      step3Title: "Kerakli xizmatlarni tanlang",
      step3Sub: "Bir nechta bandni tanlashingiz mumkin",
      step4Title: "Qaysi platformalardan foydalanmoqchisiz?",
      step4Sub: "Mijozlarni jalb qilish kanallari",
      step5Title: "Loyihani topshirish muddati",
      step5Sub: "Tizim qachon tayyor bo‘lishi kerak?",
      step6Title: "Rejalashtirilgan byudjet",
      step6Sub: "Investitsiya qilish diapazoni",
    },
    brief: {
      tag: "Project Brief",
      title: "Texnik topshiriq (Brif)",
      desc: "Loyiha muddatlari va narxini aniq hisoblash uchun onlayn brifni to‘ldiring.",
      nameLabel: "Mas’ul shaxs (Ism) *",
      phoneLabel: "Telefon raqami *",
      companyLabel: "Kompaniya / Brend",
      tgLabel: "Telegram",
      emailLabel: "Elektron pochta",
      webLabel: "Amaldagi sayt / ijtimoiy tarmoqlar",
      businessTypeLabel: "Biznes sohasi",
      goalLabel: "Loyihaning asosiy maqsadi",
      budgetLabel: "Rejalashtirilgan byudjet",
      timelineLabel: "Ishga tushirish muddati",
      descLabel: "Vazifaning batafsil tavsifi / TT *",
      fileLabel: "Fayl / TT / taqdimotni biriktirish",
      uploadHint: "Faylni tanlash uchun bosing (PDF, DOCX, ZIP, PNG 50MB gacha)",
      btnSubmit: "TEXNIK TOPSHIRIQNI YUBORISH",
      btnSubmitting: "SAQLANMOQDA...",
      successTitle: "TEXNIK TOPSHIRIQ QABUL QILINDI",
      successDesc: "Brif TARGET PRO ma’lumotlar bazasiga muvaffaqiyatli saqlandi. Tez orada tijorat taklifini tayyorlaymiz.",
      btnAnother: "Yana bitta brif yuborish",
    },
    contact: {
      tag: "Get In Touch",
      title: "TARGET PRO Kontaktlari",
      desc: "Loyiha bo‘yicha maslahat yoki uni ishga tushirish uchun o‘zingizga qulay usulda bog‘laning.",
      directTitle: "To‘g‘ridan-to‘g‘ri aloqa va rekvizitlar",
      phoneLabel: "Telefon",
      tgLabel: "Telegram",
      emailLabel: "Email",
      locationLabel: "Manzil va ish vaqti",
      socialTitle: "Biz ijtimoiy tarmoqlarda",
      mapTitle: "Xarita va yo‘nalish",
      btnRoute: "YO‘NALISHNI KO‘RSATISH",
    },
    workflow: {
      tag: "Workflow",
      title: "BIZ QANDAY ISHLAYMIZ",
      step1Title: "Tahlil",
      step1Desc: "Bozor va maqsadlarni chuqur o‘rganish",
      step2Title: "Strategiya",
      step2Desc: "Bosqichma-bosqich reja va arxitektura",
      step3Title: "Dasturlash",
      step3Desc: "Toza kod va zamonaviy vizual",
      step4Title: "Ishga tushirish",
      step4Desc: "Xavfsiz serverga joylash va reliz",
      step5Title: "Optimizatsiya",
      step5Desc: "Konversiyani tahlil qilish va oshirish",
      step6Title: "Kengaytirish",
      step6Desc: "Daromad va mijozlar oqimini ko‘paytirish",
    },
    faq: {
      tag: "FAQ",
      title: "KO‘P BERILADIGAN SAVOLLAR",
      items: [
        {
          question: "TARGET PRO BILAN HAMKORLIK NIMADAN BOSHLANADI?",
          answer: "Vazifangizni chuqur tahlil qilishdan boshlanadi. Siz brif formasini to‘ldirishingiz, Telegram @Mr_Zarrux orqali bog‘lanishingiz yoki +998932368910 raqamiga qo‘ng‘iroq qilishingiz mumkin. Biz aniq bosqichlar va muddatlar bilan shaffof tijorat taklifini tuzamiz.",
        },
        {
          question: "RASMIY SHARTNOMA ASOSIDA ISHLAYSIZLARMI?",
          answer: "Ha, biz rasmiy shartnoma, qat’iy belgilangan texnik topshiriq, bosqichma-bosqich to‘lov va kafolat majburiyatlari asosida ishlaymiz.",
        },
        {
          question: "XIZMATLAR NARXI QANDAY HISOBLANADI?",
          answer: "Vazifaning ko‘lamiga qarab: standart xizmatlar uchun shaffof belgilangan narxlar amal qiladi, murakkab nostandart tizimlar uchun esa batafsil auditdan so‘ng individual smeta tuziladi.",
        },
        {
          question: "LOYIHA TOPSHIRILGANDAN KEYIN QO‘LLAB-QUVVATLASH XIZMATI BORMI?",
          answer: "Albatta. Biz loyihalarni ishga tushirgandan keyin qoldirib ketmaymiz: server barqarorligi monitoringi, zaxira nusxalash (backup), maslahatlar va funksionalni doimiy rivojlantirishni ta’minlaymiz.",
        },
      ],
    },
    operatorWidget: {
      online: "Onlayn",
      responseSpeed: "Yaqin daqiqalarda javob beramiz",
      helloTitle: "Assalomu alaykum! 👋",
      helloDesc: "Sizga qanday yordam bera olamiz?",
      serviceSelected: "Ajoyib tanlov! 👋\nIxtiyoriy bo‘lsa, sizning vazifangizga mos yechimni tanlashda yordam beraman.",
      askQuestion: "Savol berish",
      writeTelegram: "Telegram orqali yozish",
      callPhone: "Qo‘ng‘iroq qilish: +998932368910",
      writeEmail: "Email orqali yozish",
      fillBrief: "BRIFNI TO‘LDIRISH",
      tooltip: "Onlayn • Tanlashda yordam kerakmi?",
      chatTitle: "TARGET PRO Maslahatchisi",
      inputPlaceholder: "Savolingizni yozing...",
      sendBtn: "YUBORISH",
      backBtn: "Orqaga",
      newQuestionBtn: "← Yangi savol",
      yesLeaveLead: "HA, ARIZA QOLDIRISH",
      askAnotherQuestion: "BOSHQA SAVOL BERISH",
      leaveLeadBtn: "ARIZA QOLDIRISH",
      unknownAnswer: "Savolingiz uchun rahmat! Aniq hisob-kitob va tafsilotlarni taqdim etishimiz uchun aloqa ma’lumotlaringizni qoldiring, mutaxassisimiz 10 daqiqa ichida siz bilan bog‘lanadi.",
      leadFormTitle: "Ariza qoldirish",
      nameLabel: "Ismingiz *",
      namePlaceholder: "Sizga qanday murojaat qilaylik?",
      phoneLabel: "Telefon raqami *",
      phonePlaceholder: "+998 90 123 45 67",
      emailLabel: "Email",
      emailPlaceholder: "misol@domen.uz",
      companyLabel: "Kompaniya / Loyiha",
      companyPlaceholder: "Kompaniya nomi (ixtiyoriy)",
      serviceLabel: "Qiziqtirgan xizmat",
      selectServicePlaceholder: "Xizmatni tanlang",
      questionLabel: "Savolingiz yoki vazifangiz *",
      questionPlaceholder: "Loyiha yoki vazifani qisqacha yozing...",
      submitLeadBtn: "ARIZANI YUBORISH",
      submittingLeadBtn: "YUBORILMOQDA...",
      successTitle: "Ariza qabul qilindi! ✅",
      successDesc: "Rahmat! Bosh mutaxassisimiz vazifani muhokama qilish uchun 10 daqiqa ichida siz bilan bog‘lanadi.",
      closeBtn: "YOPISH",
      errName: "Ism kamida 2 ta belgidan iborat bo‘lishi kerak",
      errPhone: "To‘g‘ri telefon raqamini kiriting",
      errEmail: "To‘g‘ri email manzilini kiriting",
      errQuestion: "Savolingizni batafsilroq yozing (kamida 5 ta belgi)",
      errService: "Qiziqtirgan xizmatni tanlang",
      errSendFailed: "Yuborishda xatolik yuz berdi. Qayta urinib ko‘ring yoki Telegram orqali yozing.",
      serviceOptions: {
        website: "Sayt yaratish",
        landing: "Landing Page",
        ecommerce: "Internet-do‘kon",
        smm: "SMM xizmatlari",
        target: "Target reklama",
        seo: "SEO targ‘ibot",
        telegram: "Telegram kanallarini rivojlantirish",
        botDev: "Bot yaratish",
        design: "Dizayn va brending",
        branding: "Logotip ishlab chiqish",
        aiAuto: "AI va avtomatlashtirish",
        other: "Boshqa yo‘nalish",
      },
      faqAnswers: {
        website: "Biz Next.js asosida tezkor, moslashuvchan, yuqori konversiyali korporativ veb-saytlar va tizimlarni CRM integratsiyasi bilan ishlab chiqamiz.",
        landing: "Landing Page 5–10 kun ichida sotuvchi struktura, kuchli matnlar, 3D animatsiya va arizalarni avtomat yig‘ish tizimi bilan tayyorlanadi.",
        price: "Narx loyiha ko‘lamiga qarab belgilanadi: lendinglar $300 dan, korporativ saytlar $700 dan, botlar va avtomatlashtirish $200 dan. Aniq smeta hisoblab beraylikmi?",
        telegram: "Biz har qanday murakkablikdagi Telegram-botlar (do‘konlar, to‘lovlar, AI botlar) yaratamiz hamda kanallarga faol auditoriyani jalb qilamiz.",
        smm: "Kompleks SMM o‘z ichiga strategiya, muntazam kontent-reja, Reels, Stories, sifatli vizual va sotuvga yo‘naltirilgan target reklamani oladi.",
        target: "Meta (Instagram/Facebook) platformalarida aniq tahlil va ROAS ko‘rsatkichlari bilan yuqori daromadli target reklamani yo‘lga qo‘yamiz.",
        seo: "Kompleks SEO orqali saytingiz Google va Yandex qidiruv tizimlarida eng yuqori 1-o‘rinlarga chiqadi va doimiy bepul mijozlar oqimini beradi.",
        bot: "TARGET PRO botlari 24/7 rejimda savdo qiladi, Click/Payme orqali to‘lov qabul qiladi, CRM tizimiga ulanadi va sun’iy intellekt orqali maslahat beradi.",
        design: "Biz premium dizayn yaratamiz: korporativ identifikatsiya, logotiplar, brendbuk, zamonaviy UI/UX interfeyslar va animatsiyali stikerlar.",
        brief: "Brifni to‘ldirish atigi 3 daqiqa vaqt oladi va loyihangiz uchun oldindan aniq smeta va texnik arxitekturani tayyorlashga imkon beradi.",
        ai: "Biznesingizga sun’iy intellektni joriy qilamiz: mijozlarga xizmat ko‘rsatuvchi aqlli AI assistentlar, ma’lumotlarni avtomatik tahlil qilish va kontent yaratish.",
      },
    },
    bottomCta: {
      title1: "Biznesingizni kengaytirishga",
      title2: "tayyormisiz?",
      desc: "Bepul maslahat olish uchun so‘rov qoldiring yoki loyiha narxini aniqlash uchun kalkulyatordan foydalaning.",
      btnCalc: "Kalkulyatorni ochish",
      btnBrief: "Brifni to‘ldirish",
    },
    footer: {
      navTitle: "Navigatsiya",
      directionsTitle: "Yo‘nalishlar",
      contactTitle: "Aloqa",
      adminPanel: "Boshqaruv paneli",
      rights: "Barcha huquqlar himoyalangan.",
    },
    scene3d: {
      websiteTitle: "VEB-SAYTLAR VA SERVISLAR",
      websiteDesc: "Korporativ portallar, lendinglar va murakkab tizimlar",
      aiTitle: "SUN’IY INTELLEKT VA AVTOMATLASHTIRISH",
      aiDesc: "Neyrotizimlar, aqlli yordamchilar va biznes jarayonlari",
      smmTitle: "SMM VA IJTIMOIY TARMOQLAR",
      smmDesc: "Strategiya, kreativ, targeting va viral kontent",
      botTitle: "TELEGRAM BOTLAR",
      botDesc: "Avtovoronkalar, CRM integratsiyasi va to‘lov tizimlari",
      seoTitle: "SEO VA TRAFIK",
      seoDesc: "Google va Yandex qidiruvida yetakchilik, barqaror oqim",
      designTitle: "DIZAYN VA BRENDING",
      designDesc: "Aydentika, premium UI/UX va brend identifikatsiyasi",
      videoTitle: "VIDEO VA MEDIA",
      videoDesc: "Prodakshn, reels, 3D animatsiya va promo roliklar",
      marketingTitle: "MARKETING",
      marketingDesc: "To‘liq tahlil, kontekst va natijador strategiyalar",
      ecommerceTitle: "INTERNET DO‘KONLAR",
      ecommerceDesc: "Onlayn to‘lov va buyurtma boshqaruvi bilan e-tijorat",
      itTitle: "IT VA XAVFSIZLIK",
      itDesc: "Server infratuzilmasi, ma’lumotlar himoyasi va DevOps",
      softwareDevTitle: "DASTURIY TA’MINOT ISHLAB CHIQISH",
      softwareDevDesc: "Murakkab tizimlar, CRM, API va yuqori darajadagi arxitektura",
      printingTitle: "POLIGRAFIYA",
      printingDesc: "Premium bosma mahsulotlar, merch va qadoqlash",
      btnDetails: "Batafsil →",
    },
    categoryMap: {
      "development-technology": "DASTURLASH VA TEXNOLOGIYALAR",
      "smm-promotion": "SMM VA PROMOUSHN",
      "social-media": "IJTIMOIY TARMOQLAR",
      "content-platforms": "KONTENT PLATFORMALAR",
      "maps-reputation": "XARITALAR VA OBRO‘",
      "seo-traffic": "SEO VA TRAFIK",
      "app-promotion": "ILOVALARNI RIVOJLANTIRISH",
      "design-creative": "DIZAYN VA KREATIV",
      "animated-stickers": "ANIMATSIYALI STIKERLAR",
      "media-advertising": "MEDIA VA REKLAMA",
      "printing": "POLIGRAFIYA VA CHOP ETISH",
      "it-technical-services": "IT VA TEXNIK XIZMATLAR",
    },
    serviceMap: {
      "website-development": { title: "Saytlar yaratish", desc: "Yuqori konversiyali korporativ veb-saytlar va premium tizimlar ishlab chiqish." },
      "mini-sites": { title: "Mini-saytlar", desc: "Ekspertlar va kichik biznes uchun tezkor bir sahifali tashrif qog‘ozi saytlar." },
      "landing-pages": { title: "Landing Pages (Lendinglar)", desc: "Arizalar sonini maksimal darajada oshirishga qaratilgan sotuvchi sahifalar." },
      "e-commerce": { title: "Internet-do‘konlar", desc: "Katalog, savat va to‘lov tizimlari ulangan kengaytiriladigan onlayn do‘konlar." },
      "telegram-bots": { title: "Telegram botlar", desc: "Buyurtmalar, xabarnomalar va mijozlar xizmati uchun aqlli Telegram botlar." },
      "software-development": { title: "Dasturiy ta’minot ishlab chiqish", desc: "Biznes jarayonlarini avtomatlashtirish uchun maxsus dasturlar va CRM tizimlar." },
      "data-scraping": { title: "Parsing va ma’lumotlar yig‘ish", desc: "Saytlar, ma’lumotlar bazalari va kataloglardan avtomatlashtirilgan ma’lumot yig‘ish." },
      "process-automation": { title: "Jarayonlarni avtomatlashtirish", desc: "Servislarni birlashtirish, arizalarni avto-qayta ishlash va messenjer bildirishnomalari." },
      "api-crm-integrations": { title: "API va CRM integratsiyalari", desc: "AmoCRM, Bitrix24, 1C, telefoniya va tashqi API tizimlarini to‘liq ulash." },
      "ai-development": { title: "AI va Sun’iy intellekt", desc: "GPT-assistentlar, aqlli maslahatchi botlar va ma’lumotlarni tahlil qilish tizimlari." },
      "full-smm-promotion": { title: "Kompleks SMM rivojlantirish", desc: "Strategiya, kontent, vizual, targeting va ijtimoiy tarmoqlardan tizimli sotuvlar." },
      "account-management": { title: "Akkauntlarni yuritish", desc: "Doimiy postlar, Stories, Reels, lenta dizayni va auditoriya bilan muloqot." },
      "content-strategy": { title: "Kontent-strategiya", desc: "Qamrov va sotuvlarni oshirish uchun ma’noli kontent arxitekturasini yaratish." },
      "client-acquisition": { title: "Mijozlarni jalb qilish va masshtablash", desc: "Maqsadli arizalar oqimini yaratish va reklama byudjetini foyda bilan kengaytirish." },
      "instagram-promotion": { title: "Instagram rivojlantirish", desc: "Obunachilar, layklar, Reels va Stories ko‘rishlari, izohlar va organik qamrov." },
      "telegram-channel-promotion": { title: "Telegram kanallarni rivojlantirish", desc: "Kanallarga maqsadli auditoriyani jalb qilish, ko‘rishlar va jonli faollik." },
      "tiktok-promotion": { title: "TikTok rivojlantirish", desc: "Videolarni trend va tavsiyalarga chiqarish, ko‘rishlar va yangi obunachilar." },
      "youtube-promotion": { title: "YouTube rivojlantirish", desc: "Obunachilar, uzun videolar va Shorts ko‘rishlari, monetizatsiya soatlari." },
      "other-social-platforms": { title: "Facebook, VK, X, Twitch rivojlantirish", desc: "Qo‘shimcha ijtimoiy tarmoqlar va striming maydonlarida qamrov va faollik." },
      "yandex-zen-promotion": { title: "Yandex Dzen", desc: "Maqolalar, o‘qishlar soni va nashrlarni tavsiyalar lentasiga chiqarish." },
      "audio-visual-platforms": { title: "Pinterest, SoundCloud, Shazam", desc: "Treklar eshitilishi, Shazamda topilish va Pinterest vizual trafigi." },
      "google-maps-reputation": { title: "Google Xaritalar va Google Business", desc: "Profilni to‘ldirish, sharhlar, reytingni ko‘tarish va xaritada birinchi o‘ringa chiqish." },
      "2gis-yandex-maps": { title: "2GIS va Yandex Xaritalar", desc: "Navigatsiya xizmatlarida profillarni sozlash, reyting va mijozlar qo‘ng‘iroqlarini oshirish." },
      "serm-reputation-management": { title: "Obro‘ni boshqarish (SERM)", desc: "Qidiruv tizimlarida salbiy fikrlarni bartaraf etish va ijobiy brend imidjini qurish." },
      "seo-promotion": { title: "Saytlarni SEO orqali ko‘tarish", desc: "Saytingizni Google va Yandex qidiruv tizimlarida 1-o‘rinlarga olib chiqish." },
      "seo-audit": { title: "SEO audit va optimizatsiya", desc: "Sayt xatolari, yuklanish tezligi va indeksatsiyani chuqur tahlil qilish." },
      "mobile-app-growth": { title: "Mobil ilovalarni ko‘tarish", desc: "Google Play va App Store platformalarida real o‘rnatishlar va to‘p o‘rinlarga chiqish." },
      "logo-branding": { title: "Logotip va brending yaratish", desc: "Premium logotiplar, shriftlar, korporativ ranglar va to‘liq brendbuk." },
      "smm-design": { title: "SMM dizayn va muqovalar", desc: "Profil vizuali, Highlights muqovalari, post shablonlari va animatsiyalar." },
      "menu-design": { title: "Restoran va kafe menyu dizayni", desc: "Chop etiladigan kataloglar va smartfonlar uchun qulay elektron QR-menyu." },
      "telegram-tgs-stickers": { title: "Telegram animatsiyali stikerlar (TGS)", desc: "Brendlar va blogerlar uchun silliq vektorli TGS stiker-to‘plamlari." },
      "whatsapp-webp-stickers": { title: "WhatsApp stikerlari (WEBP)", desc: "Mijozlar bilan tezkor muloqot uchun moslashtirilgan WEBP stikerlari." },
      "video-production": { title: "Videomontaj va reklama roliklari", desc: "Reels montaji, promo-videolar, dinamik effektlar va professional saund-dizayn." },
      "targeted-advertising": { title: "Target reklama", desc: "Meta (Instagram/Facebook) platformalarida kafolatlangan arizalar bilan reklama sozlash." },
      "printing-services": { title: "Poligrafiya va chop etish", desc: "Tashrif qog‘ozlari, bukletlar, bannerlar va brendlangan mahsulotlarni sifatli bosish." },
      "windows-installation-optimization": { title: "Windows o‘rnatish va optimallashtirish", desc: "Windows 10/11 ni toza o‘rnatish, drayverlar, keraksiz fayllarni tozalash va tezlashtirish." },
      "virus-removal-pc-cleaning": { title: "Kompyuterni tozalash va viruslarni yo‘qotish", desc: "Zararli dasturlarni tozalash, termopastani yangilash va changdan tozalash." },
      "network-vpn-remote-access": { title: "Tarmoqlar, VPN va masofaviy yordam", desc: "Routerlarni sozlash, ofis lokal tarmoqlari, xavfsiz VPN va masofaviy IT-ko‘mak." },
    },
  },

  en: {
    nav: {
      home: "Home",
      services: "Services",
      solutions: "Solutions",
      portfolio: "Portfolio",
      ai: "AI & Automation",
      about: "About",
      contact: "Contacts",
      calculator: "Calculator",
      discuss: "Discuss Project",
    },
    hero: {
      tag: "Full-Cycle Digital Platform",
      title1: "TARGET",
      title2: "PRO",
      slogan: "«Technologies That Drive Business Forward.»",
      subtext: "Development • AI • Automation • SMM • Growth • Design • IT",
      btnServices: "OUR SERVICES",
      btnDiscuss: "DISCUSS PROJECT",
      scroll: "Explore Ecosystem",
    },
    strip: {
      perf: "High Performance",
      security: "Security & Reliability",
      turnkey: "Turnkey Delivery",
    },
    services: {
      tag: "Marketplace",
      title: "TARGET PRO Services Catalog",
      all12: "All 12 Categories",
      searchPlaceholder: "What do you need? (e.g., website, telegram, bot, seo, design)...",
      found: "Services found:",
      allServices: "All Services",
      categories: "Categories",
      notFound: "No services found matching your criteria.",
      notFoundDesc: "Try adjusting your search terms or select another category.",
      viewDetails: "Details",
      addToProject: "Add to Project",
      priceCustom: "Custom",
      priceFrom: "From",
    },
    serviceDetail: {
      orderService: "ORDER SERVICE",
      consultation: "Telegram Consultation",
      included: "What is included",
      workflow: "Project Workflow",
      faq: "Frequently Asked Questions",
      needCalculation: "Need an exact estimate for this service",
      leaveRequest: "SEND REQUEST",
      step: "STEP",
    },
    solutions: {
      tag: "Ecosystem",
      title: "Turnkey Solutions",
      desc: "Curated packages of digital technologies structured for specific business growth milestones.",
      package: "Package Solution",
      includedServices: "Included in solution:",
      advantages: "Key advantages:",
      details: "Learn More",
      order: "Order Solution",
    },
    portfolio: {
      tag: "Showcase",
      title: "Featured Works",
      desc: "Production web portals, Telegram bots, AI integrations, and high-impact marketing cases.",
      allWorks: "View All Projects",
      client: "Client:",
      explore: "EXPLORE CASE",
      challenge: "Challenge",
      solution: "Solution",
      result: "Results",
      techUsed: "Technologies used:",
      discussSimilar: "DISCUSS SIMILAR PROJECT",
    },
    aiPage: {
      tag: "Next-Gen AI Integration",
      title: "AI WORKING",
      highlight: "FOR YOU",
      desc: "Deploy proprietary LLMs, autonomous agentic workflows, smart Telegram bots, and end-to-end automations.",
      gptTitle: "Intelligent GPT Assistants",
      gptDesc: "Custom-trained chatbots operating 24/7 on your company knowledge base, qualifying leads and syncing directly to CRM.",
      automationTitle: "Process Automation",
      automationDesc: "Connecting websites, messengers, accounting software, and spreadsheets into unified automated pipelines.",
      scrapingTitle: "Web Scraping & Data Extraction",
      scrapingDesc: "Automated aggregation of lead databases, competitor pricing intelligence, and structured data extraction.",
      archTitle: "AI Implementation Architecture",
      step1: "01. KNOWLEDGE INGESTION",
      step1Desc: "Digitizing pricing, protocols, and standard operating procedures.",
      step2: "02. MODEL FINE-TUNING",
      step2Desc: "Configuring system prompts, guardrails, and contextual vector storage.",
      step3: "03. INTEGRATION",
      step3Desc: "Connecting directly to Telegram bots, websites, VOIP, and CRM.",
      step4: "04. CONTINUOUS MONITORING",
      step4Desc: "Auditing response accuracy, conversation telemetry, and ongoing refinement.",
      btnIntegrate: "INTEGRATE AI INTO MY BUSINESS",
    },
    aboutPage: {
      tag: "Company Profile",
      title: "ABOUT TARGET",
      desc: "We unite high-end software engineering, artificial intelligence, and performance marketing to scale enterprises globally.",
      ownerBadge: "Founder & CEO",
      btnPersonalTg: "Direct Contact via Telegram",
      valuesResult: "Focus on Results",
      valuesResultDesc: "We never design merely for aesthetics. Every system and campaign is engineered to scale conversions and revenue.",
      valuesSpeed: "Speed & Modern Stack",
      valuesSpeedDesc: "Leveraging modern frameworks and AI acceleration to deliver robust systems in record time.",
      valuesSecurity: "24/7 Reliability",
      valuesSecurityDesc: "Strict database security, automated disaster recovery backups, and long-term technical partnership.",
    },
    calculator: {
      tag: "Configurator",
      title: "Project Configurator",
      desc: "Configure your custom service bundle in 7 straightforward steps with immediate transparent estimation.",
      step: "STEP",
      of: "of",
      step7Final: "Step 7 of 7 • Summary",
      projectFormed: "PROJECT ESTIMATE GENERATED",
      projectFormedDesc: "Review your configuration and leave contact info to receive our verified proposal.",
      btnNext: "Next",
      btnBack: "Back",
      btnSubmit: "SUBMIT INQUIRY",
      btnSubmitting: "SENDING...",
      btnRecalculate: "Configure Another Project",
      summaryDirection: "Industry:",
      summaryGoal: "Primary Goal:",
      summaryServices: "Selected Services:",
      summaryTimeline: "Target Timeline:",
      summaryBudget: "Budget Range:",
      summaryEstimate: "Estimated Starting Cost:",
      nameLabel: "Your Name *",
      phoneLabel: "Phone Number *",
      tgLabel: "Telegram Username",
      companyLabel: "Company / Brand",
      successTitle: "PROJECT CONFIGURED",
      successDesc: "Your request has been successfully recorded in TARGET PRO system. Our team will reach out promptly.",
      step1Title: "What is your industry?",
      step1Sub: "Select your business domain",
      step2Title: "What is your primary milestone?",
      step2Sub: "Key objective for partnering with TARGET PRO",
      step3Title: "Select required services",
      step3Sub: "Multiple options allowed",
      step4Title: "Which platforms will you utilize?",
      step4Sub: "Customer acquisition channels",
      step5Title: "Desired Delivery Timeline",
      step5Sub: "When should the project launch?",
      step6Title: "Estimated Budget",
      step6Sub: "Planned capital expenditure",
    },
    brief: {
      tag: "Project Brief",
      title: "Technical Specification",
      desc: "Submit your project requirements online for an in-depth scope analysis and exact budget estimation.",
      nameLabel: "Contact Person *",
      phoneLabel: "Phone Number *",
      companyLabel: "Company / Organization",
      tgLabel: "Telegram",
      emailLabel: "Email Address",
      webLabel: "Existing Website / Socials",
      businessTypeLabel: "Industry Domain",
      goalLabel: "Main Project Objective",
      budgetLabel: "Allocated Budget",
      timelineLabel: "Target Launch Date",
      descLabel: "Detailed Scope Description *",
      fileLabel: "Attach Specification Document (PDF, DOCX, ZIP, PNG up to 50MB)",
      uploadHint: "Click to choose file for upload",
      btnSubmit: "SUBMIT SPECIFICATION",
      btnSubmitting: "SAVING...",
      successTitle: "BRIEF RECEIVED",
      successDesc: "Your brief has been logged into the TARGET PRO database. We are evaluating requirements.",
      btnAnother: "Submit Another Brief",
    },
    contact: {
      tag: "Get In Touch",
      title: "Contact TARGET PRO",
      desc: "Reach out via any preferred channel to discuss challenges, schedule an audit, or launch your project.",
      directTitle: "Direct Channels & Coordinates",
      phoneLabel: "Phone",
      tgLabel: "Telegram",
      emailLabel: "Email",
      locationLabel: "Location & Hours",
      socialTitle: "Connect on Social Media",
      mapTitle: "Interactive Route & Map",
      btnRoute: "NAVIGATE TO LOCATION",
    },
    workflow: {
      tag: "Workflow",
      title: "OUR WORKFLOW",
      step1Title: "Analysis",
      step1Desc: "Deep exploration of goals and market",
      step2Title: "Strategy",
      step2Desc: "Step-by-step blueprint and architecture",
      step3Title: "Development",
      step3Desc: "Clean code and high-end visual design",
      step4Title: "Launch",
      step4Desc: "Secure deployment and rollout",
      step5Title: "Optimization",
      step5Desc: "Conversion analytics and tuning",
      step6Title: "Scaling",
      step6Desc: "Continuous growth in leads and revenue",
    },
    faq: {
      tag: "FAQ",
      title: "FREQUENTLY ASKED QUESTIONS",
      items: [
        {
          question: "HOW DOES COOPERATION WITH TARGET PRO START?",
          answer: "It starts with an in-depth analysis of your objectives. You can fill out the brief form, contact us on Telegram @Mr_Zarrux, or call +998932368910. We will formulate a transparent commercial proposal with precise phases and deliverables.",
        },
        {
          question: "DO YOU WORK UNDER AN OFFICIAL CONTRACT?",
          answer: "Yes, we operate strictly under official contracts with clearly defined scopes of work, milestones, phased payments, and legal warranties.",
        },
        {
          question: "HOW IS THE SERVICE COST CALCULATED?",
          answer: "Depending on the scale of the task: standard solutions follow transparent fixed pricing, whereas complex customized architectures receive an individual estimate following thorough technical audit.",
        },
        {
          question: "DO YOU PROVIDE SUPPORT AFTER PROJECT DELIVERY?",
          answer: "Absolutely. We maintain ongoing SLA commitments: infrastructure uptime monitoring, database backups, advisory consultations, and continuous functional scaling.",
        },
      ],
    },
    operatorWidget: {
      online: "Online",
      responseSpeed: "We will reply shortly",
      helloTitle: "Hello! 👋",
      helloDesc: "How can we help?",
      serviceSelected: "Excellent choice! 👋\nIf you'd like, I can help match the best solution for your task.",
      askQuestion: "Ask a question",
      writeTelegram: "Write on Telegram",
      callPhone: "Call: +998932368910",
      writeEmail: "Email us",
      fillBrief: "FILL OUT THE BRIEF",
      tooltip: "Online • Need help choosing?",
      chatTitle: "TARGET PRO Consultant",
      inputPlaceholder: "Enter your question...",
      sendBtn: "SEND",
      backBtn: "Back",
      newQuestionBtn: "← New question",
      yesLeaveLead: "YES, LEAVE REQUEST",
      askAnotherQuestion: "ASK ANOTHER QUESTION",
      leaveLeadBtn: "LEAVE REQUEST",
      unknownAnswer: "Thank you for your question! To provide an exact calculation and technical roadmap, please leave your contact details, and our specialist will reach out within 10 minutes.",
      leadFormTitle: "Submit Request",
      nameLabel: "Your Name *",
      namePlaceholder: "What is your name?",
      phoneLabel: "Phone Number *",
      phonePlaceholder: "+998 90 123 45 67",
      emailLabel: "Email",
      emailPlaceholder: "example@domain.com",
      companyLabel: "Company / Project",
      companyPlaceholder: "Company name (optional)",
      serviceLabel: "Interested Service",
      selectServicePlaceholder: "Select a service",
      questionLabel: "Your Question / Task *",
      questionPlaceholder: "Describe your project or task...",
      submitLeadBtn: "SUBMIT REQUEST",
      submittingLeadBtn: "SUBMITTING...",
      successTitle: "Request Submitted! ✅",
      successDesc: "Thank you! Our lead technical specialist will contact you within 10 minutes to discuss your project.",
      closeBtn: "CLOSE",
      errName: "Name must be at least 2 characters",
      errPhone: "Enter a valid phone number",
      errEmail: "Enter a valid email address",
      errQuestion: "Please describe your question in more detail (min 5 chars)",
      errService: "Please select an interested service",
      errSendFailed: "Submission failed. Please try again or reach out on Telegram.",
      serviceOptions: {
        website: "Website Development",
        landing: "Landing Page",
        ecommerce: "Online Store (E-Commerce)",
        smm: "SMM Promotion",
        target: "Targeted Advertising",
        seo: "SEO Promotion",
        telegram: "Telegram Channel Growth",
        botDev: "Bot Development",
        design: "Design & Branding",
        branding: "Logo & Brand Identity",
        aiAuto: "AI & Automation",
        other: "Other Direction",
      },
      faqAnswers: {
        website: "We engineer high-performance web platforms and corporate portals on Next.js with bespoke UI, CRM integrations, and top-tier speed.",
        landing: "Landing Pages are crafted in 5–10 days with high-converting copy, interactive 3D visual accents, and automated lead capture.",
        price: "Cost is calibrated based on project scope: landing pages from $300, custom web portals from $700, bot systems from $200. Shall we prepare a detailed estimate?",
        telegram: "We develop advanced Telegram bots (shops, automated funnels, payment systems, AI bots) and drive real targeted subscriber growth.",
        smm: "Our turnkey SMM includes market strategy, calendar content, Reels production, Stories, aesthetic visuals, and paid ad funnels.",
        target: "We launch targeted advertising on Meta (Instagram/Facebook) with strict ROAS metrics and ongoing funnel optimization.",
        seo: "Comprehensive SEO brings your website to Top-1 rankings in Google and Yandex for competitive commercial queries.",
        bot: "TARGET PRO bots run 24/7 sales, accept online payments (Click, Payme, Stripe), synchronize with CRMs, and consult via AI.",
        design: "We design premium corporate identities: brand guidelines, modern logos, full UI/UX systems, and vector sticker packs.",
        brief: "Filling out the brief takes only 3 minutes and helps us deliver an exact technical scope and commercial roadmap for your business.",
        ai: "We implement artificial intelligence: autonomous AI support agents, workflow automation, and custom predictive models.",
      },
    },
    bottomCta: {
      title1: "Ready to Scale",
      title2: "Your Business?",
      desc: "Request a complimentary architecture audit or use our interactive calculator for an immediate estimate.",
      btnCalc: "Open Configurator",
      btnBrief: "Fill Out Brief",
    },
    footer: {
      navTitle: "Navigation",
      directionsTitle: "Capabilities",
      contactTitle: "Direct Contact",
      adminPanel: "Admin Panel",
      rights: "All rights reserved.",
    },
    scene3d: {
      websiteTitle: "WEBSITES & PLATFORMS",
      websiteDesc: "High-performance web apps, corporate portals & landing pages",
      aiTitle: "AI & AUTOMATION",
      aiDesc: "Neural networks, intelligent agents and automated pipelines",
      smmTitle: "SMM & SOCIAL MEDIA",
      smmDesc: "Growth strategy, viral storytelling and targeting",
      botTitle: "TELEGRAM BOTS",
      botDesc: "Automated funnels, CRM sync and custom bot integrations",
      seoTitle: "SEO & TRAFFIC",
      seoDesc: "Top Google rankings and high-intent inbound organic search",
      designTitle: "DESIGN & BRANDING",
      designDesc: "Distinctive identity, elite UI/UX design systems and brand books",
      videoTitle: "VIDEO & MEDIA",
      videoDesc: "Commercial video production, 3D CGI and motion graphics",
      marketingTitle: "PERFORMANCE MARKETING",
      marketingDesc: "End-to-end attribution, PPC ads and revenue growth strategy",
      ecommerceTitle: "E-COMMERCE",
      ecommerceDesc: "Online shopping platforms with high conversion checkout",
      itTitle: "IT & CYBERSECURITY",
      itDesc: "Resilient cloud infrastructure, data protection & DevOps",
      softwareDevTitle: "SOFTWARE DEVELOPMENT",
      softwareDevDesc: "Custom web applications, enterprise CRM, APIs & high-load backends",
      printingTitle: "PRINTING & PACKAGING",
      printingDesc: "Premium printing, corporate merchandise and packaging",
      btnDetails: "Explore →",
    },
    categoryMap: {
      "development-technology": "DEVELOPMENT & TECHNOLOGY",
      "smm-promotion": "SMM & PROMOTION",
      "social-media": "SOCIAL MEDIA",
      "content-platforms": "CONTENT PLATFORMS",
      "maps-reputation": "MAPS & REPUTATION",
      "seo-traffic": "SEO & TRAFFIC",
      "app-promotion": "APP PROMOTION",
      "design-creative": "DESIGN & CREATIVE",
      "animated-stickers": "ANIMATED STICKERS",
      "media-advertising": "MEDIA & ADVERTISING",
      "printing": "PRINTING & PACKAGING",
      "it-technical-services": "IT & TECHNICAL SERVICES",
    },
    serviceMap: {
      "website-development": { title: "Website Development", desc: "High-converting corporate websites and premium web applications." },
      "mini-sites": { title: "Mini Websites", desc: "Fast single-page business cards for experts and small businesses." },
      "landing-pages": { title: "Landing Pages", desc: "High-converting landing pages built to maximize leads and sales." },
      "e-commerce": { title: "E-Commerce Stores", desc: "Scalable online stores with product catalog, cart, and payment integrations." },
      "telegram-bots": { title: "Telegram Bots", desc: "Smart Telegram bots for sales funnels, customer support, and orders." },
      "software-development": { title: "Custom Software Development", desc: "Bespoke software, internal business dashboards, and CRM systems." },
      "data-scraping": { title: "Web Scraping & Data Extraction", desc: "Automated extraction of products, directories, and business datasets." },
      "process-automation": { title: "Process Automation", desc: "Workflow integration, automated lead processing, and instant CRM notifications." },
      "api-crm-integrations": { title: "API & CRM Integrations", desc: "Full data sync between your website, CRM, telephony, and external APIs." },
      "ai-development": { title: "AI Development & Agents", desc: "Custom GPT agents, intelligent customer support, and data analytics." },
      "full-smm-promotion": { title: "Full-Cycle SMM Promotion", desc: "Strategy, content, visual design, targeted advertising, and sales growth." },
      "account-management": { title: "Social Media Management", desc: "Regular posting, Stories, Reels, feed curation, and audience engagement." },
      "content-strategy": { title: "Content Strategy", desc: "Brand narrative architecture designed to expand reach and conversions." },
      "client-acquisition": { title: "Customer Acquisition & Scaling", desc: "Generating targeted leads and scaling ad budgets with measurable ROI." },
      "instagram-promotion": { title: "Instagram Growth", desc: "Followers, likes, Reels and Stories reach, comments, and engagement boost." },
      "telegram-channel-promotion": { title: "Telegram Channel Growth", desc: "Targeted channel subscribers, post views, reactions, and active retention." },
      "tiktok-promotion": { title: "TikTok Promotion", desc: "Views, likes, followers, and propelling videos into TikTok recommendation feeds." },
      "youtube-promotion": { title: "YouTube Growth", desc: "Subscribers, video and Shorts views, and 4000 watch hours for monetization." },
      "other-social-platforms": { title: "Facebook, VK, X, Twitch Growth", desc: "Expanded reach and engagement across international social networks." },
      "yandex-zen-promotion": { title: "Yandex Zen Content Growth", desc: "Articles, reads, channel subscribers, and algorithm recommendation feeds." },
      "audio-visual-platforms": { title: "Pinterest, SoundCloud, Shazam", desc: "Track plays, Shazam recognitions, pins, and visual search traffic." },
      "google-maps-reputation": { title: "Google Maps & Google Business", desc: "Business profile optimization, reviews, rating boost, and top map rankings." },
      "2gis-yandex-maps": { title: "2GIS & Yandex Maps", desc: "Local profile ranking, rating management, and foot traffic increase." },
      "serm-reputation-management": { title: "Reputation Management (SERM)", desc: "Eliminating negative results from search engines and building brand trust." },
      "seo-promotion": { title: "SEO Website Promotion", desc: "Propelling websites to rank #1 on Google and Yandex for commercial queries." },
      "seo-audit": { title: "SEO Audit & Optimization", desc: "In-depth audit of technical errors, loading speeds, and indexation." },
      "mobile-app-growth": { title: "Mobile App Promotion", desc: "Real downloads, category ranking boosts, and ASO on Google Play and App Store." },
      "logo-branding": { title: "Logo Design & Brand Identity", desc: "Premium logos, typography, color palettes, and comprehensive brand books." },
      "smm-design": { title: "SMM Design & Covers", desc: "Profile styling, Highlights covers, post templates, and motion banners." },
      "menu-design": { title: "Restaurant & Cafe Menu Design", desc: "Appetizing print catalogs and seamless responsive QR digital menus." },
      "telegram-tgs-stickers": { title: "Telegram Animated Stickers (TGS)", desc: "Smooth 60fps vector sticker packs for brands and creators in TGS format." },
      "whatsapp-webp-stickers": { title: "WhatsApp Stickers (WEBP)", desc: "Custom stickers and animations optimized for sales and customer communication." },
      "video-production": { title: "Video Production & Ads", desc: "Reels editing, commercial promos, dynamic motion graphics, and color grading." },
      "targeted-advertising": { title: "Targeted Advertising", desc: "Precision Meta (Instagram/Facebook) campaigns with clear ROI attribution." },
      "printing-services": { title: "Printing & Corporate Merch", desc: "High-definition print for business cards, flyers, banners, and packaging." },
      "windows-installation-optimization": { title: "Windows Setup & Optimization", desc: "Clean Windows 10/11 install, complete drivers, debloat, and speed tuning." },
      "virus-removal-pc-cleaning": { title: "PC Cleaning & Virus Removal", desc: "Hardware maintenance, thermal paste replacement, and deep malware removal." },
      "network-vpn-remote-access": { title: "Networking, VPN & Remote IT", desc: "Router setup, secure office LAN/VPN tunnels, and remote IT assistance." },
    },
  },
};
