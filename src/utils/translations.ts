import { Language, OrderStatus, UnitType, DeliveryVehicle, PaymentMethod } from '../types';

export const translations = {
  uz: {
    siteName: 'BUILT',
    tagline: "O'zbekistonning eng yirik qurilish mollari bozori",
    searchPlaceholder: "Sement, armatura, g'isht, taxta, bo'yoq qidirish...",
    allCategories: 'Barcha toifalar',
    catalog: 'Katalog',
    favorites: 'Sevimlilar',
    cart: 'Savatcha',
    profile: 'Profil',
    login: 'Kirish',
    logout: 'Chiqish',
    register: "Ro'yxatdan o'tish",
    region: 'Hudud',
    selectRegion: 'Hududni tanlang',
    allRegions: "Barcha viloyatlar (Butun O'zbekiston)",
    allRegionsShort: 'Barcha viloyatlar',
    allRegionsDelivery: "Butun O'zbekiston bo'ylab (14 ta viloyat)",
    hotline: 'Qaynoq liniya',
    wholesale: 'Ulgurji savdo (B2B)',
    forSellers: 'Sotuvchilar uchun',
    sellerCabinet: 'Sotuvchi kabineti',
    adminPanel: 'Admin panel',
    customerRole: 'Xaridor',
    sellerRole: 'Sotuvchi',
    adminRole: 'Administrator',
    roleSwitch: 'Rolni almashtirish',
    
    // Hero
    heroTitle: "Barcha Qurilish Mollari – To'g'ridan-To'g'ri Ishlab Chiqaruvchilardan",
    heroSubtitle: "Sement, metall prokati, g'isht, yog'och va 10 000+ turdagi materiallar. Bir joyda narxlarni taqqoslang, diler narxida xarid qiling va ob'ektgacha yetkazib berishga buyurtma bering.",
    heroCtaCatalog: "Katalogga o'tish",
    heroCtaWholesale: 'Ulgurji narxlar',
    heroStats: {
      products: '25 000+',
      productsLabel: 'Mahsulotlar',
      sellers: '350+',
      sellersLabel: 'Rasmiy dilerlar',
      regions: '14 ta',
      regionsLabel: "Viloyat bo'ylab yetkazish",
      delivery: '24 soat',
      deliveryLabel: 'Tezkor yuk tashish'
    },

    // Categories
    popularCategories: 'Ommabop toifalar',
    viewAllCategories: 'Barcha toifalarni ko‘rish',

    // Product lists
    popularProducts: 'Ommabop mahsulotlar',
    bestSellers: 'Eng ko‘p sotilganlar',
    discountedProducts: 'Chegirmadagi mahsulotlar',
    verifiedSellers: 'Tasdiqlangan sotuvchilar va zavodlar',
    viewAll: 'Hammasini ko‘rish',

    // Product card
    addToCart: 'Savatga',
    inCart: 'Savatda',
    buyNow: 'Hoziroq xarid',
    minOrderQty: 'Min. buyurtma',
    inStock: 'Omborda bor',
    outOfStock: 'Tugagan',
    wholesaleAvailable: 'Ulgurji chegirma bor',
    seller: 'Sotuvchi',

    // Details
    specifications: 'Texnik xususiyatlari',
    description: 'Mahsulot tavsifi',
    deliveryOptions: 'Yetkazib berish va olib ketish',
    sellerInfo: 'Sotuvchi haqida',
    reviews: 'Mijozlar sharhlari',
    alternativeSellers: 'Boshqa sotuvchilar narxlari',
    selectQuantity: 'Miqdorni tanlang',
    totalPrice: 'Jami narx',
    economy: 'Tejov',
    writeReview: 'Fikr bildirish',

    // Filters
    filterTitle: 'Filtrlar',
    clearFilters: 'Tozalash',
    priceRange: 'Narx oralig‘i (so‘m)',
    from: 'dan',
    to: 'gacha',
    brands: 'Brendlar',
    categories: 'Toifalar',
    locations: 'Ombor hududi',
    onlyInStock: 'Faqat omborda borlar',
    onlyWholesale: 'Faqat ulgurji narxlilar',
    sortBy: 'Saralash',
    sortPopular: 'Ommabopligi bo‘yicha',
    sortPriceAsc: 'Narx: arzondan qimmatga',
    sortPriceDesc: 'Narx: qimmatdan arzonga',
    sortNew: 'Eng yangilar',
    sortRating: 'Yuqori reyting',

    // Cart & Checkout
    cartTitle: 'Savatcha',
    emptyCart: 'Savatchangiz bo‘sh',
    emptyCartText: 'Qurilish mollari katalogidan kerakli materiallarni tanlang',
    sellerSubtotal: 'Sotuvchi bo‘yicha:',
    checkout: 'Buyurtmani rasmiylashtirish',
    deliveryMethod: 'Yetkazib berish usuli',
    courierDelivery: "Ob'ektgacha yetkazib berish (Yuk mashinasida)",
    pickupFromWarehouse: 'Ombordan o‘zi olib ketish',
    deliveryVehicle: 'Yuk mashinasi turini tanlang',
    deliveryVehicleHint: 'Material og‘irligi va hajmiga mos transport',
    addressInfo: 'Yetkazib berish manzili',
    selectDistrict: 'Tumanni tanlang',
    streetAddress: 'Ko‘cha, uy raqami, bino',
    landmark: "Mo'ljal (masalan: 14-maktab yonida)",
    contactInfo: 'Qabul qiluvchi ma’lumotlari',
    fullName: 'Ism va familiya',
    phone: 'Telefon raqam',
    orderNote: 'Haydovchi va ombor uchun qo‘shimcha izoh',
    paymentMethod: 'To‘lov usuli',
    payCash: 'Naqd pul (Yukni qabul qilganda)',
    payClick: 'Click orqali to‘lov',
    payPayme: 'Payme orqali to‘lov',
    payUzum: 'Uzum Bank orqali to‘lov',
    payB2B: 'Yuridik shaxs shartnomasi (Hisob-faktura / O‘zbekiston banklari)',
    orderSummary: 'Buyurtma hisobi',
    itemsTotal: 'Mahsulotlar summasi',
    deliveryFee: 'Yetkazib berish narxi',
    discounts: 'Chegirma',
    grandTotal: 'Jami to‘lov',
    confirmOrder: 'Buyurtmani tasdiqlash',
    orderSuccess: 'Buyurtmangiz qabul qilindi!',
    orderSuccessDesc: 'Tez orada sotuvchi yoki logistika bo‘limi siz bilan bog‘lanadi.',
    trackOrder: 'Buyurtmani kuzatish',
    orderCode: 'Buyurtma kodi',

    // Order status
    statusPending: 'Kutilmoqda',
    statusConfirmed: 'Tasdiqlandi',
    statusPreparing: 'Tayyorlanmoqda',
    statusDispatched: 'Yo‘lda / Yuklandi',
    statusDelivered: 'Yetkazildi',
    statusCancelled: 'Bekor qilindi',

    // Seller Dashboard
    sellerPortalTitle: 'Sotuvchi Boshqaruv Paneli',
    sellerPortalSubtitle: 'Tovarlar qoldig‘i, yangi buyurtmalar va savdo tahlili',
    addProduct: 'Yangi tovar qo‘shish',
    myProducts: 'Mening tovarlarim',
    incomingOrders: 'Kelib tushgan buyurtmalar',
    storeSettings: 'Do‘kon sozlamalari',
    totalRevenue: 'Jami savdo',
    activeListings: 'Faol tovarlar',
    newOrdersCount: 'Yangi buyurtmalar',
    storeRating: 'Do‘kon reytingi',
    stockStatus: 'Qoldiq holati',
    editPrice: 'Narxni o‘zgartirish',
    editStock: 'Qoldiqni yangilash',
    productName: 'Tovar nomi',
    category: 'Toifasi',
    price: 'Narxi',
    stock: 'Qoldiq',
    unit: 'Birlik',
    actions: 'Amallar',
    saveChanges: 'Saqlash',
    cancel: 'Bekor qilish',
    deleteProduct: 'O‘chirish',

    // Admin Dashboard
    adminPortalTitle: 'Marketplace Administrator Paneli',
    adminPortalSubtitle: 'Platforma statistikasi, sotuvchilar verifikatsiyasi va tovarlar moderatsiyasi',
    platformGMV: 'Jami platforma aylanmasi',
    commissionRevenue: 'Platforma komissiyasi daromadi',
    totalSellers: 'Sotuvchilar soni',
    totalCustomers: 'Ro‘yxatdan o‘tgan xaridorlar',
    pendingSellers: 'Verifikatsiya kutayotgan dilerlar',
    approve: 'Tasdiqlash',
    reject: 'Rad etish',
    commissionRate: 'Marketplace komissiya stavkasi',
    verifiedBadge: 'Tasdiqlangan',
    pendingBadge: 'Kutilmoqda',

    // Mobile simulator
    mobileAppCompanion: 'Mobil ilova (iOS & Android)',
    mobileAppDesc: 'React Native va Expo asosidagi smartfon ilovasi',

    // Advantages
    advantages: {
      title: 'Nega BUILT platformasi?',
      subtitle: 'O‘zbekiston qurilish industriyasi uchun qulay va xavfsiz ekotizim',
      adv1Title: 'To‘g‘ridan-to‘g‘ri zavod narxi',
      adv1Desc: 'Vositachilarsiz dilerlar va zavodlar narxlarida xarid qiling.',
      adv2Title: 'Kafolatlangan yuk tashish',
      adv2Desc: 'Labo, Gazel, Isuzu va Furalar orqali istalgan manzilga yetkazamiz.',
      adv3Title: 'Shartnoma va hisob-faktura',
      adv3Desc: 'Yuridik shaxslar va qurilish kompaniyalari uchun QQS bilan rasmiy hujjatlar.',
      adv4Title: 'Haqiqiy sifat sertifikatlari',
      adv4Desc: 'Barcha materiallar O‘zbekiston GOST va sifat standartlariga javob beradi.'
    },

    // Vehicle labels
    vehicles: {
      labo: 'Damas / Labo (1 tonnagacha / 2 m³)',
      gazel: 'Gazel (2 tonnagacha / 10 m³)',
      isuzu: 'Isuzu yuk mashinasi (5 tonnagacha / 20 m³)',
      fura: 'Kamaz / Fura (20 tonnagacha / 45 m³)'
    }
  },

  ru: {
    siteName: 'BUILT',
    tagline: 'Крупнейший строительный маркетплейс Узбекистана',
    searchPlaceholder: 'Поиск цемента, арматуры, кирпича, пиломатериалов, красок...',
    allCategories: 'Все категории',
    catalog: 'Каталог',
    favorites: 'Избранное',
    cart: 'Корзина',
    profile: 'Профиль',
    login: 'Войти',
    logout: 'Выйти',
    register: 'Регистрация',
    region: 'Регион',
    selectRegion: 'Выберите регион',
    allRegions: 'Все регионы (Весь Узбекистан)',
    allRegionsShort: 'Все регионы',
    allRegionsDelivery: 'По всему Узбекистану (14 регионов)',
    hotline: 'Горячая линия',
    wholesale: 'Оптовые закупки (B2B)',
    forSellers: 'Для продавцов',
    sellerCabinet: 'Кабинет продавца',
    adminPanel: 'Панель администратора',
    customerRole: 'Покупатель',
    sellerRole: 'Продавец',
    adminRole: 'Администратор',
    roleSwitch: 'Сменить роль',
    
    heroTitle: 'Строительные Материалы Напрямую от Заводов и Дилеров',
    heroSubtitle: 'Цемент, металлопрокат, кирпич, пиломатериалы и более 10 000 наименований. Сравнивайте цены, покупайте по оптовым тарифам и заказывайте доставку на объект.',
    heroCtaCatalog: 'Перейти в каталог',
    heroCtaWholesale: 'Оптовые цены',
    heroStats: {
      products: '25 000+',
      productsLabel: 'Товаров в каталоге',
      sellers: '350+',
      sellersLabel: 'Официальных дилеров',
      regions: '14',
      regionsLabel: 'Регионов доставки',
      delivery: '24 часа',
      deliveryLabel: 'Быстрая логистика'
    },

    popularCategories: 'Популярные категории',
    viewAllCategories: 'Смотреть все категории',
    popularProducts: 'Популярные товары',
    bestSellers: 'Хиты продаж',
    discountedProducts: 'Товары со скидкой',
    verifiedSellers: 'Проверенные поставщики и заводы',
    viewAll: 'Смотреть все',

    addToCart: 'В корзину',
    inCart: 'В корзине',
    buyNow: 'Купить сейчас',
    minOrderQty: 'Мин. заказ',
    inStock: 'В наличии',
    outOfStock: 'Нет в наличии',
    wholesaleAvailable: 'Есть оптовая скидка',
    seller: 'Продавец',

    specifications: 'Характеристики',
    description: 'Описание товара',
    deliveryOptions: 'Доставка и самовывоз',
    sellerInfo: 'Информация о продавце',
    reviews: 'Отзывы клиентов',
    alternativeSellers: 'Цены других поставщиков',
    selectQuantity: 'Выберите количество',
    totalPrice: 'Итоговая стоимость',
    economy: 'Экономия',
    writeReview: 'Оставить отзыв',

    filterTitle: 'Фильтры',
    clearFilters: 'Сбросить',
    priceRange: 'Диапазон цен (сум)',
    from: 'от',
    to: 'до',
    brands: 'Бренды',
    categories: 'Категории',
    locations: 'Регион склада',
    onlyInStock: 'Только в наличии',
    onlyWholesale: 'Только с оптовыми ценами',
    sortBy: 'Сортировка',
    sortPopular: 'По популярности',
    sortPriceAsc: 'Сначала дешевые',
    sortPriceDesc: 'Сначала дорогие',
    sortNew: 'Новинки',
    sortRating: 'Высокий рейтинг',

    cartTitle: 'Корзина',
    emptyCart: 'Ваша корзина пуста',
    emptyCartText: 'Выберите необходимые строительные материалы из каталога',
    sellerSubtotal: 'По поставщику:',
    checkout: 'Оформить заказ',
    deliveryMethod: 'Способ доставки',
    courierDelivery: 'Доставка на объект (Грузовой транспорт)',
    pickupFromWarehouse: 'Самовывоз со склада',
    deliveryVehicle: 'Выберите тип транспорта',
    deliveryVehicleHint: 'Транспорт под вес и габариты материалов',
    addressInfo: 'Адрес доставки',
    selectDistrict: 'Выберите район',
    streetAddress: 'Улица, дом, строение',
    landmark: 'Ориентир (например: рядом со школой №14)',
    contactInfo: 'Данные получателя',
    fullName: 'Имя и фамилия',
    phone: 'Номер телефона',
    orderNote: 'Примечание для водителя и склада',
    paymentMethod: 'Способ оплаты',
    payCash: 'Наличными (при получении груза)',
    payClick: 'Оплата через Click',
    payPayme: 'Оплата через Payme',
    payUzum: 'Оплата через Uzum Bank',
    payB2B: 'Договор для юр. лиц (Счет-фактура с НДС)',
    orderSummary: 'Детали заказа',
    itemsTotal: 'Сумма товаров',
    deliveryFee: 'Стоимость доставки',
    discounts: 'Скидка',
    grandTotal: 'Итого к оплате',
    confirmOrder: 'Подтвердить заказ',
    orderSuccess: 'Ваш заказ успешно оформлен!',
    orderSuccessDesc: 'В ближайшее время поставщик свяжется с вами для подтверждения.',
    trackOrder: 'Отследить заказ',
    orderCode: 'Номер заказа',

    statusPending: 'Ожидает',
    statusConfirmed: 'Подтвержден',
    statusPreparing: 'Собирается',
    statusDispatched: 'В пути / Отгружен',
    statusDelivered: 'Доставлен',
    statusCancelled: 'Отменен',

    sellerPortalTitle: 'Кабинет Продавца',
    sellerPortalSubtitle: 'Управление остатками, новые заказы и аналитика продаж',
    addProduct: 'Добавить товар',
    myProducts: 'Мои товары',
    incomingOrders: 'Входящие заказы',
    storeSettings: 'Настройки магазина',
    totalRevenue: 'Общая выручка',
    activeListings: 'Активных товаров',
    newOrdersCount: 'Новых заказов',
    storeRating: 'Рейтинг магазина',
    stockStatus: 'Остатки',
    editPrice: 'Изменить цену',
    editStock: 'Обновить остаток',
    productName: 'Название товара',
    category: 'Категория',
    price: 'Цена',
    stock: 'Остаток',
    unit: 'Ед.',
    actions: 'Действия',
    saveChanges: 'Сохранить',
    cancel: 'Отмена',
    deleteProduct: 'Удалить',

    adminPortalTitle: 'Панель Администратора',
    adminPortalSubtitle: 'Статистика платформы, верификация продавцов и модерация товаров',
    platformGMV: 'Общий оборот платформы',
    commissionRevenue: 'Доход от комиссии платформы',
    totalSellers: 'Количество продавцов',
    totalCustomers: 'Зарегистрированных покупателей',
    pendingSellers: 'Заявки на верификацию',
    approve: 'Одобрить',
    reject: 'Отклонить',
    commissionRate: 'Ставка комиссии маркетплейса',
    verifiedBadge: 'Проверен',
    pendingBadge: 'На проверке',

    mobileAppCompanion: 'Мобильное приложение (iOS & Android)',
    mobileAppDesc: 'Приложение для смартфонов на React Native и Expo',

    advantages: {
      title: 'Почему выбирают BUILT?',
      subtitle: 'Удобная и надежная экосистема для строительного рынка Узбекистана',
      adv1Title: 'Прямые цены от заводов',
      adv1Desc: 'Покупайте без посредников по дилерским и заводским ценам.',
      adv2Title: 'Гарантированная логистика',
      adv2Desc: 'Доставка любым транспортом: Labo, Gazel, Isuzu и длинномеры.',
      adv3Title: 'Официальный документооборот',
      adv3Desc: 'Договоры с НДС и электронные счета-фактуры для юр. лиц.',
      adv4Title: 'Сертифицированное качество',
      adv4Desc: 'Все товары соответствуют государственным стандартам и ГОСТ.'
    },

    vehicles: {
      labo: 'Damas / Labo (до 1 тонны / 2 м³)',
      gazel: 'Газель (до 2 тонн / 10 м³)',
      isuzu: 'Грузовик Isuzu (до 5 тонн / 20 м³)',
      fura: 'Камаз / Фура (до 20 тонн / 45 м³)'
    }
  }
};

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('uz-UZ').format(amount) + " so'm";
}

