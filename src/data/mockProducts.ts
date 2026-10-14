import { Product, Category, Coupon, Order, User } from '../types/ecommerce';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    productCount: 28,
    description: 'High-performance headphones, smart watches, sound systems & modern gadgets.',
    featured: true
  },
  {
    id: 'cat-2',
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800',
    productCount: 42,
    description: 'Trending hoodies, outerwear, shoes, denim & daily style essentials.',
    featured: true
  },
  {
    id: 'cat-3',
    name: 'Beauty',
    slug: 'beauty',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    productCount: 19,
    description: 'Organic skincare sets, luminous serums, fragrances & self-care items.',
    featured: true
  },
  {
    id: 'cat-4',
    name: 'Home & Living',
    slug: 'home-living',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800',
    productCount: 35,
    description: 'Minimalist lamps, ergonomic furniture, ceramics & cozy interior accents.',
    featured: true
  },
  {
    id: 'cat-5',
    name: 'Sports',
    slug: 'sports',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    productCount: 22,
    description: 'Fitness gear, yoga mats, running sneakers & active lifestyle equipment.',
    featured: true
  },
  {
    id: 'cat-6',
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    productCount: 31,
    description: 'Handcrafted leather backpacks, watches, sunglasses & travel goods.',
    featured: true
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Apex Pro Wireless Noise-Canceling Headphones',
    slug: 'apex-pro-wireless-headphones',
    category: 'Electronics',
    brand: 'NovaSound',
    description: 'Experience studio-grade acoustic clarity with active hybrid noise cancellation. Engineered with custom 40mm titanium drivers and memory foam earcups for up to 45 hours of immersive playtime.',
    shortDescription: 'Active Noise-Canceling over-ear headphones with 45-hour battery life.',
    price: 249.99,
    originalPrice: 299.99,
    discount: 17,
    rating: 4.9,
    reviewCount: 128,
    stock: 24,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Matte Black', hex: '#1e1e1e' },
      { name: 'Silver Slate', hex: '#d1d5db' },
      { name: 'Midnight Navy', hex: '#1e3a8a' }
    ],
    sku: 'NV-AUD-01',
    specifications: [
      { label: 'Driver Size', value: '40mm Dynamic Drivers' },
      { label: 'Battery Life', value: 'Up to 45 Hours (ANC On)' },
      { label: 'Connectivity', value: 'Bluetooth 5.3 & 3.5mm Aux' },
      { label: 'Weight', value: '254g' }
    ],
    reviews: [
      {
        id: 'rev-1',
        userName: 'Alex Rivers',
        rating: 5,
        date: '2026-07-28',
        title: 'Unbelievable Sound Quality',
        review: 'The noise cancellation completely blocks out plane noise during flights. Super comfortable ear pads.',
        verified: true
      },
      {
        id: 'rev-2',
        userName: 'Sophia Chen',
        rating: 5,
        date: '2026-07-15',
        title: 'Worth every single penny',
        review: 'Sleek design, fantastic bass response, and the battery really lasts over 40 hours as advertised.',
        verified: true
      }
    ],
    featured: true,
    isNew: true,
    dealOfDay: true,
    tags: ['Headphones', 'Audio', 'Wireless', 'Noise Canceling']
  },
  {
    id: 'prod-2',
    name: 'Chronos Horizon Smartwatch Series V',
    slug: 'chronos-horizon-smartwatch',
    category: 'Electronics',
    brand: 'Chronos',
    description: 'Track your health, ECG, SpO2, sleep stages, and over 100 sport modes with precision. Encased in high-grade stainless steel with an Always-On AMOLED retina display.',
    shortDescription: 'Advanced health smartwatch with AMOLED display and 7-day battery.',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.8,
    reviewCount: 94,
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Space Gray', hex: '#374151' },
      { name: 'Rose Gold', hex: '#f43f5e' },
      { name: 'Titanium', hex: '#9ca3af' }
    ],
    sizes: ['40mm', '44mm'],
    sku: 'NV-WCH-05',
    specifications: [
      { label: 'Display', value: '1.4" AMOLED 454x454' },
      { label: 'Water Resistance', value: '5ATM (50 meters)' },
      { label: 'Battery', value: 'Up to 7 Days typical use' },
      { label: 'Sensors', value: 'Heart Rate, SpO2, ECG, GPS' }
    ],
    reviews: [
      {
        id: 'rev-3',
        userName: 'Marcus Vance',
        rating: 5,
        date: '2026-08-01',
        title: 'Best fitness companion',
        review: 'GPS accuracy is spot on. The display stays clear even under direct noon sunlight.',
        verified: true
      }
    ],
    featured: true,
    tags: ['Smartwatch', 'Fitness', 'Gadgets']
  },
  {
    id: 'prod-3',
    name: 'Velocity Ultra Light Running Sneakers',
    slug: 'velocity-ultra-light-running-sneakers',
    category: 'Sports',
    brand: 'AeroMotion',
    description: 'Engineered for competitive runners and daily joggers. Breathable woven mesh upper combined with responsive nitrogen-infused foam midsole delivers maximum energy return.',
    shortDescription: 'Lightweight high-performance running shoes with high energy return.',
    price: 129.99,
    originalPrice: 159.99,
    discount: 18,
    rating: 4.7,
    reviewCount: 76,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Crimson Red', hex: '#dc2626' },
      { name: 'Electric Volt', hex: '#84cc16' },
      { name: 'Stealth Black', hex: '#111827' }
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    sku: 'NV-FTW-12',
    specifications: [
      { label: 'Weight', value: '210g per shoe' },
      { label: 'Heel Drop', value: '8mm' },
      { label: 'Midsole', value: 'Responsive NitroFoam' },
      { label: 'Upper', value: 'Jacquard Breathable Mesh' }
    ],
    reviews: [
      {
        id: 'rev-4',
        userName: 'David Miller',
        rating: 5,
        date: '2026-07-20',
        title: 'Ran my fastest 10k in these!',
        review: 'Extremely lightweight yet super cushioned. Zero blisters on first run.',
        verified: true
      }
    ],
    featured: true,
    tags: ['Sneakers', 'Running', 'Shoes', 'Sports']
  },
  {
    id: 'prod-4',
    name: 'Artisan Full-Grain Leather Commuter Backpack',
    slug: 'artisan-full-grain-leather-backpack',
    category: 'Accessories',
    brand: 'Vanguard Carry',
    description: 'Handcrafted from premium full-grain Italian leather that develops a gorgeous patina over time. Features a padded 16" laptop sleeve, water-resistant zippers, and hidden travel pockets.',
    shortDescription: 'Handmade Italian leather backpack with 16" padded laptop compartment.',
    price: 189.99,
    originalPrice: 229.99,
    discount: 17,
    rating: 4.9,
    reviewCount: 88,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Cognac Brown', hex: '#9a3412' },
      { name: 'Espresso Dark', hex: '#451a03' },
      { name: 'Onyx Black', hex: '#171717' }
    ],
    sku: 'NV-BAG-08',
    specifications: [
      { label: 'Material', value: '100% Full-Grain Italian Leather' },
      { label: 'Laptop Capacity', value: 'Up to 16" MacBook Pro' },
      { label: 'Dimensions', value: '42cm x 30cm x 15cm' },
      { label: 'Capacity', value: '20 Liters' }
    ],
    reviews: [
      {
        id: 'rev-5',
        userName: 'Elena Rostova',
        rating: 5,
        date: '2026-07-10',
        title: 'Exquisite craftsmanship',
        review: 'The leather smells incredible and the organization pockets inside are well thought out.',
        verified: true
      }
    ],
    featured: true,
    tags: ['Leather', 'Backpack', 'Travel', 'Bags']
  },
  {
    id: 'prod-5',
    name: 'Aura Minimalist Sculptural Table Lamp',
    slug: 'aura-minimalist-sculptural-table-lamp',
    category: 'Home & Living',
    brand: 'Lumina Craft',
    description: 'Transform any room with soft ambient warm lighting. Features touch-sensitive dimming, 3 color temperatures (2700K to 5000K), and a weighted matte ceramic base.',
    shortDescription: 'Touch-dimmable modern architectural lamp with adjustable color warmths.',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.6,
    reviewCount: 52,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Sand White', hex: '#f5f5f4' },
      { name: 'Terracotta', hex: '#9a3412' },
      { name: 'Charcoal Matte', hex: '#262626' }
    ],
    sku: 'NV-HME-15',
    specifications: [
      { label: 'Light Source', value: 'Integrated Dimmable LED' },
      { label: 'Brightness', value: '600 Lumens Max' },
      { label: 'Power', value: 'USB-C Rechargeable & Plug-In' },
      { label: 'Height', value: '38cm' }
    ],
    reviews: [
      {
        id: 'rev-6',
        userName: 'Jordan Lee',
        rating: 5,
        date: '2026-08-04',
        title: 'Elevates my nightstand',
        review: 'The dimming function is super smooth. Perfect warm tone for bedtime reading.',
        verified: true
      }
    ],
    featured: false,
    isNew: true,
    tags: ['Home', 'Lighting', 'Decor', 'Minimalist']
  },
  {
    id: 'prod-6',
    name: 'Botanical Luminous Facial Skincare Ritual Set',
    slug: 'botanical-luminous-facial-skincare-ritual-set',
    category: 'Beauty',
    brand: 'Verdant Skin',
    description: 'A 4-step dermatologist-tested clean skincare set including Hyaluronic Cleanser, Vitamin C Brightening Serum, Peptide Night Cream, and Rosehip Facial Oil.',
    shortDescription: 'Complete 4-step organic hydrating skincare regimen for glowing skin.',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.9,
    reviewCount: 110,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
    ],
    sku: 'NV-BTY-03',
    specifications: [
      { label: 'Skin Type', value: 'All Skin Types (Sensitive Safe)' },
      { label: 'Key Ingredients', value: 'Hyaluronic Acid, Vitamin C, Niacinamide' },
      { label: 'Certification', value: '100% Cruelty-Free & Vegan' },
      { label: 'Volume', value: '4 x 50ml' }
    ],
    reviews: [
      {
        id: 'rev-7',
        userName: 'Clara Oswald',
        rating: 5,
        date: '2026-07-22',
        title: 'My skin has never felt softer',
        review: 'Saw noticeable brightness in just 5 days. Doesn’t leave any greasy feel.',
        verified: true
      }
    ],
    featured: true,
    dealOfDay: true,
    tags: ['Skincare', 'Beauty', 'Organic', 'Serum']
  },
  {
    id: 'prod-7',
    name: 'SoundPulse Waterproof Outdoor Bluetooth Speaker',
    slug: 'soundpulse-waterproof-outdoor-speaker',
    category: 'Electronics',
    brand: 'NovaSound',
    description: '360° stereo audio with deep rich bass in a rugged IP67 dust and waterproof enclosure. Built for camping, pool parties, and beach adventures.',
    shortDescription: '360° sound, IP67 waterproof speaker with 24-hour battery.',
    price: 69.99,
    originalPrice: 89.99,
    discount: 22,
    rating: 4.7,
    reviewCount: 142,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Forest Green', hex: '#15803d' },
      { name: 'Cobalt Blue', hex: '#1d4ed8' },
      { name: 'Onyx Black', hex: '#000000' }
    ],
    sku: 'NV-AUD-09',
    specifications: [
      { label: 'Waterproof Rating', value: 'IP67 Submersible' },
      { label: 'Battery Life', value: 'Up to 24 Hours continuous' },
      { label: 'Bluetooth', value: 'Bluetooth 5.2 (100ft range)' },
      { label: 'Power Output', value: '30W Peak' }
    ],
    reviews: [
      {
        id: 'rev-8',
        userName: 'Tom Harrison',
        rating: 5,
        date: '2026-08-02',
        title: 'Indestructible and loud!',
        review: 'Dropped it off a kayak into water, kept playing music without a hitch.',
        verified: true
      }
    ],
    featured: false,
    tags: ['Speaker', 'Bluetooth', 'Waterproof', 'Outdoor']
  },
  {
    id: 'prod-8',
    name: 'Organic Heavyweight Fleece Oversized Hoodie',
    slug: 'organic-heavyweight-fleece-oversized-hoodie',
    category: 'Fashion',
    brand: 'Studio Atelier',
    description: 'Crafted from 480 GSM 100% organic French terry cotton. Custom drop-shoulder silhouette, pre-shrunk fabric, double-lined hood with custom silver eyelets.',
    shortDescription: '480 GSM ultra-heavyweight organic cotton hoodie with relaxed fit.',
    price: 85.00,
    originalPrice: 105.00,
    discount: 19,
    rating: 4.9,
    reviewCount: 165,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Oatmeal Heather', hex: '#e7e5e4' },
      { name: 'Sage Green', hex: '#4d7c0f' },
      { name: 'Charcoal Gray', hex: '#374151' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sku: 'NV-APP-04',
    specifications: [
      { label: 'Material', value: '100% Organic French Terry Cotton' },
      { label: 'Weight', value: '480 GSM Heavyweight' },
      { label: 'Fit', value: 'Oversized Boxy Silhouette' },
      { label: 'Care', value: 'Machine Wash Cold, Lay Flat to Dry' }
    ],
    reviews: [
      {
        id: 'rev-9',
        userName: 'Maya Lin',
        rating: 5,
        date: '2026-07-30',
        title: 'Best hoodie I own',
        review: 'The weight of the cotton feels incredibly premium. True street style oversized fit.',
        verified: true
      }
    ],
    featured: true,
    isNew: true,
    tags: ['Hoodie', 'Apparel', 'Streetwear', 'Cotton']
  },
  {
    id: 'prod-9',
    name: 'Zenith Pro Ergonomic Mesh Office Chair',
    slug: 'zenith-pro-ergonomic-office-chair',
    category: 'Home & Living',
    brand: 'ErgoDesign',
    description: 'Protect your posture with adaptive dynamic lumbar support, 3D adjustable armrests, breathable Korean mesh, and smooth dual-wheel casters.',
    shortDescription: 'High-back ergonomic chair with dynamic lower back support.',
    price: 299.99,
    originalPrice: 389.99,
    discount: 23,
    rating: 4.8,
    reviewCount: 67,
    stock: 10,
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Stealth Black', hex: '#111827' },
      { name: 'Arctic White', hex: '#f8fafc' }
    ],
    sku: 'NV-FUR-02',
    specifications: [
      { label: 'Weight Limit', value: '150 kg / 330 lbs' },
      { label: 'Recline Angle', value: '90° to 135° locking positions' },
      { label: 'Gas Lift', value: 'Class 4 Heavy Duty' },
      { label: 'Warranty', value: '5-Year Manufacturer Warranty' }
    ],
    reviews: [
      {
        id: 'rev-10',
        userName: 'Nathan Drake',
        rating: 5,
        date: '2026-08-05',
        title: 'Saved my back during long work sessions',
        review: 'Instantly eliminated my lower back aches after switching from my old chair.',
        verified: true
      }
    ],
    featured: false,
    tags: ['Chair', 'Ergonomic', 'Office', 'Furniture']
  },
  {
    id: 'prod-10',
    name: 'Urban Explorer Matte Polarized Sunglasses',
    slug: 'urban-explorer-matte-polarized-sunglasses',
    category: 'Accessories',
    brand: 'OpticX',
    description: 'UV400 TAC polarized lenses reduce glare while elevating your visual contrast. Lightweight TR90 shape memory frame with stainless steel double hinges.',
    shortDescription: 'Lightweight polarized UV400 sunglasses with shatterproof frame.',
    price: 49.99,
    originalPrice: 69.99,
    discount: 28,
    rating: 4.6,
    reviewCount: 83,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Matte Black', hex: '#1e293b' },
      { name: 'Tortoiseshell', hex: '#78350f' }
    ],
    sku: 'NV-ACC-07',
    specifications: [
      { label: 'UV Protection', value: '100% UV400 Protection' },
      { label: 'Lens Material', value: 'TAC Polarized Anti-Scratch' },
      { label: 'Frame Weight', value: '22 grams' }
    ],
    reviews: [
      {
        id: 'rev-11',
        userName: 'Rachel Green',
        rating: 5,
        date: '2026-07-19',
        title: 'Super stylish and crisp vision',
        review: 'Driving in bright sunlight is so much easier now. They feel featherlight on the nose.',
        verified: true
      }
    ],
    featured: false,
    tags: ['Sunglasses', 'Eyewear', 'Accessories']
  },
  {
    id: 'prod-11',
    name: 'ProGrip Non-Slip Eco Rubber Yoga Mat',
    slug: 'progrip-non-slip-eco-yoga-mat',
    category: 'Sports',
    brand: 'ZenithFit',
    description: 'Designed with dual-sided anti-slip polyurethane and natural biodegradable tree rubber base. 5mm thickness delivers optimal cushion for joints.',
    shortDescription: '5mm thick eco-friendly tree rubber mat with supreme dry/wet grip.',
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 4.9,
    reviewCount: 91,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Dusty Rose', hex: '#fb7185' },
      { name: 'Sage Green', hex: '#15803d' },
      { name: 'Midnight Blue', hex: '#1e3a8a' }
    ],
    sku: 'NV-SPT-03',
    specifications: [
      { label: 'Thickness', value: '5mm High-Density' },
      { label: 'Dimensions', value: '183cm x 68cm' },
      { label: 'Material', value: 'Natural Rubber + Eco PU Top' },
      { label: 'Include', value: 'Carrying Strap Included' }
    ],
    reviews: [
      {
        id: 'rev-12',
        userName: 'Priya Patel',
        rating: 5,
        date: '2026-08-03',
        title: 'Best grip in hot yoga',
        review: 'Even with sweaty hands, my pose doesn’t slip a single millimeter.',
        verified: true
      }
    ],
    featured: false,
    tags: ['Yoga', 'Fitness', 'Sports', 'Mat']
  },
  {
    id: 'prod-12',
    name: 'Velvet Rose & Cedar Wood Eau de Parfum',
    slug: 'velvet-rose-cedarwood-eau-de-parfum',
    category: 'Beauty',
    brand: 'Maison Luxe',
    description: 'An intoxicating blend of Damask rose, warm cedarwood, smoked amber, and subtle vanilla. Crafted in Grasse, France with premium botanical oils.',
    shortDescription: 'Long-lasting luxury fragrance crafted in France with rose and cedar notes.',
    price: 110.00,
    originalPrice: 135.00,
    discount: 18,
    rating: 4.8,
    reviewCount: 44,
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800'
    ],
    sku: 'NV-BTY-09',
    specifications: [
      { label: 'Fragrance Family', value: 'Woody Floral Amber' },
      { label: 'Volume', value: '100 ml / 3.4 fl. oz.' },
      { label: 'Concentration', value: 'Eau de Parfum (18-20% oil)' }
    ],
    reviews: [
      {
        id: 'rev-13',
        userName: 'Isabella Rossi',
        rating: 5,
        date: '2026-07-25',
        title: 'Compliments every time I wear it',
        review: 'Stays on skin for over 10 hours easily. Rich and sophisticated without being overpowering.',
        verified: true
      }
    ],
    featured: true,
    tags: ['Perfume', 'Fragrance', 'Luxury', 'Beauty']
  },
  {
    id: 'prod-13',
    name: 'UltraWide Curved Gaming Monitor 34" 165Hz',
    slug: 'ultrawide-curved-gaming-monitor-34-165hz',
    category: 'Electronics',
    brand: 'Apex Tech',
    description: 'Immerse in vivid detail with 3440x1440 WQHD resolution, 1500R curvature, 1ms response time, HDR400, and AMD FreeSync Premium support.',
    shortDescription: '34" 1500R Curved WQHD display with 165Hz refresh rate and 1ms response.',
    price: 449.99,
    originalPrice: 549.99,
    discount: 18,
    rating: 4.9,
    reviewCount: 72,
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800'
    ],
    sku: 'NV-ELE-18',
    specifications: [
      { label: 'Resolution', value: '3440 x 1440 WQHD 21:9' },
      { label: 'Refresh Rate', value: '165Hz' },
      { label: 'Panel Type', value: 'Fast VA Curved (1500R)' },
      { label: 'Ports', value: '2x HDMI 2.1, 2x DisplayPort 1.4' }
    ],
    reviews: [
      {
        id: 'rev-14',
        userName: 'Gavin Thorne',
        rating: 5,
        date: '2026-07-14',
        title: 'Workstation & Gaming perfection',
        review: 'Having two documents side by side or flying in flight simulators is a total game changer.',
        verified: true
      }
    ],
    featured: false,
    tags: ['Monitor', 'Gaming', 'Electronics', 'Curved']
  },
  {
    id: 'prod-14',
    name: 'Classic Raw Denim Selvedge Jacket',
    slug: 'classic-raw-denim-selvedge-jacket',
    category: 'Fashion',
    brand: 'Heritage Co.',
    description: 'Constructed from 14.5 oz Japanese selvedge denim. Unwashed dark indigo dye with branded brass hardware and classic double chest flap pockets.',
    shortDescription: '14.5 oz Japanese selvedge indigo denim trucker jacket.',
    price: 139.99,
    originalPrice: 175.00,
    discount: 20,
    rating: 4.8,
    reviewCount: 39,
    stock: 16,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Raw Indigo', hex: '#1e3a8a' },
      { name: 'Washed Blue', hex: '#3b82f6' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    sku: 'NV-APP-11',
    specifications: [
      { label: 'Denim Weight', value: '14.5 oz Japanese Selvedge' },
      { label: 'Material', value: '100% Cotton' },
      { label: 'Hardware', value: 'Custom Solid Brass Buttons' }
    ],
    reviews: [
      {
        id: 'rev-15',
        userName: 'Ethan Vance',
        rating: 5,
        date: '2026-08-06',
        title: 'Built to last a lifetime',
        review: 'Takes a few wears to break in, but the selvedge detail on the cuff is top tier.',
        verified: true
      }
    ],
    featured: false,
    tags: ['Denim', 'Jacket', 'Fashion', 'Apparel']
  },
  {
    id: 'prod-15',
    name: 'Precision Pour-Over Coffee Kettle with Temperature Control',
    slug: 'precision-pour-over-coffee-kettle',
    category: 'Home & Living',
    brand: 'Barista Craft',
    description: 'Electric gooseneck kettle with variable digital temp dial (104°F to 212°F), built-in stopwatch, hold mode, and rapid 1200W heating element.',
    shortDescription: '1200W digital temperature control gooseneck kettle for pour-over coffee.',
    price: 94.99,
    originalPrice: 119.99,
    discount: 21,
    rating: 4.9,
    reviewCount: 81,
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Matte Charcoal', hex: '#1f2937' },
      { name: 'Copper Bronze', hex: '#b45309' }
    ],
    sku: 'NV-KIT-04',
    specifications: [
      { label: 'Capacity', value: '0.9 Liters' },
      { label: 'Power', value: '1200 Watts' },
      { label: 'Temperature Range', value: '40°C - 100°C (104°F - 212°F)' }
    ],
    reviews: [
      {
        id: 'rev-16',
        userName: 'Chloe Bennett',
        rating: 5,
        date: '2026-07-18',
        title: 'Game changer for morning coffee',
        review: 'Heats up water in under 2 minutes and holds exact temperature flawlessly.',
        verified: true
      }
    ],
    featured: true,
    tags: ['Coffee', 'Kettle', 'Kitchen', 'Home']
  },
  {
    id: 'prod-16',
    name: 'Titanium Performance Hydration Flask 32oz',
    slug: 'titanium-performance-hydration-flask-32oz',
    category: 'Sports',
    brand: 'HydroQuest',
    description: 'Double-wall vacuum insulated stainless steel water bottle. Keeps drinks icy cold for 24 hours or piping hot for 12 hours. Paracord handle and leakproof straw lid.',
    shortDescription: '32oz double-wall insulated flask keeping drinks cold for 24h.',
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    rating: 4.8,
    reviewCount: 153,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Arctic White', hex: '#ffffff' },
      { name: 'Pacific Cyan', hex: '#06b6d4' },
      { name: 'Olive Drab', hex: '#3f6212' }
    ],
    sku: 'NV-SPT-08',
    specifications: [
      { label: 'Capacity', value: '32 oz / 950 ml' },
      { label: 'Insulation', value: 'TempLock Double-Wall Vacuum' },
      { label: 'BPA Free', value: '100% Non-Toxic Food Grade 18/8 Steel' }
    ],
    reviews: [
      {
        id: 'rev-17',
        userName: 'Sam Rodriguez',
        rating: 5,
        date: '2026-08-01',
        title: 'Ice stayed solid all day in heat',
        review: 'Left it in my car during 90° weather and came back to frozen ice chunks.',
        verified: true
      }
    ],
    featured: false,
    tags: ['Water Bottle', 'Sports', 'Hydration', 'Outdoors']
  },
  {
    id: 'prod-17',
    name: 'Minimalist Slim RFID Blocking Leather Wallet',
    slug: 'minimalist-slim-rfid-blocking-leather-wallet',
    category: 'Accessories',
    brand: 'Vanguard Carry',
    description: 'Crafted from top-grain leather with quick-draw card thumb slot and aluminum RFID protective interior lining. Fits up to 10 cards and cash securely.',
    shortDescription: 'Ultra-thin leather wallet with RFID blocking aluminum core.',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    rating: 4.7,
    reviewCount: 98,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1585488763177-bde7d15fd3cf?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Jet Black', hex: '#111827' },
      { name: 'Saddle Tan', hex: '#b45309' }
    ],
    sku: 'NV-ACC-02',
    specifications: [
      { label: 'Dimensions', value: '10.5cm x 7cm x 0.8cm' },
      { label: 'Card Capacity', value: '8 - 10 Cards + Cash Clip' },
      { label: 'Protection', value: '13.56 MHz RFID Shielding' }
    ],
    reviews: [
      {
        id: 'rev-18',
        userName: 'Kenneth Wright',
        rating: 5,
        date: '2026-07-29',
        title: 'Goodbye bulky wallet',
        review: 'Slips easily into front pocket without any bulge. High quality stitching.',
        verified: true
      }
    ],
    featured: false,
    tags: ['Wallet', 'Leather', 'Accessories', 'Minimalist']
  },
  {
    id: 'prod-18',
    name: 'Smart Ambient LED Light Bars Pair (RGBIC Sync)',
    slug: 'smart-ambient-led-light-bars-pair',
    category: 'Electronics',
    brand: 'Lumina Tech',
    description: 'Dynamic RGBIC lighting that syncs with your TV, music, or PC display. App controlled, voice activated via Google Home & Alexa with 16+ million color options.',
    shortDescription: 'App-controlled RGBIC light bars for immersive TV and desk setups.',
    price: 54.99,
    originalPrice: 74.99,
    discount: 27,
    rating: 4.6,
    reviewCount: 62,
    stock: 28,
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
    ],
    sku: 'NV-ELE-22',
    specifications: [
      { label: 'Control Method', value: 'App, Remote & Smart Voice Assist' },
      { label: 'Modes', value: '40+ Scene Modes, Music Rhythm Sync' },
      { label: 'Power', value: 'USB 5V/2A' }
    ],
    reviews: [
      {
        id: 'rev-19',
        userName: 'Derek Cole',
        rating: 5,
        date: '2026-07-16',
        title: 'Insane atmosphere for movie nights',
        review: 'Syncs effortlessly with background audio. Setup took less than 5 minutes.',
        verified: true
      }
    ],
    featured: false,
    tags: ['LED', 'Smart Home', 'Lighting', 'Electronics']
  },
  {
    id: 'prod-19',
    name: 'Pure Silk Sleeping Eyemask & Pillowcase Duo',
    slug: 'pure-silk-sleeping-eyemask-pillowcase-duo',
    category: 'Beauty',
    brand: 'Luxe Slumber',
    description: '100% 22 Momme Mulberry Silk. Hypoallergenic, breathable, reduces sleep lines and prevents hair frizz while you rest.',
    shortDescription: '22 Momme Grade 6A pure mulberry silk eye mask and queen pillowcase.',
    price: 65.00,
    originalPrice: 85.00,
    discount: 24,
    rating: 4.9,
    reviewCount: 77,
    stock: 19,
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512290900673-0f1c34273f08?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#eab308' },
      { name: 'Pearl Pink', hex: '#f472b6' },
      { name: 'Charcoal Black', hex: '#1f2937' }
    ],
    sku: 'NV-BTY-14',
    specifications: [
      { label: 'Material', value: '100% 22 Momme Grade 6A Mulberry Silk' },
      { label: 'Pillowcase Size', value: 'Queen Standard (50x75cm)' },
      { label: 'Certification', value: 'OEKO-TEX Standard 100' }
    ],
    reviews: [
      {
        id: 'rev-20',
        userName: 'Hannah Abbott',
        rating: 5,
        date: '2026-08-02',
        title: 'Wake up with zero bed head',
        review: 'Feels like sleeping on a cloud. Extremely gentle on skin.',
        verified: true
      }
    ],
    featured: false,
    tags: ['Silk', 'Sleep', 'Beauty', 'Wellness']
  },
  {
    id: 'prod-20',
    name: 'Tailored Italian Linen Summer Casual Shirt',
    slug: 'tailored-italian-linen-summer-casual-shirt',
    category: 'Fashion',
    brand: 'Studio Atelier',
    description: 'Lightweight, ultra-breathable 100% Italian flax linen button-up shirt. Enzyme washed for pre-softened drape and comfortable casual luxury.',
    shortDescription: '100% pre-softened Italian flax linen long-sleeve relaxed shirt.',
    price: 78.00,
    originalPrice: 98.00,
    discount: 20,
    rating: 4.7,
    reviewCount: 56,
    stock: 21,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800'
    ],
    colors: [
      { name: 'Crisp White', hex: '#ffffff' },
      { name: 'Sky Blue', hex: '#38bdf8' },
      { name: 'Sand Beige', hex: '#d6d3d1' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    sku: 'NV-APP-20',
    specifications: [
      { label: 'Fabric', value: '100% Italian Flax Linen' },
      { label: 'Fit', value: 'Tailored Casual Fit' },
      { label: 'Buttons', value: 'Mother-of-Pearl Effect' }
    ],
    reviews: [
      {
        id: 'rev-21',
        userName: 'Julian Vance',
        rating: 5,
        date: '2026-07-27',
        title: 'Essential summer staple',
        review: 'Keeps me cool in hot weather and looks effortless with sleeves rolled up.',
        verified: true
      }
    ],
    featured: true,
    tags: ['Linen', 'Fashion', 'Shirt', 'Summer']
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'SAVE10',
    discountPercent: 10,
    description: '10% OFF on all items across NOVA MART',
    minSpend: 20
  },
  {
    code: 'WELCOME20',
    discountPercent: 20,
    maxDiscount: 50,
    description: '20% OFF for new customers (Up to $50 savings)',
    minSpend: 50
  },
  {
    code: 'FREESHIP',
    discountPercent: 100, // Special flag for free shipping discount
    description: 'Free Express Shipping on your order',
    minSpend: 0
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'NM-2026-10482',
    date: '2026-08-07T14:22:00.000Z',
    customerName: 'Alex Rivers',
    customerEmail: 'alex.rivers@example.com',
    status: 'Out for Delivery',
    items: [
      {
        productId: 'prod-1',
        productName: 'Apex Pro Wireless Noise-Canceling Headphones',
        productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
        selectedColor: 'Matte Black',
        quantity: 1,
        price: 249.99
      },
      {
        productId: 'prod-17',
        productName: 'Minimalist Slim RFID Blocking Leather Wallet',
        productImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
        selectedColor: 'Jet Black',
        quantity: 1,
        price: 39.99
      }
    ],
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Alex Rivers',
      addressLine1: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'IL',
      postalCode: '62704',
      country: 'United States',
      phone: '+1 (555) 019-2834',
      isDefault: true
    },
    paymentMethod: 'Credit Card (**** 4242)',
    subtotal: 289.98,
    discount: 28.99,
    shipping: 0,
    tax: 20.88,
    total: 281.87,
    couponCode: 'SAVE10',
    estimatedDelivery: '2026-08-10',
    trackingNumber: 'TRK-9823019842-US',
    carrier: 'FedEx Express'
  },
  {
    id: 'ord-1002',
    orderNumber: 'NM-2026-09821',
    date: '2026-07-28T10:15:00.000Z',
    customerName: 'Sophia Chen',
    customerEmail: 'sophia.c@example.com',
    status: 'Delivered',
    items: [
      {
        productId: 'prod-6',
        productName: 'Botanical Luminous Facial Skincare Ritual Set',
        productImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
        quantity: 2,
        price: 79.99
      }
    ],
    shippingAddress: {
      id: 'addr-2',
      fullName: 'Sophia Chen',
      addressLine1: '100 Market St Suite 400',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'United States',
      phone: '+1 (555) 234-5678'
    },
    paymentMethod: 'PayPal',
    subtotal: 159.98,
    discount: 0,
    shipping: 10,
    tax: 12.80,
    total: 182.78,
    estimatedDelivery: '2026-07-31',
    trackingNumber: 'TRK-4412091832-US',
    carrier: 'UPS Ground'
  }
];

export const DEMO_USER: User = {
  id: 'usr-1',
  name: 'Alex Rivers',
  email: 'alex.rivers@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  role: 'user',
  phone: '+1 (555) 019-2834',
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Alex Rivers',
      addressLine1: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'IL',
      postalCode: '62704',
      country: 'United States',
      phone: '+1 (555) 019-2834',
      isDefault: true
    }
  ]
};

export const DEMO_ADMIN: User = {
  id: 'adm-1',
  name: 'Nova Admin',
  email: 'admin@novamart.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  role: 'admin',
  phone: '+1 (800) 555-NOVA',
  addresses: []
};
