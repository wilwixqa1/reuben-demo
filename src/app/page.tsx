"use client";

import Image from "next/image";
import { useState } from "react";

const PHONE = "(347) 724-2733";
const PHONE_LINK = "tel:+13477242733";
const SMS_LINK = "sms:+13477242733";
const EMAIL = "greentreo@aol.com";

const SALES = [
  { price: "$660,000", beds: 3, baths: 3, sqft: "", side: "Seller", addr: "36 Ozark Street", town: "Ronkonkoma, NY 11779", img: "/house1.jpg" },
  { price: "$1,300,000", beds: 3, baths: 3, sqft: "", side: "Seller", addr: "22-66 Crescent Street", town: "Long Island City, NY 11105", img: "/house2.jpg" },
  { price: "$570,000", beds: 3, baths: 2, sqft: "", side: "Buyer", addr: "246 Woodlawn Avenue", town: "Saint James, NY 11780", img: "/house3.jpg" },
  { price: "$555,000", beds: 2, baths: 2, sqft: "1,040", side: "Buyer", addr: "88 Whalers Cove Dr", town: "Babylon, NY 11702", img: "/house4.jpg" },
  { price: "$175,000", beds: 1, baths: 1, sqft: "710", side: "Seller", addr: "2821 Kings Hwy #4L", town: "Brooklyn, NY 11229", img: "/house5.jpg" },
];

const COMMUNITIES = [
  { name: "Ronkonkoma", median: "~$485k", schools: "Sachem / Connetquot" },
  { name: "Lake Ronkonkoma", median: "~$510k", schools: "Sachem" },
  { name: "Holbrook", median: "~$465k", schools: "Sachem" },
  { name: "Bohemia", median: "~$475k", schools: "Connetquot" },
  { name: "Centereach", median: "~$490k", schools: "Middle Country" },
  { name: "Farmingville", median: "~$500k", schools: "Sachem" },
  { name: "Hauppauge", median: "~$560k", schools: "Hauppauge" },
  { name: "Patchogue", median: "~$440k", schools: "Patchogue-Medford" },
  { name: "Sayville", median: "~$540k", schools: "Sayville" },
  { name: "Saint James", median: "~$580k", schools: "Smithtown" },
  { name: "Babylon", median: "~$520k", schools: "Babylon" },
  { name: "Queens", median: "All areas", schools: "NYC" },
];

const REVIEWS = [
  { text: "We were able to sell our house in 6 days at 10% over the listing price. His knowledge of the local market was the main reason we had over 60 showings in 6 days. Ruben always picked up the phone and always got back to us right away. It\u2019s too bad Zillow only allows 5 stars because he deserves 10.", source: "Zillow", featured: true },
  { text: "Helped me with my first home purchase. He was very patient with me since I\u2019m the type of person that has a million questions. He was there every step of the way from start to closing. Top broker in Long Island.", source: "Zillow", featured: false },
  { text: "If you are in the market for a house or a rental look no further. His professionalism and responsiveness is unparalleled. We plan on buying in a few years and I wouldn\u2019t even consider another realtor.", source: "Zillow", featured: false },
  { text: "Ruben did a great job pressing on despite many challenges. He worked with the buyers to find solutions that worked for both parties. I got the best deal possible.", source: "Annjanette B., Sound Beach", featured: false },
];

const PhoneIcon = () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const TextIcon = () => (<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>);
const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);

function parseMoney(s: string) { return parseFloat(s.replace(/[^0-9.]/g, "")) || 0; }
function fmt(n: number) { return "$" + Math.round(n).toLocaleString("en-US"); }

