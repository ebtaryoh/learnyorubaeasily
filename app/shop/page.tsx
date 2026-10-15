'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingBag,
  Sparkles,
  Check,
  Globe,
  Truck,
  Download,
  Star,
  X,
  ChevronRight,
  ShieldCheck,
  MessageCircle,
  HelpCircle,
  BookOpen,
  Heart
} from 'lucide-react'
import { fadeUpVariants, staggerContainer, DURATION, EASING } from '@/lib/animations'

// --- CURRENCY CONFIG ---
type Currency = 'USD' | 'GBP' | 'EUR' | 'NGN'

const currencyRates: Record<Currency, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)' },
  GBP: { symbol: '£', rate: 0.80, label: 'GBP (£)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  NGN: { symbol: '₦', rate: 1350, label: 'NGN (₦)' }
}

// --- PRODUCT TYPES ---
type Category = 'all' | 'learning' | 'apparel' | 'headwear' | 'lifestyle' | 'digital'

interface Product {
  id: string
  name: string
  yorubaName?: string
  category: Category
  priceUSD: number
  rating: number
  reviewCount: number
  badge?: string
  isDigital?: boolean
  image: string
  shortDesc: string
  description: string
  features: string[]
  sizes?: string[]
  colors?: { name: string; hex: string }[]
  fulfillmentNote: string
}

