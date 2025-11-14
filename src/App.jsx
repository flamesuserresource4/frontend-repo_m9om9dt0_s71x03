import React, { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, Html, PresentationControls, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const GOLD = '#C4973A'
const DEEP_GOLD = '#A07B2A'
const DARK = '#0F0F10'
const CREAM = '#F7F3E9'
const GLASS = 'rgba(255,255,255,0.06)'

function DishModel(props){
  const { scene } = useGLTF('/models/dish.glb')
  return <primitive object={scene} {...props} />
}

function Hero3D(){
  return (
    <div className="relative h-[90vh] w-full">
      <Canvas camera={{ position: [0, 1.2, 2.2], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={[DARK]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[3, 5, 2]} angle={0.35} penumbra={0.8} intensity={2.2} color={GOLD} />
        <spotLight position={[-3, 5, -2]} angle={0.35} penumbra={0.8} intensity={1.6} color={DEEP_GOLD} />
        <Suspense fallback={null}>
          <PresentationControls global polar={[0, 0.2]} azimuth={[-0.4, 0.4]}>
            <Float rotationIntensity={0.2} floatIntensity={0.4}>
              <DishModel scale={1.2} />
            </Float>
          </PresentationControls>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/60 via-transparent to-[#0B0B0B]/20" />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="pointer-events-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10 text-center" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.35)'}}>
          <p className="tracking-[0.3em] text-[12px] sm:text-xs text-[#F7F3E9]/80 mb-3">FINE DINING</p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl leading-tight text-[--cream]" style={{ color: CREAM }}>
            Singh Saab — Where Tradition Meets Elegance
          </h1>
          <p className="mt-4 text-[--cream]/80 text-sm sm:text-base" style={{ color: 'rgba(247,243,233,0.85)'}}>
            Taste. Heritage. Craft.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#menu" className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[--gold] text-black font-medium hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[--gold]" style={{ backgroundColor: GOLD }}>
              View Menu
            </a>
            <a href="#reserve" className="inline-flex items-center justify-center rounded-full px-6 py-3 border border-white/20 text-[--cream] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40">
              Reserve Table
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ id, title, subtitle, children }){
  return (
    <section id={id} className="relative py-16 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-[--cream]" style={{ color: CREAM }}>{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-white/60">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

function About(){
  return (
    <Section id="about" title="Our Story" subtitle="At Singh Saab, we honour timeless recipes with a modern touch—curated seasonal menus, impeccable hospitality, and unforgettable dining moments.">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-white/80 leading-relaxed">
            Rooted in North Indian heritage and elevated with contemporary craft, Singh Saab celebrates slow-fire tandoors, fragrant spices, and seasonal produce. Our chef-led kitchen pairs tradition with modern technique, creating plates that feel both nostalgic and new.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="aspect-square rounded-xl border border-white/10 bg-gradient-to-br from-[#1a1a1b] to-[#0c0c0c] relative overflow-hidden">
          <Canvas camera={{ position: [0,0,2.2], fov: 40 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[2,2,2]} intensity={2} color={GOLD} />
            <Suspense fallback={null}>
              <Float>
                <mesh castShadow>
                  <icosahedronGeometry args={[0.8, 1]} />
                  <meshStandardMaterial color={DEEP_GOLD} metalness={0.8} roughness={0.2} />
                </mesh>
              </Float>
            </Suspense>
          </Canvas>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 text-white/80 text-sm">Chef-crafted excellence</div>
        </motion.div>
      </div>
    </Section>
  )
}

const MENU = [
  { category: 'Starters', name: 'Truffle Paneer Tikka', description: 'Charred cottage cheese, black truffle, pistachio ash', price: 14.5, image_url: '/images/dish1.jpg', is_signature: true },
  { category: 'Mains', name: 'Lamb Rogan Josh', description: 'Slow-braised Kashmiri chili, saffron, pearl onion', price: 26, image_url: '/images/dish2.jpg' },
  { category: 'Desserts', name: 'Saffron Kulfi', description: 'Sicilian pistachio, rose petal, almond praline', price: 10, image_url: '/images/dish3.jpg' },
  { category: 'Drinks', name: 'Cardamom Old Fashioned', description: 'Single malt, jaggery syrup, cardamom bitters', price: 12, image_url: '/images/dish4.jpg' },
]

function Menu(){
  const categories = useMemo(()=>['Starters','Mains','Desserts','Drinks'],[])
  return (
    <Section id="menu" title="Menu" subtitle="Signature plates and seasonal specials">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map(cat => (
          <div key={cat} className="col-span-1">
            <h3 className="text-white/80 mb-3 font-medium tracking-wide">{cat}</h3>
            <div className="space-y-4">
              {MENU.filter(m=>m.category===cat).map(item => (
                <motion.button key={item.name} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="group w-full text-left rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-[rgba(196,151,58,0.6)]">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-lg">
                      <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[--cream]" style={{ color: CREAM }}>{item.name}</p>
                        <p className="text-white/70">${item.price.toFixed(2)}</p>
                      </div>
                      <p className="text-white/60 text-sm">{item.description}</p>
                      <div className="mt-2 flex gap-2">
                        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-white/10 text-white/80">Add to Order</span>
                        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs border border-white/20 text-white/80">Enquire</span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Gallery(){
  return (
    <Section id="gallery" title="Gallery" subtitle="A glimpse into our kitchen and room">
      <div className="grid sm:grid-cols-3 gap-4">
        {['dish1','dish2','dish3','interior1','interior2','team'].map((k,i)=>(
          <motion.div key={k} className="aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5" whileHover={{ scale: 1.02 }}>
            <img src={`/images/${(i%3)+1}.jpg`} alt={k} className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Reservations(){
  return (
    <Section id="reserve" title="Reservations" subtitle="Book your table in seconds">
      <form className="grid sm:grid-cols-2 gap-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <input required aria-label="Date" type="date" className="rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
        <input required aria-label="Time" type="time" className="rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
        <input required aria-label="Party Size" type="number" min="1" max="20" placeholder="Party Size" className="rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
        <input required aria-label="Full Name" placeholder="Full Name" className="rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
        <input required aria-label="Email" type="email" placeholder="Email" className="rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
        <input aria-label="Phone" placeholder="Phone" className="rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
        <textarea aria-label="Notes" placeholder="Occasion / Notes" className="sm:col-span-2 h-24 rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
        <button className="sm:col-span-2 mt-2 rounded-full bg-[--gold] px-6 py-3 font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--gold] focus:ring-offset-black" style={{ backgroundColor: GOLD }}>Reserve Table</button>
      </form>
      <p className="mt-3 text-sm text-white/60">If your preferred time is unavailable, we will follow up with alternatives.</p>
    </Section>
  )
}

function Events(){
  return (
    <Section id="events" title="Private Events & Catering" subtitle="Intimate celebrations, corporate evenings, and bespoke catering">
      <form className="grid sm:grid-cols-2 gap-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <input required placeholder="Full Name" className="rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
        <input required type="email" placeholder="Email" className="rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
        <input placeholder="Phone" className="rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
        <select className="rounded-md bg-black/40 border border-white/10 p-3 text-white/90">
          <option>Private Dining</option>
          <option>Catering</option>
          <option>Corporate</option>
          <option>Wedding</option>
          <option>Other</option>
        </select>
        <input placeholder="Preferred Date" type="date" className="rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
        <input placeholder="Guests" type="number" min="1" max="200" className="rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
        <textarea placeholder="Tell us more" className="sm:col-span-2 h-24 rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
        <button className="sm:col-span-2 mt-2 rounded-full bg-[--gold] px-6 py-3 font-medium text-black" style={{ backgroundColor: GOLD }}>Request Proposal</button>
      </form>
    </Section>
  )
}

function Testimonials(){
  const reviews = [
    { name: 'Arjun', quote: 'Exquisite flavours and flawless service.', rating: 5 },
    { name: 'Mira', quote: 'A modern ode to tradition—unforgettable.', rating: 5 },
    { name: 'Daniel', quote: 'Ambience, craft, and taste in harmony.', rating: 4 },
  ]
  return (
    <Section id="testimonials" title="Testimonials" subtitle="What our guests say">
      <div className="grid sm:grid-cols-3 gap-4">
        {reviews.map((r, i)=> (
          <motion.div key={i} whileHover={{ y:-4 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-[--gold]" style={{ color: GOLD }}>{'★'.repeat(r.rating)}<span className="text-white/40">{'★'.repeat(5 - r.rating)}</span></div>
            <p className="mt-3 text-white/80 italic">“{r.quote}”</p>
            <p className="mt-2 text-white/60">— {r.name}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Contact(){
  return (
    <Section id="contact" title="Contact & Location" subtitle="We’re in the heart of the city">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-white/80">Hours: Tue–Sun, 12:00–23:00</p>
          <p className="text-white/80 mt-2">Phone: +44 20 1234 5678</p>
          <p className="text-white/80">Email: reservations@singhsaab.com</p>
          <div className="mt-4 aspect-video rounded-lg overflow-hidden">
            <iframe title="Map" className="h-full w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=London&output=embed" />
          </div>
        </div>
        <form className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <input placeholder="Name" className="mb-3 w-full rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
          <input type="email" placeholder="Email" className="mb-3 w-full rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
          <textarea placeholder="Message" className="mb-3 h-24 w-full rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
          <button className="rounded-full bg-[--gold] px-6 py-3 font-medium text-black" style={{ backgroundColor: GOLD }}>Send</button>
        </form>
      </div>
    </Section>
  )
}

function Footer(){
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[--cream]" style={{ color: CREAM }}>
          <div className="text-xl font-serif">Singh Saab</div>
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} Singh Saab. All rights reserved.</p>
        </div>
        <form className="flex gap-2">
          <input placeholder="Newsletter email" type="email" className="rounded-md bg-black/40 border border-white/10 p-3 text-white/90" />
          <button className="rounded-md bg-[--gold] px-4 font-medium text-black" style={{ backgroundColor: GOLD }}>Subscribe</button>
        </form>
      </div>
    </footer>
  )
}

export default function App(){
  return (
    <div style={{ background: `radial-gradient(1200px 600px at 80% -20%, rgba(196,151,58,0.08), transparent), radial-gradient(900px 400px at 10% 10%, rgba(160,123,42,0.06), transparent)`, backgroundColor: DARK }} className="min-h-screen text-white">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="font-serif text-xl" style={{ color: CREAM }}>Singh Saab</a>
          <nav className="hidden sm:flex gap-6 text-sm text-white/80">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#menu" className="hover:text-white">Menu</a>
            <a href="#gallery" className="hover:text-white">Gallery</a>
            <a href="#reserve" className="hover:text-white">Reservations</a>
            <a href="#events" className="hover:text-white">Events</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <a href="#reserve" className="rounded-full bg-[--gold] px-4 py-2 text-black font-medium" style={{ backgroundColor: GOLD }}>Reserve</a>
        </div>
      </header>
      <main>
        <Hero3D />
        <About />
        <Menu />
        <Gallery />
        <Reservations />
        <Events />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

useGLTF.preload('/models/dish.glb')