export function formatPriceCompact(amount: number): string {
  if (amount >= 1_000_000_000) {
    return (amount / 1_000_000_000).toFixed(1) + ' mlrd';
  }
  if (amount >= 1_000_000) {
    return (amount / 1_000_000).toFixed(1) + ' mln';
  }
  return formatPrice(amount);
}

export const ALL_REGIONS_LABEL = 'Barcha viloyatlar';

export const UZBEKISTAN_REGIONS = [
  'Namangan viloyati',
  'Toshkent shahri',
  'Toshkent viloyati',
  'Farg‘ona viloyati',
  'Andijon viloyati',
  'Samarqand viloyati',
  'Buxoro viloyati',
  'Navoiy viloyati',
  'Qashqadaryo viloyati',
  'Surxondaryo viloyati',
  'Xorazm viloyati',
  'Jizzax viloyati',
  'Sirdaryo viloyati',
  'Qoraqalpog‘iston Resp.'
];

export const REGION_DISTRICTS: Record<string, string[]> = {
  'Namangan viloyati': [
    'Namangan shahri',
    'Davlatobod tumani',
    'Yangi Namangan tumani',
    'Chust tumani',
    'To‘raqo‘rg‘on tumani',
    'Kosonsoy tumani',
    'Pop tumani',
    'Chortoq tumani',
    'Uychi tumani',
    'Uchqo‘rg‘on tumani',
    'Yangiqo‘rg‘on tumani',
    'Norin tumani',
    'Mingbuloq tumani'
  ],
  'Toshkent shahri': [
    'Yunusobod tumani',
    'Chilonzor tumani',
    'Mirzo Ulug‘bek tumani',
    'Yashnobod tumani',
    'Mirobod tumani',
    'Yakkasaroy tumani',
    'Shayxontohur tumani',
    'Olmazor tumani',
    'Uchtepa tumani',
    'Sergeli tumani',
    'Yangihayot tumani',
    'Bektemir tumani'
  ],
  'Toshkent viloyati': [
    'Chirchiq shahri',
    'Olmaliq shahri',
    'Angren shahri',
    'Bekobod shahri',
    'Yangiyo‘l shahri',
    'Nurafshon shahri',
    'Qibray tumani',
    'Zangiota tumani',
    'Toshkent tumani',
    'Bo‘stonliq tumani',
    'O‘rtachirchiq tumani',
    'Quyi Chirchiq tumani',
    'Yuqori Chirchiq tumani',
    'Parkent tumani',
    'Piskent tumani',
    'Chinoz tumani',
    'Bo‘ka tumani',
    'Bekobod tumani',
    'Oqqo‘rg‘on tumani'
  ],
  'Farg‘ona viloyati': [
    'Farg‘ona shahri',
    'Qo‘qon shahri',
    'Marg‘ilon shahri',
    'Quvasoy shahri',
    'Quva tumani',
    'Oltariq tumani',
    'Rishton tumani',
    'Bag‘dod tumani',
    'Buvayda tumani',
    'Uchko‘prik tumani',
    'Toshloq tumani',
    'Yozyovon tumani',
    'Beshariq tumani',
    'Dang‘ara tumani',
    'Farg‘ona tumani',
    'O‘zbekiston tumani',
    'So‘x tumani'
  ],
  'Andijon viloyati': [
    'Andijon shahri',
    'Xonobod shahri',
    'Asaka tumani',
    'Shahrixon tumani',
    'Xo‘jaobod tumani',
    'Baliqchi tumani',
    'Oltinko‘l tumani',
    'Buloqboshi tumani',
    'Izboskan tumani',
    'Jalaquduq tumani',
    'Kurg‘ontepa tumani',
    'Marhamat tumani',
    'Paxtaobod tumani',
    'Ulug‘nor tumani',
    'Andijon tumani'
  ],
  'Samarqand viloyati': [
    'Samarqand shahri',
    'Kattaqo‘rg‘on shahri',
    'Pastdarg‘om tumani',
    'Urgut tumani',
    'Jomboy tumani',
    'Bulung‘ur tumani',
    'Samarqand tumani',
    'Toyloq tumani',
    'Oqdaryo tumani',
    'Payariq tumani',
    'Ishtixon tumani',
    'Qo‘shrabot tumani',
    'Narpay tumani',
    'Paxtachi tumani',
    'Kattaqo‘rg‘on tumani',
    'Nurobod tumani'
  ],
  'Buxoro viloyati': [
    'Buxoro shahri',
    'Kogon shahri',
    'G‘ijduvon tumani',
    'Vobkent tumani',
    'Jondor tumani',
    'Qorako‘l tumani',
    'Olot tumani',
    'Peshku tumani',
    'Romitan tumani',
    'Shofirkon tumani',
    'Qorovulbozor tumani',
    'Buxoro tumani',
    'Kogon tumani'
  ],
  'Navoiy viloyati': [
    'Navoiy shahri',
    'Zarafshon shahri',
    'Karmana tumani',
    'Qiziltepa tumani',
    'Xatirchi tumani',
    'Navbahor tumani',
    'Nurota tumani',
    'Konimex tumani',
    'Tomdi tumani',
    'Uchquduq tumani'
  ],
  'Qashqadaryo viloyati': [
    'Qarshi shahri',
    'Shahrisabz shahri',
    'Koson tumani',
    'Kitob tumani',
    'G‘uzor tumani',
    'Yakkabog‘ tumani',
    'Qamashi tumani',
    'Chiroqchi tumani',
    'Ko‘kdala tumani',
    'Kasbi tumani',
    'Nishon tumani',
    'Mirishkor tumani',
    'Dehqonobod tumani',
    'Muborak tumani',
    'Qarshi tumani'
  ],
  'Surxondaryo viloyati': [
    'Termiz shahri',
    'Denov tumani',
    'Sherobod tumani',
    'Boysun tumani',
    'Sho‘rchi tumani',
    'Jarqo‘rg‘on tumani',
    'Qumqo‘rg‘on tumani',
    'Sariosiyo tumani',
    'Uzun tumani',
    'Oltinsoy tumani',
    'Muzrabot tumani',
    'Angor tumani',
    'Bandixon tumani',
    'Qiziriq tumani',
    'Termiz tumani'
  ],
  'Xorazm viloyati': [
    'Urganch shahri',
    'Xiva shahri',
    'Shovot tumani',
    'Xonqa tumani',
    'Gurlan tumani',
    'Bog‘ot tumani',
    'Yangiariq tumani',
    'Yangibozor tumani',
    'Qo‘shko‘pir tumani',
    'Hazorasp tumani',
    'Tuproqqal‘a tumani',
    'Urganch tumani'
  ],
  'Jizzax viloyati': [
    'Jizzax shahri',
    'Sharof Rashidov tumani',
    'Zomin tumani',
    'G‘allaorol tumani',
    'Do‘stlik tumani',
    'Paxtakor tumani',
    'Baxmal tumani',
    'Forish tumani',
    'Mirzacho‘l tumani',
    'Zarbdor tumani',
    'Zafarobod tumani',
    'Arnasoy tumani',
    'Yangiobod tumani'
  ],
  'Sirdaryo viloyati': [
    'Guliston shahri',
    'Yangiyer shahri',
    'Shirin shahri',
    'Boyovut tumani',
    'Sayxunobod tumani',
    'Mirzaobod tumani',
    'Sardoba tumani',
    'Oqoltin tumani',
    'Xovos tumani',
    'Guliston tumani',
    'Sirdaryo tumani'
  ],
  'Qoraqalpog‘iston Resp.': [
    'Nukus shahri',
    'Qo‘ng‘irot tumani',
    'Beruniy tumani',
    'To‘rtko‘l tumani',
    'Xo‘jayli tumani',
    'Chimboy tumani',
    'Amudaryo tumani',
    'Ellikqala tumani',
    'Taxiatosh tumani',
    'Mo‘ynoq tumani',
    'Qanliko‘l tumani',
    'Shumanay tumani',
    'Kegeyli tumani',
    'Bo‘zatov tumani',
    'Qorao‘zak tumani',
    'Taxtako‘pir tumani',
    'Nukus tumani'
  ]
};