const products: Product[] = [
  {
    id: 'heritage-tee',
    name: '“Ọmọ Yorùbá Ni Mí” Premium Heavyweight Tee',
    yorubaName: 'Ọmọ Yorùbá Ni Mí',
    category: 'apparel',
    priceUSD: 32,
    rating: 5.0,
    reviewCount: 38,
    badge: 'Best Seller',
    image: '/shop/yoruba-heritage-tee.jpg',
    shortDesc: 'Luxury heavyweight ring-spun organic cotton with minimalist gold Yorùbá typography.',
    description: 'A signature statement of cultural identity and ancestral pride. Crafted from ultra-soft 240 GSM organic cotton with precise tonal accents. Worn by learners, diaspora leaders, and cultural ambassadors worldwide.',
    features: [
      '100% Organic Ring-Spun Combed Cotton (240 GSM)',
      'Accurate tone marks: Ọmọ Yorùbá Ni Mí',
      'Pre-shrunk luxury unisex fit with reinforced collar',
      'Dispatched locally from US, UK & EU fulfillment hubs'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: [
      { name: 'Forest Green', hex: '#19352b' },
      { name: 'Onyx Black', hex: '#111827' },
      { name: 'Warm Cream', hex: '#f4ede2' }
    ],
    fulfillmentNote: 'Dispatched locally from US, UK, Canada & EU centers. Arrives in 3–5 business days.'
  },
  {
    id: 'alphabet-poster',
    name: 'Yorùbá Alphabet & Tone Master Wall Art Poster',
    yorubaName: 'Àkójọpọ̀ Álífábẹ́ẹ̀tì Yorùbá',
    category: 'learning',
    priceUSD: 24,
    rating: 4.9,
    reviewCount: 52,
    badge: 'Popular for Kids & Classrooms',
    image: '/shop/yoruba-alphabet-poster.jpg',
    shortDesc: 'Vibrant museum-grade educational poster showing all 25 letters, tone indicators & illustrated cultural words.',
    description: 'Transform your children’s bedroom, study corner, or home classroom. Features the complete 25-letter Yorùbá alphabet (including Ẹ, Ọ, GB, Ṣ) with authentic illustrations like Àgùntàn, Gángan, and Fìlà.',
    features: [
      'Museum-grade 200 GSM thick archival matte paper',
      'Available in standard framing sizes (18x24" / A2)',
      'Accurate high/mid/low tone accents on every word',
      'Includes high-resolution digital printable copy upon purchase'
    ],
    sizes: ['Digital Printable (Instant)', '12x18 in (Art Print)', '18x24 in (Standard Poster)', '24x36 in (Large Classroom)'],
    fulfillmentNote: 'Printed on demand locally in US, UK, Canada & EU, or download instantly.'
  },
  {
    id: 'embroidered-cap',
    name: '“YORÙBÁ” Minimalist Embroidered Heritage Cap',
    yorubaName: 'Fìlà YORÙBÁ',
    category: 'headwear',
    priceUSD: 28,
    rating: 5.0,
    reviewCount: 41,
    badge: 'Staff Favorite',
    image: '/shop/yoruba-embroidered-cap.jpg',
    shortDesc: 'Vintage washed cotton dad hat with raised metallic gold 3D embroidery.',
    description: 'Understated, modern, and proud. Features clean custom embroidery with proper Yorùbá tone marks (YÒRÙBÁ). Equipped with an antique brass buckle for all-day comfort and effortless streetwear style.',
    features: [
      '100% Washed Vintage Chino Cotton Twill',
      'High-density 3D gold thread embroidery',
      'Adjustable antique brass buckle strap (Unisex One Size)',
      'Curved brim with moisture-wicking inner headband'
    ],
    sizes: ['One Size (Adjustable Strap)'],
    colors: [
      { name: 'Washed Black', hex: '#1c1c1c' },
      { name: 'Olive Forest', hex: '#2d3b2d' },
      { name: 'Stone Khaki', hex: '#c5b8a5' }
    ],
    fulfillmentNote: 'Ships directly from US & UK local fulfillment centers in 2–4 business days.'
  },
  {
    id: 'flashcards-kit',
    name: 'Illustrated Yorùbá Flashcards Starter Deck (50 Cards)',
    yorubaName: 'Àwọn Káàdì Ẹ̀kọ́ Yorùbá',
    category: 'learning',
    priceUSD: 29,
    rating: 5.0,
    reviewCount: 64,
    badge: 'Recommended for Families',
    image: '/shop/yoruba-flashcards-kit.jpg',
    shortDesc: '50 thick, spill-resistant cards with colorful illustrations, phonetic pronunciation & audio QR codes.',
    description: 'The fastest, most playful way for children and adult beginners to memorize essential Yorùbá vocabulary. Covers Animals (Erin, Kìnìún), Family (Bàbá, Ìyá), Everyday Food, Numbers, and Greeting rituals.',
    features: [
      '50 heavy 350 GSM matte laminated cards (water & tear-resistant)',
      'Phonetic pronunciation breakdowns and tone markings on every card',
      'Includes custom sturdy storage tuck box',
      'Bonus: Scan QR code on each card to listen to native pronunciation!'
    ],
    sizes: ['Standard Physical Deck', 'Printable PDF Deck (Instant)'],
    fulfillmentNote: 'Shipped from UK & US centers. Free global shipping on orders over $60.'
  },
  {
    id: 'ceramic-morning-mug',
    name: '“Ẹ Káàárọ̀ o! ☕” Artisanal Heritage Ceramic Mug',
    yorubaName: 'Ife Ẹ Káàárọ̀',
    category: 'lifestyle',
    priceUSD: 22,
    rating: 4.8,
    reviewCount: 29,
    image: '/shop/yoruba-ceramic-mug.jpg',
    shortDesc: 'Cozy stoneware ceramic coffee & tea mug printed with the traditional Yorùbá morning blessing.',
    description: 'Start every morning connected to your roots. Featuring the beloved greeting “Ẹ Káàárọ̀ o!” (Good morning to you) in signature deep forest green. Perfect for home study desks and office coffee breaks.',
    features: [
      'Premium 12 oz (350 ml) heavy glazed ceramic stoneware',
      'Dishwasher safe and microwave safe durable print',
      'Ergonomic comfortable handle with curved lip design',
      'Safely packed in reinforced crash-tested gift packaging'
    ],
    sizes: ['12 oz Standard Mug', '15 oz Large Mug'],
    colors: [
      { name: 'Artisan Cream', hex: '#f7f4ee' },
      { name: 'Midnight Green', hex: '#19352b' }
    ],
    fulfillmentNote: 'Printed locally in the US, UK & EU for fast zero-breakage delivery.'
  },
  {
    id: 'proverb-tote-bag',
    name: '“Ká Rìn Ká Pọ̀” Heavyweight Organic Canvas Tote',
    yorubaName: 'Àpò Ká Rìn Ká Pọ̀',
    category: 'lifestyle',
    priceUSD: 25,
    rating: 4.9,
    reviewCount: 33,
    badge: 'Eco-Friendly',
    image: '/shop/yoruba-tote-bag.jpg',
    shortDesc: 'Durable 100% organic cotton tote displaying the famous ancestral communal proverb.',
    description: '“Ká rìn ká pọ̀, yíyẹ ní ń yẹ ni” — Walking together brings dignity and glory. Designed for grocery runs, laptops, Yorùbá class notebooks, and everyday errands with reinforced cross-stitched handles.',
    features: [
      'Heavyweight 12 oz 100% certified organic unbleached canvas',
      'Long comfortable shoulder straps (24 inches)',
      'Spacious main compartment (15" x 16" with 3" bottom gusset)',
      'High-detail eco-friendly water-based screen print'
    ],
    sizes: ['One Size (Large 15" x 16")'],
    fulfillmentNote: 'Shipped locally within US, UK, Canada & Europe.'
  }
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all')
  const [currency, setCurrency] = useState<Currency>('USD')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [cart, setCart] = useState<{ product: Product; size: string; color: string; qty: number }[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [addedNotice, setAddedNotice] = useState(false)

  // Filter products
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory)

  // Format price helper
  const formatPrice = (usd: number) => {
    const { symbol, rate } = currencyRates[currency]
    const converted = usd * rate
    if (currency === 'NGN') {
      return `${symbol}${converted.toLocaleString()}`
    }
    return `${symbol}${converted.toFixed(2)}`
  }

  // Open modal
  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product)
    setSelectedSize(product.sizes?.[0] || '')
    setSelectedColor(product.colors?.[0]?.name || '')
  }

  // Add to cart
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.size === selectedSize && item.color === selectedColor
      )
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].qty += 1
        return updated
      }
      return [...prev, { product, size: selectedSize, color: selectedColor, qty: 1 }]
    })
    setAddedNotice(true)
    setTimeout(() => setAddedNotice(false), 2000)
    setIsCartOpen(true)
  }

  // Calculate cart total
  const cartTotalUSD = cart.reduce((sum, item) => sum + item.product.priceUSD * item.qty, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  // Pre-fill WhatsApp message
  const generateWhatsAppOrderLink = () => {
    const itemsText = cart.map(item =>
      `• ${item.qty}x ${item.product.name} ${item.size ? `[Size: ${item.size}]` : ''} ${item.color ? `[Color: ${item.color}]` : ''} - ${formatPrice(item.product.priceUSD * item.qty)}`
    ).join('\n')

    const message = encodeURIComponent(
      `Hello LearnYorubaEasily! 🌿\n\nI would like to place an order from the Cultural Store:\n\n${itemsText}\n\nEstimated Total: ${formatPrice(cartTotalUSD)}\n\nPlease assist me with shipping and payment confirmation. Thank you!`
    )
    return `https://wa.me/2348185051113?text=${message}`
  }

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#19352b]">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-[#19352b]/10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#EAB308]/15 via-transparent to-transparent pointer-events-none" />
        
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 rounded-full bg-[#EAB308]/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#19352b]">
              <Sparkles className="size-3.5 text-[#EAB308]" /> Official Heritage & Student Store
            </motion.div>
            
            <motion.h1 variants={fadeUpVariants} className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight">
              Wear Your Culture. <br />
              <em className="text-[#EAB308] not-italic">Equip Your Journey.</em>
            </motion.h1>
            
            <motion.p variants={fadeUpVariants} className="mt-6 text-base sm:text-lg text-[#19352b]/75 leading-relaxed max-w-2xl">
              Authentic cultural apparel, children’s learning kits, and study essentials designed for diaspora learners and families. Fast local fulfillment across the US, UK, Canada, Europe, and Nigeria.
            </motion.p>
          </motion.div>

          {/* GLOBAL FULFILLMENT PROMISES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-[#19352b]/10"
          >
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#e6eee5] text-[#577565]">
                <Globe className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Dispatched Locally Worldwide</h2>
                <p className="mt-1 text-xs text-[#19352b]/65 leading-relaxed">
                  Printed in regional fulfillment hubs across the US, UK, Canada & EU. Arrives in 3–5 days with zero customs duties.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#e6eee5] text-[#577565]">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Accurate Ancestral Tones</h2>
                <p className="mt-1 text-xs text-[#19352b]/65 leading-relaxed">
                  Designed by certified native linguists with authentic Yorùbá diacritics and correct tone marks.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#e6eee5] text-[#577565]">
                <Download className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Instant Digital Kits</h2>
                <p className="mt-1 text-xs text-[#19352b]/65 leading-relaxed">
                  Printable posters and e-books are delivered straight to your email instantly with lifetime access.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STORE CONTROLS & CATALOG */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
          
          {/* FILTER BAR & CURRENCY SELECTOR */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-8 border-b border-[#19352b]/10">
            
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'learning', label: 'Kids & Study Kits' },
                { id: 'apparel', label: 'Heritage Apparel' },
                { id: 'headwear', label: 'Caps & Beanies' },
                { id: 'lifestyle', label: 'Lifestyle & Gifts' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as Category)}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#19352b] text-white shadow-sm'
                      : 'bg-white border border-[#19352b]/10 text-[#19352b]/70 hover:border-[#19352b]/30'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Currency selector & Cart Button */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 border border-[#19352b]/10 text-xs font-medium">
                <span className="text-[#19352b]/50">Currency:</span>
                {(['USD', 'GBP', 'EUR', 'NGN'] as Currency[]).map(curr => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`rounded-full px-2 py-0.5 text-xs font-bold transition-colors ${
                      currency === curr ? 'bg-[#EAB308] text-white' : 'text-[#19352b]/60 hover:text-[#19352b]'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>

              {/* Shopping bag trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 rounded-full bg-[#19352b] px-4 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
                aria-label="View shopping bag"
              >
                <ShoppingBag className="size-4" />
                <span>Bag</span>
                {cartCount > 0 && (
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#EAB308] text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col rounded-3xl bg-white border border-[#19352b]/10 overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                {/* Image Container */}
                <div
                  onClick={() => handleOpenProduct(product)}
                  className="relative aspect-square w-full cursor-pointer overflow-hidden bg-[#f4ede2]/40"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 rounded-full bg-[#19352b]/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                      {product.badge}
                    </span>
                  )}
                  {product.isDigital && (
                    <span className="absolute top-4 right-4 rounded-full bg-[#EAB308] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      ⚡ Instant Download
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-1.5 text-xs text-[#EAB308]">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-semibold text-[#19352b]">{product.rating}</span>
                    <span className="text-[#19352b]/40">({product.reviewCount})</span>
                  </div>

                  <h3
                    onClick={() => handleOpenProduct(product)}
                    className="mt-2 font-serif text-xl font-medium leading-snug cursor-pointer group-hover:text-[#EAB308] transition-colors"
                  >
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#19352b]/70 line-clamp-2 leading-relaxed">
                    {product.shortDesc}
                  </p>

                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-[#19352b]/10">
                    <div>
                      <span className="text-xs text-[#19352b]/50 block">Price</span>
                      <span className="text-lg font-bold font-mono text-[#19352b]">
                        {formatPrice(product.priceUSD)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenProduct(product)}
                      className="rounded-full bg-[#19352b]/5 px-4 py-2 text-xs font-bold text-[#19352b] transition-all hover:bg-[#19352b] hover:text-white"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* DIASPORA FULFILLMENT FAQ SECTION */}
          <div className="mt-20 rounded-3xl bg-[#19352b] text-white p-8 sm:p-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAB308]/20 px-3 py-1 text-xs font-bold text-[#EAB308] uppercase tracking-wider">
                <Truck className="size-3.5" /> Worldwide Fulfillment Guide
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-white">
                How does shipping work to the diaspora?
              </h2>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">
                Whether you live in London, Toronto, Houston, Atlanta, or Dublin, here is how our store delivers smoothly to your doorstep:
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 pt-8 border-t border-white/10">
              <div>
                <h3 className="font-semibold text-sm text-[#EAB308]">1. Printed in Regional Centers</h3>
                <p className="mt-1 text-xs text-white/70 leading-relaxed">
                  We route orders directly to local print facilities in the US, UK, Canada, and EU. Your items do not face cross-border shipping delays.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-[#EAB308]">2. Zero Customs & Import Fees</h3>
                <p className="mt-1 text-xs text-white/70 leading-relaxed">
                  Because merchandise is produced inside your region (e.g. Royal Mail in the UK, USPS in America), there are no surprise customs taxes upon delivery.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-[#EAB308]">3. Concierge WhatsApp Support</h3>
                <p className="mt-1 text-xs text-white/70 leading-relaxed">
                  Need a custom family bundle or specific kids size? Message our dedicated WhatsApp team anytime for personal sizing assistance.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PRODUCT QUICK VIEW MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-10 shadow-2xl border border-[#19352b]/10"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full bg-[#19352b]/5 text-[#19352b]/60 hover:bg-[#19352b]/10 transition-colors"
                aria-label="Close dialog"
              >
                <X className="size-5" />
              </button>

              <div className="grid gap-8 sm:grid-cols-2 items-start">
                
                {/* Product Image */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#f4ede2]/40 border border-[#19352b]/10">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Info */}
                <div className="space-y-5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#EAB308]">
                      {selectedProduct.category}
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-semibold leading-tight text-[#19352b]">
                      {selectedProduct.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-2xl font-bold font-mono text-[#19352b]">
                        {formatPrice(selectedProduct.priceUSD)}
                      </span>
                      <span className="text-xs text-[#577565] font-medium bg-[#e6eee5] px-2.5 py-0.5 rounded-full">
                        In Stock
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#19352b]/75 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Size Selector */}
                  {selectedProduct.sizes && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span>Select Size / Format</span>
                        <span className="text-[#19352b]/50">Unisex Standard</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map(sz => (
                          <button
                            key={sz}
                            onClick={() => setSelectedSize(sz)}
                            className={`rounded-xl px-3.5 py-2 text-xs font-semibold border transition-all ${
                              selectedSize === sz
                                ? 'bg-[#19352b] text-white border-[#19352b]'
                                : 'bg-[#f8f6f0] text-[#19352b] border-[#19352b]/15 hover:border-[#19352b]/40'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color Selector */}
                  {selectedProduct.colors && (
                    <div className="space-y-2">
                      <span className="text-xs font-semibold block">Color: {selectedColor}</span>
                      <div className="flex items-center gap-2">
                        {selectedProduct.colors.map(col => (
                          <button
                            key={col.name}
                            onClick={() => setSelectedColor(col.name)}
                            title={col.name}
                            className={`size-7 rounded-full border-2 transition-transform ${
                              selectedColor === col.name ? 'scale-110 border-[#EAB308]' : 'border-transparent hover:scale-105'
                            }`}
                            style={{ backgroundColor: col.hex }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Highlights */}
                  <div className="rounded-2xl bg-[#f8f6f0] p-4 text-xs space-y-2 border border-[#19352b]/10">
                    <span className="font-semibold block text-[#19352b]">Key Features:</span>
                    <ul className="space-y-1.5 text-[#19352b]/75">
                      {selectedProduct.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="size-3.5 text-[#EAB308] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-3 pt-2">
                    <button
                      onClick={() => handleAddToCart(selectedProduct)}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#19352b] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#19352b]/90 shadow-md"
                    >
                      <ShoppingBag className="size-4" /> Add to Shopping Bag
                    </button>

                    <a
                      href={`https://wa.me/2348185051113?text=${encodeURIComponent(
                        `Hello! I'm interested in ordering the "${selectedProduct.name}" ${selectedSize ? `(Size: ${selectedSize})` : ''} ${selectedColor ? `(Color: ${selectedColor})` : ''} from the LearnYorubaEasily store.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#19352b]/20 py-3 text-xs font-semibold text-[#19352b] hover:bg-[#19352b]/5 transition-colors"
                    >
                      <MessageCircle className="size-4 text-[#25D366]" /> Order / Inquire via WhatsApp
                    </a>
                  </div>

                  <p className="text-[11px] text-[#19352b]/50 text-center">
                    {selectedProduct.fulfillmentNote}
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SHOPPING BAG DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="flex flex-col h-full w-full max-w-md bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#19352b]/10 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="size-5 text-[#19352b]" />
                  <h2 className="font-serif text-xl font-bold">Your Bag</h2>
                  <span className="text-xs bg-[#EAB308]/20 text-[#19352b] px-2 py-0.5 rounded-full font-bold">
                    {cartCount}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-full p-2 text-[#19352b]/50 hover:bg-[#19352b]/5"
                  aria-label="Close bag"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="size-16 rounded-full bg-[#f8f6f0] flex items-center justify-center text-[#19352b]/30 mb-4">
                      <ShoppingBag className="size-8" />
                    </div>
                    <p className="font-serif text-lg font-medium">Your bag is empty</p>
                    <p className="text-xs text-[#19352b]/50 mt-1 max-w-[200px]">
                      Explore our heritage tees, learning flashcards, and student posters.
                    </p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-3 rounded-2xl bg-[#f8f6f0]/60 border border-[#19352b]/5"
                    >
                      <div className="relative size-16 shrink-0 rounded-xl overflow-hidden bg-white">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold truncate text-[#19352b]">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-[#19352b]/60 mt-0.5">
                          {item.size ? `Size: ${item.size}` : ''} {item.color ? `• ${item.color}` : ''}
                        </p>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span className="font-mono font-bold">
                            {formatPrice(item.product.priceUSD * item.qty)}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#19352b]/60">Qty: {item.qty}</span>
                            <button
                              onClick={() => {
                                setCart(prev => prev.filter((_, i) => i !== idx))
                              }}
                              className="text-red-500 hover:text-red-700 text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t border-[#19352b]/10 pt-4 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#19352b]/70 font-medium">Subtotal</span>
                    <span className="font-mono text-lg font-bold">{formatPrice(cartTotalUSD)}</span>
                  </div>

                  <p className="text-[11px] text-[#19352b]/60 leading-tight">
                    📦 Shipping is calculated at checkout based on your destination in the US, UK, Canada, or EU.
                  </p>

                  <a
                    href={generateWhatsAppOrderLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-white shadow-md hover:bg-[#20ba59] transition-colors"
                  >
                    <MessageCircle className="size-4" /> Checkout via WhatsApp Concierge
                  </a>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full text-center text-xs text-[#19352b]/60 hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