function MortgageCalc() {
  const [hp, setHp] = useState("450,000");
  const [dp, setDp] = useState("90,000");
  const [ir, setIr] = useState("6.75");
  const [lt, setLt] = useState("30");
  const [pt, setPt] = useState("9,900");
  const [hi, setHi] = useState("1,800");
  const principal = parseMoney(hp) - parseMoney(dp);
  const mr = parseMoney(ir) / 100 / 12;
  const n = parseInt(lt) * 12;
  const monthly = mr === 0 ? principal / n : principal * (mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1);
  const taxM = parseMoney(pt) / 12;
  const insM = parseMoney(hi) / 12;
  const total = monthly + taxM + insM;
  const totalInterest = monthly * n - principal;
  const inputCls = "w-full px-4 py-3 rounded-lg border border-[#ddd8d0] bg-[#f4f0eb] text-[#2c3038] focus:border-[#c2956b] focus:bg-white outline-none transition";
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-4">
        {[{l:"Home price",v:hp,s:setHp},{l:"Down payment",v:dp,s:setDp},{l:"Interest rate (%)",v:ir,s:setIr}].map(f=>(<div key={f.l}><label className="block text-xs font-semibold text-[#6b7180] mb-1">{f.l}</label><input className={inputCls} value={f.v} onChange={e=>f.s(e.target.value)}/></div>))}
        <div><label className="block text-xs font-semibold text-[#6b7180] mb-1">Loan term</label><select className={inputCls} value={lt} onChange={e=>setLt(e.target.value)}><option value="30">30 years</option><option value="20">20 years</option><option value="15">15 years</option></select></div>
        {[{l:"Annual property tax ($)",v:pt,s:setPt},{l:"Annual insurance ($)",v:hi,s:setHi}].map(f=>(<div key={f.l}><label className="block text-xs font-semibold text-[#6b7180] mb-1">{f.l}</label><input className={inputCls} value={f.v} onChange={e=>f.s(e.target.value)}/></div>))}
      </div>
      <div className="bg-[#1a2332] text-white rounded-2xl p-8 self-start">
        <p className="text-sm text-white/50 mb-1">Estimated total monthly payment</p>
        <p className="font-serif text-5xl mb-8">{fmt(total)}</p>
        {[["Principal & interest",fmt(monthly)],["Property tax",fmt(taxM)],["Insurance",fmt(insM)],["Loan amount",fmt(principal)],["Total interest",fmt(totalInterest)]].map(([l,v])=>(<div key={l} className="flex justify-between py-3 border-b border-white/[0.06] last:border-0 text-sm"><span className="text-white/50">{l}</span><span className="font-semibold">{v}</span></div>))}
        <p className="text-[11px] text-white/30 mt-5 leading-relaxed">Estimates only. Actual payment depends on credit, lender terms, and tax assessment. I can connect you with a loan officer for pre-qualification.</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ["Recent Sales","Communities","About","Sell Your Home","Calculator","Contact"];
  const inputCls = "w-full px-4 py-3 rounded-lg border border-[#ddd8d0] bg-[#f4f0eb] text-sm focus:border-[#c2956b] focus:bg-white outline-none";
  return (<>
    {/* HEADER */}
    <header className="sticky top-0 z-50 bg-white border-b border-[#ddd8d0]">
      <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between">
        <a href="#" className="font-serif italic text-xl text-[#1a2332]">Ruben Yosopov</a>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(i=>(<a key={i} href={`#${i.toLowerCase().replace(/ /g,"-")}`} className="text-sm font-medium text-[#6b7180] hover:text-[#1a2332] transition">{i}</a>))}
          <a href={PHONE_LINK} className="bg-[#3d6b52] text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-[#2e5440] transition">Call Ruben</a>
        </nav>
        <button className="md:hidden p-1" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Menu">
          <svg className="w-6 h-6 stroke-[#1a2332]" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            {menuOpen?<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>:<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>
      {menuOpen&&(<nav className="md:hidden bg-white border-b border-[#ddd8d0] px-6 pb-4 space-y-1">{navItems.map(i=>(<a key={i} href={`#${i.toLowerCase().replace(/ /g,"-")}`} onClick={()=>setMenuOpen(false)} className="block py-3 text-[#2c3038] font-medium border-b border-[#ddd8d0] last:border-0">{i}</a>))}<a href={PHONE_LINK} className="block py-3 text-[#3d6b52] font-semibold">Call {PHONE}</a></nav>)}
    </header>

    {/* HERO */}
    <section className="relative bg-[#1a2332] overflow-hidden">
      <Image src="/hero.jpg" alt="Suffolk County home" fill className="object-cover opacity-25" priority/>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-[1fr_380px] gap-12 items-center">
        <div className="text-white">
          <span className="inline-block text-xs font-semibold text-[#c2956b] tracking-wider border border-[#c2956b]/30 px-4 py-1.5 rounded-full mb-6">Suffolk County & Queens</span>
          <h1 className="font-serif text-4xl md:text-[3.4rem] leading-[1.08] mb-5">Find your next home with someone who <em className="italic text-[#d4ae88]">actually lives here.</em></h1>
          <p className="text-lg text-white/60 max-w-md leading-relaxed mb-8">16 years, 205+ transactions, and an agent who picks up the phone. Every listing on the Long Island MLS.</p>
          <div className="flex flex-wrap gap-3">
            <a href={PHONE_LINK} className="inline-flex items-center gap-2 bg-[#3d6b52] text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-[#2e5440] transition active:scale-[0.97]"><PhoneIcon/>Call {PHONE}</a>
            <a href={SMS_LINK} className="inline-flex items-center gap-2 border border-white/25 text-white px-6 py-3.5 rounded-lg font-semibold hover:border-white/50 transition active:scale-[0.97]"><TextIcon/>Text me</a>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-2xl">
          <h3 className="font-serif text-lg text-[#1a2332] mb-4">Search properties</h3>
          <div className="space-y-2.5">
            <select className={inputCls} defaultValue=""><option value="" disabled>Community</option>{COMMUNITIES.map(c=><option key={c.name}>{c.name}</option>)}</select>
            <div className="grid grid-cols-2 gap-2.5"><select className={inputCls} defaultValue=""><option value="" disabled>Min price</option>{["$200K","$300K","$400K","$500K","$600K","$750K","$1M"].map(p=><option key={p}>{p}</option>)}</select><select className={inputCls} defaultValue=""><option value="" disabled>Max price</option>{["$400K","$500K","$600K","$750K","$1M","$1.5M","No max"].map(p=><option key={p}>{p}</option>)}</select></div>
            <div className="grid grid-cols-2 gap-2.5"><select className={inputCls} defaultValue=""><option value="" disabled>Beds</option>{["1+","2+","3+","4+","5+"].map(b=><option key={b}>{b}</option>)}</select><select className={inputCls} defaultValue=""><option value="" disabled>Baths</option>{["1+","2+","3+"].map(b=><option key={b}>{b}</option>)}</select></div>
            <select className={inputCls} defaultValue=""><option value="" disabled>Property type</option>{["Single Family","Condo / Co-op","Townhouse","Multi-family","Commercial"].map(t=><option key={t}>{t}</option>)}</select>
            <button className="w-full bg-[#1a2332] text-white py-3 rounded-lg font-semibold hover:bg-[#0f1419] transition mt-1">Search listings</button>
          </div>
        </div>
      </div>
    </section>

    {/* TRUST BAR */}
    <div className="bg-white border-b border-[#ddd8d0] py-4 overflow-x-auto">
      <div className="max-w-6xl mx-auto px-6 flex items-center gap-8 min-w-max">
        {[["Full ","Long Island MLS"," access"],["Licensed ","Associate Broker",""],["","205+"," homes sold"],["","38"," five-star reviews"],["Speaks ","EN / ES / RU",""]].map(([pre,bold,post],i)=>(<div key={i} className="flex items-center gap-2 text-sm text-[#6b7180] whitespace-nowrap"><CheckIcon className="w-4 h-4 text-[#3d6b52] shrink-0"/><span>{pre}<strong className="text-[#2c3038] font-semibold">{bold}</strong>{post}</span></div>))}
      </div>
    </div>

    {/* RECENT SALES */}
    <section id="recent-sales" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl text-[#1a2332] mb-1">Recent sales</h2>
        <p className="text-[#6b7180] mb-10">25 closings in the past 12 months. Average sale price: $674K.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SALES.map((s,i)=>(<div key={i} className="bg-white border border-[#ddd8d0] rounded-xl overflow-hidden hover:shadow-lg transition group cursor-pointer"><div className="relative aspect-[16/10] overflow-hidden"><Image src={s.img} alt={s.addr} fill className="object-cover group-hover:scale-105 transition duration-500"/><span className="absolute top-3 left-3 bg-[#3d6b52] text-white text-[11px] font-bold px-3 py-1 rounded">Sold</span></div><div className="p-4"><p className="font-serif text-xl text-[#1a2332]">{s.price}</p><p className="text-xs text-[#6b7180] mt-1">{s.beds} bed &middot; {s.baths} bath{s.sqft?` \u00B7 ${s.sqft} sqft`:""} &middot; {s.side} side</p><p className="text-sm font-medium text-[#2c3038] mt-2">{s.addr}</p><p className="text-xs text-[#6b7180]">{s.town}</p></div></div>))}
          <div className="bg-[#1a2332] rounded-xl p-6 flex flex-col justify-center text-white"><p className="font-serif text-4xl mb-1">$175K&ndash;$6M</p><p className="text-white/50 text-sm mb-6">price range across 205+ transactions</p><p className="text-sm text-white/70 leading-relaxed">Residential, commercial, investment, co-ops, condos, single-family. Long Island and Queens.</p><a href="#contact" className="mt-6 inline-flex items-center gap-2 bg-[#3d6b52] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#2e5440] transition text-sm self-start">Work with Ruben</a></div>
        </div>
      </div>
    </section>

    {/* ABOUT */}
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[280px_1fr] gap-12 items-start">
        <div className="relative rounded-2xl overflow-hidden"><Image src="/ruben.png" alt="Ruben Yosopov" width={560} height={700} className="w-full"/><div className="absolute bottom-0 left-0 right-0 h-1 bg-[#c2956b]"/></div>
        <div>
          <h2 className="font-serif text-3xl text-[#1a2332] mb-5">About Ruben</h2>
          <div className="text-[#6b7180] leading-relaxed space-y-4 max-w-xl">
            <p>I&apos;ve spent 16 years helping people buy and sell homes across Long Island and Queens. Residential, commercial, investment properties, co-ops, condos, single-family. I&apos;ve closed over 205 transactions ranging from $175K to $6M, and I bring the same attention to every one of them.</p>
            <p>Before real estate, I worked in property acquisition and investor relations at a private equity firm. That background shapes how I evaluate deals and advise clients on pricing, negotiation, and market timing.</p>
            <p>I take pride in the relationships I build with clients that last well beyond closing day. When you work with me, you get my cell number. Call me at 10pm about a listing, I&apos;ll call you back.</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-[#ddd8d0] bg-[#f4f0eb]"><CheckIcon className="w-3.5 h-3.5 text-[#3d6b52]"/>Licensed Associate Broker</span>
            {["English","Espa\u00f1ol","\u0420\u0443\u0441\u0441\u043a\u0438\u0439"].map(l=>(<span key={l} className="px-3 py-1.5 rounded-full text-xs font-semibold border border-[#ddd8d0] bg-[#f4f0eb]">{l}</span>))}
          </div>
          <div className="flex gap-10 mt-8 pt-6 border-t border-[#ddd8d0] flex-wrap">
            {[["16","Years"],["205+","Homes sold"],["25","This year"],["$674K","Avg price"]].map(([n,l])=>(<div key={l}><p className="font-serif text-2xl text-[#1a2332]">{n}</p><p className="text-xs text-[#6b7180] mt-0.5">{l}</p></div>))}
          </div>
        </div>
      </div>
    </section>

    {/* COMMUNITIES */}
    <section id="communities" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl text-[#1a2332] mb-2">Neighborhoods I know</h2>
        <p className="text-[#6b7180] mb-10 max-w-md">Real local insight for every community I serve.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {COMMUNITIES.map(c=>(<a key={c.name} href="#" className="group bg-white border border-[#ddd8d0] rounded-xl p-5 hover:border-[#c2956b] hover:shadow-md transition relative overflow-hidden"><div className="absolute top-0 left-0 right-0 h-[3px] bg-[#c2956b] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200"/><h3 className="font-serif text-[#1a2332] mb-2">{c.name}</h3><p className="text-sm font-semibold text-[#3d6b52]">Median {c.median}</p><p className="text-xs text-[#6b7180] mt-0.5">{c.schools} schools</p></a>))}
        </div>
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section className="bg-[#1a2332] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl text-white mb-2">What clients say</h2>
        <p className="text-white/40 mb-10">38 five-star reviews on Zillow.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {REVIEWS.map((r,i)=>(<div key={i} className={`rounded-xl p-7 ${r.featured?"bg-white/10 md:row-span-2 flex flex-col justify-center":"bg-white/[0.04] border border-white/[0.06]"}`}><p className="text-[#c2956b] text-sm tracking-widest mb-3">&starf;&starf;&starf;&starf;&starf;</p><blockquote className={`font-serif italic text-white/85 leading-relaxed mb-4 ${r.featured?"text-lg":"text-[15px]"}`}>&ldquo;{r.text}&rdquo;</blockquote><p className="text-xs text-white/35 font-medium">{r.source}</p></div>))}
        </div>
      </div>
    </section>

    {/* SELL YOUR HOME */}
    <section id="sell-your-home" className="py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="font-serif text-3xl text-[#1a2332] mb-4">Thinking about selling?</h2>
          <p className="text-[#6b7180] leading-relaxed mb-6 max-w-md">Get a free, no-obligation market evaluation based on recent sales in your neighborhood. Not a Zillow estimate. A real analysis from someone who knows the street.</p>
          <ul className="space-y-3">
            {["Comparative market analysis from actual recent sales","Honest pricing. I\u2019ll tell you what it\u2019s worth, not what you want to hear.","Professional photography and full MLS marketing","No commitment required. Just information."].map(t=>(<li key={t} className="flex gap-3 text-sm text-[#2c3038]"><CheckIcon className="w-5 h-5 text-[#3d6b52] shrink-0 mt-0.5"/>{t}</li>))}
          </ul>
        </div>
        <div className="bg-white border border-[#ddd8d0] rounded-2xl p-7">
          <h3 className="font-serif text-lg text-[#1a2332] mb-1">Request a free home evaluation</h3>
          <p className="text-sm text-[#6b7180] mb-5">I&apos;ll get back to you within 24 hours.</p>
          <form className="space-y-3" onSubmit={e=>{e.preventDefault();alert("Demo: evaluation request submitted.")}}>
            <div className="grid grid-cols-2 gap-3"><input className={inputCls} placeholder="Your name"/><input className={inputCls} placeholder="Phone"/></div>
            <input className={inputCls} placeholder="Property address"/>
            <div className="grid grid-cols-2 gap-3"><input className={inputCls} placeholder="City / Town"/><input className={inputCls} placeholder="Zip code"/></div>
            <textarea className={`${inputCls} resize-y min-h-[80px]`} placeholder="Anything else? (Renovations, timeline, etc.)"/>
            <button className="w-full bg-[#c2956b] text-white py-3 rounded-lg font-semibold hover:bg-[#b5875e] transition">Get my free evaluation</button>
          </form>
        </div>
      </div>
    </section>

    {/* CALCULATOR */}
    <section id="calculator" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl text-[#1a2332] mb-2">Mortgage calculator</h2>
        <p className="text-[#6b7180] mb-10 max-w-lg">Estimate your full monthly payment including property tax and insurance.</p>
        <MortgageCalc/>
      </div>
    </section>

    {/* CONTACT */}
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-serif text-3xl text-[#1a2332] mb-3">Let&apos;s talk</h2>
          <p className="text-[#6b7180] leading-relaxed mb-8 max-w-md">Ready to make a move, or just have questions? Call, text, or send me a message. I&apos;ll get back to you within a few hours.</p>
          <div className="space-y-5">
            {[{icon:<PhoneIcon/>,label:"Call or text",val:PHONE,href:PHONE_LINK},{icon:<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,label:"Email",val:EMAIL,href:`mailto:${EMAIL}`},{icon:<PhoneIcon/>,label:"Office",val:"(631) 619-4007",href:"tel:+16316194007"},{icon:<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,label:"Office",val:"289 Portion Rd, Ronkonkoma, NY",href:undefined}].map((m,i)=>(<div key={i} className="flex items-center gap-4"><div className="w-11 h-11 rounded-full bg-white border border-[#ddd8d0] flex items-center justify-center text-[#3d6b52] shrink-0">{m.icon}</div><div><p className="text-xs text-[#6b7180]">{m.label}</p>{m.href?<a href={m.href} className="font-semibold text-[#1a2332]">{m.val}</a>:<p className="font-semibold text-[#1a2332] text-[15px]">{m.val}</p>}</div></div>))}
          </div>
        </div>
        <form className="bg-white border border-[#ddd8d0] rounded-2xl p-7 space-y-3" onSubmit={e=>{e.preventDefault();alert("Demo: message sent.")}}>
          <div className="grid grid-cols-2 gap-3"><input className={inputCls} placeholder="First name" required/><input className={inputCls} placeholder="Last name" required/></div>
          <input className={inputCls} placeholder="Email" type="email" required/>
          <input className={inputCls} placeholder="Phone" type="tel"/>
          <select className={inputCls} defaultValue=""><option value="" disabled>I&apos;m interested in...</option>{["Buying a home","Selling my home","Free market evaluation","Loan pre-qualification","Investment property","Rental","General question"].map(o=><option key={o}>{o}</option>)}</select>
          <textarea className={`${inputCls} resize-y min-h-[90px]`} placeholder="Tell me about what you're looking for..."/>
          <button className="w-full bg-[#3d6b52] text-white py-3 rounded-lg font-semibold hover:bg-[#2e5440] transition">Send message</button>
        </form>
      </div>
    </section>

    {/* FOOTER */}
    <footer className="bg-[#1a2332] text-white/40 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <span className="font-serif italic text-white text-lg">Ruben Yosopov</span>
          <div className="flex flex-wrap justify-center gap-5 text-sm">{["Recent Sales","Communities","About","Sell Your Home","Calculator","Contact","Privacy Policy","Fair Housing","Accessibility"].map(l=>(<a key={l} href="#" className="hover:text-white/70 transition">{l}</a>))}</div>
        </div>
        <div className="border-t border-white/[0.06] pt-5 text-center text-xs leading-relaxed">
          <p>&copy; 2026 Ruben Yosopov. Licensed Associate Real Estate Broker, State of New York. Equal Housing Opportunity.</p>
          <p className="mt-1">Unique Home Sales of L.I. Inc. &middot; 289 Portion Rd, Ronkonkoma, NY 11375 &middot; (631) 619-4007</p>
        </div>
      </div>
    </footer>

    {/* MOBILE BAR */}
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#ddd8d0] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex gap-3 p-3 md:hidden">
      <a href={PHONE_LINK} className="flex-1 flex items-center justify-center gap-2 bg-[#3d6b52] text-white py-3 rounded-lg font-semibold"><PhoneIcon/>Call</a>
      <a href={SMS_LINK} className="flex-1 flex items-center justify-center gap-2 bg-[#1a2332] text-white py-3 rounded-lg font-semibold"><TextIcon/>Text</a>
    </div>
    <div className="h-16 md:hidden"/>
  </>);
}