export function getDistrictsForRegion(regionName: string): string[] {
  return REGION_DISTRICTS[regionName] || REGION_DISTRICTS['Namangan viloyati'];
}

export interface RegionalHubInfo {
  region: string;
  hubName: string;
  hubAddress: string;
  pickupWarehouse: string;
  deliveryRadiusNote: string;
  localHeadline: string;
  distributorName: string;
  phone: string;
  workingHours: string;
  avgDeliveryHours: number;
}

export const REGIONAL_DATA: Record<string, RegionalHubInfo> = {
  'Namangan viloyati': {
    region: 'Namangan viloyati',
    hubName: 'BUILT Namangan Yuksalish Logistika Xabi',
    hubAddress: 'Namangan shahri, Davlatobod tumani, Yuksalish sanoat zonasi 12 / Chust yo‘li',
    pickupWarehouse: 'Namangan Davlatobod Yuksalish terminali, 4-darvoza (A-blok)',
    deliveryRadiusNote: 'Namangan shahri, Chust, Kosonsoy, To‘raqo‘rg‘on va barcha tumanlarga 2 soatda',
    localHeadline: 'Namangan viloyati bo‘yicha to‘g‘ridan-to‘g‘ri dilerlik omborlari',
    distributorName: 'Namangan Sement & Beton Savdo Uyi',
    phone: '20 020 50 68',
    workingHours: 'Har kuni 08:00 – 21:00',
    avgDeliveryHours: 2
  },
  'Toshkent shahri': {
    region: 'Toshkent shahri',
    hubName: 'BUILT Toshkent Sergeli Bosh Markazi',
    hubAddress: 'Toshkent shahri, Sergeli tumani, Yangi Sergeli 14 / Bekto‘pi logistika markazi',
    pickupWarehouse: 'Sergeli Bekto‘pi markaziy logistika bazasi, 2-rampa',
    deliveryRadiusNote: 'Toshkent shahrining barcha 12 ta tumaniga 1.5 – 3 soatda ob‘ektgacha',
    localHeadline: 'Toshkent shahri bo‘ylab eng yirik qurilish omborlari tarmog‘i',
    distributorName: 'Toshkent Bekobod Metall Invest & Knauf Markazi',
    phone: '20 020 50 68',
    workingHours: 'Har kuni 08:00 – 22:00',
    avgDeliveryHours: 2
  },
  'Toshkent viloyati': {
    region: 'Toshkent viloyati',
    hubName: 'BUILT Toshkent Viloyati Chirchiq/Ohangaron Xabi',
    hubAddress: 'Chirchiq shahri, Sanoatchilar ko‘chasi 9 / Ohangaron sement magistrali',
    pickupWarehouse: 'Chirchiq temir yo‘l ombori va Ohangaron yuk terminali',
    deliveryRadiusNote: 'Chirchiq, Olmaliq, Angren, Bekobod, Yangiyo‘l va tumanlarga tezkor yetkazish',
    localHeadline: 'Toshkent viloyati sanoat zonalari va qurilish obyektlari ta‘minoti',
    distributorName: 'Ohangaron Sement & Toshkent Viloyat Dileri',
    phone: '20 020 50 68',
    workingHours: 'Har kuni 08:00 – 20:00',
    avgDeliveryHours: 3
  },
  'Samarqand viloyati': {
    region: 'Samarqand viloyati',
    hubName: 'BUILT Samarqand Spitamen Markaziy Ombori',
    hubAddress: 'Samarqand viloyati, Spitamen shoh ko‘chasi 45 / Jomboy yuk ombori',
    pickupWarehouse: 'Spitamen qurilish bazasi, 3-sektor (Jomboy trassasi)',
    deliveryRadiusNote: 'Samarqand shahri, Urgut, Jomboy, Pastdarg‘om va barcha tumanlarga 2-4 soatda',
    localHeadline: 'Samarqand viloyati bo‘yicha pishiq g‘isht, sement va metall ta‘minoti',
    distributorName: 'Samarqand Registon Qurilish Savdo Uyi',
    phone: '20 020 50 68',
    workingHours: 'Har kuni 08:00 – 21:00',
    avgDeliveryHours: 2
  },
  'Farg‘ona viloyati': {
    region: 'Farg‘ona viloyati',
    hubName: 'BUILT Farg‘ona Vodiy Logistika Markazi',
    hubAddress: 'Farg‘ona viloyati, Quvasoy shahri, Zavodskaya 8 / Qo‘qon shahri ombori',
    pickupWarehouse: 'Quvasoysement logistika punkti va Qo‘qon Yangi Chorsu ombori',
    deliveryRadiusNote: 'Farg‘ona, Qo‘qon, Marg‘ilon, Quvasoy va tumanlarga tezkor Labo va Gazelda',
    localHeadline: 'Farg‘ona vodiysi bo‘yicha Quvasoy sement va Knauf mahsulotlari',
    distributorName: 'Quvasoy Sement & Farg‘ona Dilerlik Tarmog‘i',
    phone: '20 020 50 68',
    workingHours: 'Har kuni 08:00 – 21:00',
    avgDeliveryHours: 2
  },
  'Andijon viloyati': {
    region: 'Andijon viloyati',
    hubName: 'BUILT Andijon Bobur Sanoat Xabi',
    hubAddress: 'Andijon viloyati, Bobur shoh ko‘chasi 112 / Asaka avtomobil zavodi yo‘li ombori',
    pickupWarehouse: 'Andijon shahri Bobur shoh ko‘chasi dilerlik ombori',
    deliveryRadiusNote: 'Andijon, Asaka, Shahrixon, Xonobod va tumanlarga 2-3 soatda yetkazish',
    localHeadline: 'Andijon viloyatida Andijonkabel va barcha qurilish mollari rasmiy dilerdan',
    distributorName: 'Andijon Kabel & Elektr Invest MChJ',
    phone: '20 020 50 68',
    workingHours: 'Har kuni 08:00 – 20:00',
    avgDeliveryHours: 3
  },
  'Buxoro viloyati': {
    region: 'Buxoro viloyati',
    hubName: 'BUILT Buxoro Knauf & Gips Terminali',
    hubAddress: 'Buxoro viloyati, Buxoro shahri, Sanoatchilar ko‘chasi 18 / Kogon yo‘li',
    pickupWarehouse: 'Buxoro Sanoatchilar ko‘chasi 18, 1-blok',
    deliveryRadiusNote: 'Buxoro shahri, Kogon, G‘ijduvon, Vobkent va tumanlarga 2-4 soatda',
    localHeadline: 'Buxoro viloyatida Knauf gipsokarton, rotband va pishiq g‘isht omborlari',
    distributorName: 'Buxoro Knauf & Gips Sanoat Uyi',
    phone: '20 020 50 68',
    workingHours: 'Har kuni 08:00 – 20:00',
    avgDeliveryHours: 3
  },
  'Navoiy viloyati': {
    region: 'Navoiy viloyati',
    hubName: 'BUILT Navoiy Karmana Sanoat Bazasi',
    hubAddress: 'Navoiy viloyati, Karmana tumani, Toshkent yo‘li 55 / Zarafshon ombori',
    pickupWarehouse: 'Karmana yuk stansiyasi ombori, 1-kirish',
    deliveryRadiusNote: 'Navoiy shahri, Zarafshon, Karmana, Qiziltepa va Uchquduqqa yetkazish',
    localHeadline: 'Navoiy viloyati va kon-metallurgiya obyektlari qurilish ta‘minoti',
    distributorName: 'Navoiy Metall & Sement Ta‘minot',
    phone: '20 020 50 68',
    workingHours: 'Har kuni 08:00 – 20:00',
    avgDeliveryHours: 3
  },
  'Qashqadaryo viloyati': {
    region: 'Qashqadaryo viloyati',
    hubName: 'BUILT Qashqadaryo Qarshi Logistika Xabi',
    hubAddress: 'Qashqadaryo viloyati, Qarshi shahri, Jayhun ko‘chasi 8 / Shahrisabz yo‘li',
    pickupWarehouse: 'Qarshi Jayhun ombor kompleksi, 2-qator',
    deliveryRadiusNote: 'Qarshi, Shahrisabz, Kitob, Koson, Nishon va barcha tumanlarga yetkazish',
    localHeadline: 'Qashqadaryo viloyati bo‘ylab poydevor va tom yopish materiallari',
    distributorName: 'Qarshi Qurilish Savdo Bazasi',
    phone: '20 020 50 68',
    workingHours: 'Har kuni 08:00 – 20:00',
    avgDeliveryHours: 3
  },
  'Surxondaryo viloyati': {
    region: 'Surxondaryo viloyati',
    hubName: 'BUILT Surxondaryo Termiz Xalqaro Logistika Markazi',
    hubAddress: 'Surxondaryo viloyati, Termiz shahri, Al-Hakim At-Termiziy 104',
    pickupWarehouse: 'Termiz erkin iqtisodiy zonasi ombori',
    deliveryRadiusNote: 'Termiz, Denov, Sherobod, Jarqo‘rg‘on va tumanlarga tezkor yuk mashinalari',
    localHeadline: 'Surxondaryo viloyati va chegaraoldi obyektlar uchun sertifikatlangan mollari',
    distributorName: 'Termiz Surxon Stroy Invest',
    phone: '20 020 50 68',
    workingHours: 'Har kuni 08:00 – 20:00',
    avgDeliveryHours: 4
  },
  'Xorazm viloyati': {
    region: 'Xorazm viloyati',
    hubName: 'BUILT Xorazm Urganch Ombor Terminali',
    hubAddress: 'Xorazm viloyati, Urganch shahri, Sanoatchilar hududi 4 / Xiva yo‘li',
    pickupWarehouse: 'Urganch Sanoat ombori, A-sektor',
    deliveryRadiusNote: 'Urganch, Xiva, Xonqa, Shovot va tumanlarga ob‘ektgacha tushirish bilan',
    localHeadline: 'Xorazm viloyatida Rossiya taxtasi, sement va fasad bo‘yoqlari',
    distributorName: 'Urganch Jayhun Stroy Tarmog‘i',
    phone: '20 020 50 68',
    workingHours: 'Har kuni 08:00 – 20:00',
    avgDeliveryHours: 3
  },
  'Jizzax viloyati': {
    region: 'Jizzax viloyati',
    hubName: 'BUILT Jizzax Markaziy Qurilish Xabi',
    hubAddress: 'Jizzax viloyati, Jizzax shahri, Sharof Rashidov shoh ko‘chasi 22',
    pickupWarehouse: 'Sharof Rashidov shoh ko‘chasi logistika xabi',
    deliveryRadiusNote: 'Jizzax shahri, Zomin, Paxtakor, G‘allaorol va tumanlarga 2 soatda',
    localHeadline: 'Jizzax viloyati bo‘ylab to‘g‘ridan-to‘g‘ri zavod narxlarida yetkazish',
    distributorName: 'Jizzax Sement & Metall Bazasi',
    phone: '20 020 50 68',
    workingHours: 'Har kuni 08:00 – 20:00',
    avgDeliveryHours: 2
  },
  'Sirdaryo viloyati': {
    region: 'Sirdaryo viloyati',
    hubName: 'BUILT Sirdaryo Guliston Logistika Bazasi',
    hubAddress: 'Sirdaryo viloyati, Guliston shahri, Sayxun ko‘chasi 15 / Yangiyer yo‘li',
    pickupWarehouse: 'Guliston Sayxun ombori, 1-seksiya',
    deliveryRadiusNote: 'Guliston, Yangiyer, Shirin, Boyovut va tumanlarga tezkor yetkazish',
    localHeadline: 'Sirdaryo viloyatida barcha bosqich qurilish materiallari omborda tayyor',
    distributorName: 'Sirdaryo Stroy Savdo Tarmog‘i',
    phone: '20 020 50 68',
    workingHours: 'Har kuni 08:00 – 20:00',
    avgDeliveryHours: 2
  },
  'Qoraqalpog‘iston Resp.': {
    region: 'Qoraqalpog‘iston Resp.',
    hubName: 'BUILT Nukus Markaziy Terminali',
    hubAddress: 'Qoraqalpog‘iston Respublikasi, Nukus shahri, Taxiatosh yo‘li 10',
    pickupWarehouse: 'Nukus Taxiatosh ombor zonasi, 3-darvoza',
    deliveryRadiusNote: 'Nukus shahri, Qo‘ng‘irot, Beruniy, To‘rtko‘l, Xo‘jayli va barcha hududlarga',
    localHeadline: 'Qoraqalpog‘iston Respublikasi bo‘yicha rasmiy dilerlik omborlari',
    distributorName: 'Nukus Amudaryo Stroy Invest',
    phone: '20 020 50 68',
    workingHours: 'Har kuni 08:00 – 20:00',
    avgDeliveryHours: 4
  }
};

export function getRegionalHubInfo(regionName?: string): RegionalHubInfo {
  if (!regionName || regionName === ALL_REGIONS_LABEL) {
    return REGIONAL_DATA['Toshkent shahri'];
  }
  return REGIONAL_DATA[regionName] || REGIONAL_DATA['Namangan viloyati'];
}

export const TASHKENT_DISTRICTS = REGION_DISTRICTS['Toshkent shahri'];
export const NAMANGAN_DISTRICTS = REGION_DISTRICTS['Namangan viloyati'];

