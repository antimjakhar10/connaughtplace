import { useState } from "react";
import {
  ArrowUpRight,
  Building2,
  MapPin,
  MoveUpRight,
  Store,
  Sparkles,
  Plane,
  Train,
  CheckCircle2,
  Maximize2,
  ChevronRight,
  Compass,
  ShieldCheck,
  TrendingUp,
  Award,
  Download,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";

import hero from "../assets/hero-exterior.jpeg";
import courtyard from "../assets/courtyard-night.jpeg";
import interior from "../assets/interior-courtyard.jpeg";
import aerial from "../assets/aerial-courtyard.jpeg";
import sitePlan from "../assets/site-plan.jpeg";
import locationMap from "../assets/location-map.jpeg";

import RateCalculator from "../components/RateCalculator";
import BrandMarquee from "../components/BrandMarquee";
import FAQSection from "../components/FAQSection";
import TestimonialSection from "../components/TestimonialSection";

const Home = ({ onOpenEnquiry, onOpenLightbox }) => {
  return (
    <main className="overflow-x-hidden bg-[#f7f5f0] text-[#151712]">
      {/* HERO SECTION — Dark Luxury Contrast Banner */}
      <section className="relative min-h-[90vh] overflow-hidden bg-[#0c0e0b] pt-24 text-white">
        {/* Background Image & Vignettes */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero}
            alt="Connaught Place Hisar Exterior"
            className="h-full w-full object-cover object-center transition duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e0b] via-[#0c0e0b]/80 to-[#0c0e0b]/40" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0c0e0b] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#0c0e0b]/90 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-[82vh] max-w-[1380px] flex-col justify-end px-5 pb-16 pt-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-black/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#e6d5b8] backdrop-blur-md">
                <Sparkles size={12} className="text-[#c5a880]" />
                Commercial Shops For Sale · Sector 25, Hisar
              </div>

              <h1 className="font-cinzel max-w-5xl text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[84px]">
                A New Landmark <br />
                <span className="gold-gradient-text-light font-display italic">For Commercial Investment.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
                9 Acres. 100+ Brands Target. One Address. <br />
                Buy high-visibility commercial retail shops and independent showrooms in Hisar with guaranteed 9-Year Brand Lease returns.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry("Hero Schedule Visit")}
                  className="shimmer-btn flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#a88b60] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#090b08] shadow-xl shadow-[#c5a880]/20 transition hover:scale-105"
                >
                  Inquire To Buy <ArrowUpRight size={16} />
                </button>

                <Link
                  to="/leasing"
                  className="flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md transition hover:border-[#c5a880] hover:bg-white/20"
                >
                  Explore Sale Rates
                </Link>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-1">
              {[
                ["09", "Acres Total Land"],
                ["100+", "Brands Potential Mix"],
                ["09", "Years Brand Lease Guarantee"],
                ["05", "Minutes to Hisar Airport"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="glass-dark rounded-2xl p-4 transition hover:border-[#c5a880]/50"
                >
                  <p className="font-cinzel text-3xl font-extrabold text-[#e6d5b8]">{value}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT OVERVIEW — Executive Header & Spacious 3-Card Grid Upgrade */}
      <section className="relative overflow-hidden border-b border-black/8 bg-[#f7f5f0] px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1380px] space-y-12">
          {/* Executive Header Section */}
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#8b6e40]/30 bg-[#8b6e40]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#8b6e40]">
                <Sparkles size={12} className="text-[#8b6e40]" /> Commercial Ownership & Assured Returns
              </div>
              <h2 className="font-cinzel text-3xl font-extrabold leading-[1.15] text-[#151712] sm:text-4xl lg:text-5xl">
                Buy Shops With <br className="hidden sm:inline" />
                <span className="gold-gradient-text">9-Year Brand Lease Security.</span>
              </h2>
            </div>

            <div>
              <p className="text-sm leading-relaxed text-[#33362d] sm:text-base lg:text-lg">
                Connaught Place Hisar introduces a modern open-courtyard commercial design, blending open-air plazas, double-height showroom frontages, and dedicated food & entertainment zones engineered for maximum customer footfall and rental yield.
              </p>

              {/* Clean Highlight Bullets */}
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-[#151712]">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8b6e40]" />
                  <span>9-Year Guaranteed Return</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8b6e40]" />
                  <span>Prime Sector 25 Hisar</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8b6e40]" />
                  <span>Double Height Frontages</span>
                </div>
              </div>

              {/* Top Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry("Project Overview Header")}
                  className="shimmer-btn flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#8b6e40] to-[#7c5c24] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-[#8b6e40]/20 transition hover:scale-105"
                >
                  Inquire To Buy <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Full Width Spacious 3 Asset Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                val: "300–400",
                unit: "SQ.FT. RETAIL",
                title: "Retail Shops",
                tag: "Ground to 3rd Floor",
                desc: "High-traffic open courtyard facing shops for retail, fashion & dining.",
                icon: Store,
                enquiryTag: "Retail Shops Overview"
              },
              {
                val: "1,000–10k",
                unit: "SQ.FT. SHOWROOM",
                title: "Anchor Showrooms",
                tag: "Independent Flagships",
                desc: "Multi-level flagship showrooms with double-height glass frontage.",
                icon: Building2,
                enquiryTag: "Anchor Showroom Overview"
              },
              {
                val: "9 Years",
                unit: "BRAND LEASE TERM",
                title: "Brand Lease Security",
                tag: "Pre-Rented & Assured",
                desc: "Pre-leased commercial options with structured 3-year escalation returns.",
                icon: ShieldCheck,
                enquiryTag: "Lease Guarantee Overview"
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-black/8 border-t-4 border-t-[#c5a880] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#c5a880] hover:shadow-2xl"
              >
                <div>
                  {/* Card Header Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f7f5f0] text-[#8b6e40] transition duration-300 group-hover:bg-[#8b6e40] group-hover:text-white">
                      <card.icon size={22} />
                    </div>
                    <span className="rounded-full border border-[#8b6e40]/25 bg-[#8b6e40]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8b6e40]">
                      {card.tag}
                    </span>
                  </div>

                  {/* Big Number & Title */}
                  <div className="mt-6">
                    <p className="font-cinzel text-3xl font-extrabold text-[#8b6e40] sm:text-4xl">
                      {card.val}
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#8b6e40]/80">
                      {card.unit}
                    </p>
                    <h4 className="mt-3 text-base font-bold text-[#151712]">
                      {card.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#33362d]">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Big Clear Action Buttons */}
                <div className="mt-8 grid grid-cols-2 gap-3 pt-4 border-t border-black/8">
                  <a
                    href="tel:+919718064000"
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#8b6e40]/40 bg-[#8b6e40]/5 py-3 text-xs font-bold uppercase tracking-wider text-[#8b6e40] transition duration-300 hover:border-[#8b6e40] hover:bg-[#8b6e40] hover:text-white shadow-sm"
                  >
                    <Phone size={14} />
                    <span>Call Now</span>
                  </a>
                  <button
                    onClick={() => onOpenEnquiry && onOpenEnquiry(card.enquiryTag)}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#8b6e40] to-[#7c5c24] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-[#8b6e40]/20 transition duration-300 hover:scale-[1.02] active:scale-95"
                  >
                    <span>Enquire</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE RATE CALCULATOR */}
      <section className="bg-[#f2efe9] px-5 py-16 lg:px-8 lg:py-20 border-b border-black/8">
        <div className="mx-auto max-w-[1380px]">
          <RateCalculator onOpenEnquiry={onOpenEnquiry} />
        </div>
      </section>

      {/* ARCHITECTURAL & COURTYARD GALLERY LIGHTBOX */}
      <section className="bg-[#f7f5f0] px-5 py-16 lg:px-8 lg:py-24 border-b border-black/8">
        <div className="mx-auto max-w-[1380px] space-y-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b6e40]">
                Architectural Experience
              </span>
              <h2 className="font-cinzel mt-2 text-3xl font-bold text-[#151712] sm:text-4xl">
                Designed For Discovery & High Footfall.
              </h2>
            </div>
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry("Gallery Enquiry")}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8b6e40] transition hover:text-[#151712]"
            >
              Enquire For Frontage Units <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {/* Gallery Item 1 */}
            <div
              onClick={() =>
                onOpenLightbox &&
                onOpenLightbox(courtyard, "Night Courtyard Plaza", "Central illuminated plaza designed for evening dining and high footfall gatherings.")
              }
              className="group relative h-[360px] cursor-pointer overflow-hidden rounded-2xl border border-black/10 bg-black shadow-lg"
            >
              <img
                src={courtyard}
                alt="Night Courtyard"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#c5a880]">
                  Night Plaza
                </span>
                <h4 className="font-cinzel mt-1 text-xl font-bold">Central Courtyard Plaza</h4>
                <p className="mt-1 text-xs text-white/60">Click to view full screen</p>
              </div>
              <div className="absolute right-4 top-4 rounded-full bg-black/40 p-2 text-white backdrop-blur">
                <Maximize2 size={16} />
              </div>
            </div>

            {/* Gallery Item 2 */}
            <div
              onClick={() =>
                onOpenLightbox &&
                onOpenLightbox(interior, "Interior Retail Promenade", "Multi-tier glass walkways connecting retail levels.")
              }
              className="group relative h-[360px] cursor-pointer overflow-hidden rounded-2xl border border-black/10 bg-black shadow-lg"
            >
              <img
                src={interior}
                alt="Interior Promenade"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#c5a880]">
                  Retail Promenade
                </span>
                <h4 className="font-cinzel mt-1 text-xl font-bold">Multi-Tier Retail Walkways</h4>
                <p className="mt-1 text-xs text-white/60">Click to view full screen</p>
              </div>
              <div className="absolute right-4 top-4 rounded-full bg-black/40 p-2 text-white backdrop-blur">
                <Maximize2 size={16} />
              </div>
            </div>

            {/* Gallery Item 3 */}
            <div
              onClick={() =>
                onOpenLightbox &&
                onOpenLightbox(aerial, "Aerial Master View", "Panoramic aerial view showing the 9-acre commercial layout.")
              }
              className="group relative h-[360px] cursor-pointer overflow-hidden rounded-2xl border border-black/10 bg-black shadow-lg"
            >
              <img
                src={aerial}
                alt="Aerial View"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#c5a880]">
                  Aerial View
                </span>
                <h4 className="font-cinzel mt-1 text-xl font-bold">9-Acres Master Precinct</h4>
                <p className="mt-1 text-xs text-white/60">Click to view full screen</p>
              </div>
              <div className="absolute right-4 top-4 rounded-full bg-black/40 p-2 text-white backdrop-blur">
                <Maximize2 size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE SECTION */}
      <section className="bg-[#f2efe9] px-5 py-16 lg:px-8 lg:py-24 border-b border-black/8">
        <div className="mx-auto max-w-[1380px]">
          <BrandMarquee />
        </div>
      </section>

      {/* LOCATION & CONNECTIVITY MATRIX */}
      <section className="bg-[#f7f5f0] px-5 py-16 lg:px-8 lg:py-24 border-b border-black/8">
        <div className="mx-auto max-w-[1380px] space-y-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b6e40]">
                Strategic Sector 25 Hisar
              </span>
              <h2 className="font-cinzel mt-2 text-3xl font-bold text-[#151712] sm:text-4xl lg:text-5xl">
                Location Advantage & Growth Corridor.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#33362d] sm:text-base">
                Connaught Place Hisar sits at the heart of Sector 25, surrounded by rapid urban development, immediate highway access, and key regional hubs.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="glass-card-light rounded-xl p-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#c5a880]/20 text-[#8b6e40]">
                    <Plane size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#151712]">5 Mins to Airport</h5>
                    <p className="text-[10px] text-[#66695e]">Hisar International Airport</p>
                  </div>
                </div>

                <div className="glass-card-light rounded-xl p-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#c5a880]/20 text-[#8b6e40]">
                    <Compass size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#151712]">Direct NH-9 Access</h5>
                    <p className="text-[10px] text-[#66695e]">Delhi-Sirsa Corridor</p>
                  </div>
                </div>

                <div className="glass-card-light rounded-xl p-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#c5a880]/20 text-[#8b6e40]">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#151712]">3 Mins to IMC Hisar</h5>
                    <p className="text-[10px] text-[#66695e]">Integrated Mfg. Cluster</p>
                  </div>
                </div>

                <div className="glass-card-light rounded-xl p-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#c5a880]/20 text-[#8b6e40]">
                    <Train size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#151712]">10 Mins Railway Station</h5>
                    <p className="text-[10px] text-[#66695e]">Hisar Junction</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Card */}
            <div
              onClick={() =>
                onOpenLightbox &&
                onOpenLightbox(locationMap, "Sector 25 Connectivity Map", "Detailed location connectivity map showing proximity to Airport, NH-9, and City Center.")
              }
              className="group relative h-[420px] cursor-pointer overflow-hidden rounded-2xl border border-black/10 bg-black shadow-2xl"
            >
              <img
                src={locationMap}
                alt="Location Connectivity Map"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#c5a880]">
                    Interactive Map
                  </span>
                  <h4 className="font-cinzel text-lg font-bold">View Full City Connectivity</h4>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c5a880] text-[#090b08]">
                  <Maximize2 size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SITE PLAN EXPLORER */}
      <section className="bg-[#f2efe9] px-5 py-16 lg:px-8 lg:py-24 border-b border-black/8">
        <div className="mx-auto max-w-[1380px] space-y-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b6e40]">
                Approved Masterplan
              </span>
              <h2 className="font-cinzel mt-2 text-3xl font-bold text-[#151712] sm:text-4xl">
                Explore The Official Site Plan
              </h2>
            </div>
            <button
              onClick={() =>
                onOpenLightbox &&
                onOpenLightbox(sitePlan, "Approved Site Plan", "Complete master layout showing shop zoning, parking access, and plaza entries.")
              }
              className="rounded-xl border border-[#c5a880] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#8b6e40] shadow-sm transition hover:bg-[#121510] hover:text-white"
            >
              Expand Fullsite Plan
            </button>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-xl">
            <img
              src={sitePlan}
              alt="Site Plan Layout"
              className="h-auto max-h-[500px] w-full object-cover object-center rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-[#f7f5f0] px-5 py-16 lg:px-8 lg:py-24 border-b border-black/8">
        <div className="mx-auto max-w-[1380px]">
          <FAQSection />
        </div>
      </section>

      {/* CLIENT & INVESTOR TESTIMONIALS SECTION */}
      <TestimonialSection />

      {/* FINAL BOTTOM CALLOUT — Dark Emerald Contrast Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#141811] via-[#1c2219] to-[#141811] px-5 py-16 text-white lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-[1380px] flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a880]">
              Exclusive Commercial Sale Inventory
            </span>
            <h2 className="font-cinzel mt-2 text-3xl font-bold text-white sm:text-4xl">
              Buy Commercial Shop / Showroom in Hisar.
            </h2>
            <p className="mt-2 text-sm text-white/85">
              Limited high-frontage retail shops and brand lease showrooms available for purchase.
            </p>
          </div>

          <button
            onClick={() => onOpenEnquiry && onOpenEnquiry("Bottom CTA")}
            className="shimmer-btn flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#a88b60] px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#090b08] shadow-2xl shadow-[#c5a880]/30 transition hover:scale-105"
          >
            Inquire To Buy <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
