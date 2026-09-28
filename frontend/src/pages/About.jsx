import { useState, useEffect } from "react";
import { ArrowUpRight, MapPin, MoveUpRight, Sparkles, ShieldCheck, Zap, Car, Compass, Maximize2 } from "lucide-react";
import { Link } from "react-router-dom";
import API_URL from "../api";

import hero from "../assets/exterior-day-2.jpeg";
import heroExterior from "../assets/hero-exterior.jpeg";
import locationMap from "../assets/location-map.jpeg";
import sitePlan from "../assets/site-plan.jpeg";
import airport from "../assets/airport.jpeg";
import imc from "../assets/imc.jpeg";
import aerial from "../assets/aerial-courtyard.jpeg";
import courtyard from "../assets/courtyard-night.jpeg";
import interiorCourtyard from "../assets/interior-courtyard.jpeg";
import interiorGallery from "../assets/interior-gallery.jpeg";

const amenities = [
  { icon: Zap, title: "100% Power Back-up", desc: "Uninterrupted 24/7 electricity grid & DG sync." },
  { icon: ShieldCheck, title: "3-Tier Security & CCTV", desc: "Smart surveillance, perimeter monitoring & guards." },
  { icon: Car, title: "Multi-Level Parking", desc: "Dedicated visitor & owner vehicular parking." },
  { icon: Sparkles, title: "Double-Height Frontages", desc: "Maximum glass elevation visibility for retail." },
];

const About = ({ onOpenEnquiry, onOpenLightbox }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_URL || "http://localhost:5000"}/api/gallery`);
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.data)) {
        setGalleryImages(data.data);
      }
    } catch (err) {
      console.warn("Could not fetch dynamic gallery:", err);
    } finally {
      setLoadingGallery(false);
    }
  };

  const displayList = galleryImages;


  return (
    <main className="overflow-x-hidden bg-[#f7f5f0] text-[#151712] pt-20">
      {/* HERO SECTION — Dark Contrast Banner */}
      <section className="relative min-h-[58vh] overflow-hidden bg-[#0c0e0b] text-white py-16 lg:py-24 border-b border-white/10">
        <img
          src={hero}
          alt="Connaught Place Hisar Exterior"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e0b] via-[#0c0e0b]/80 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[48vh] max-w-[1380px] items-end px-5 lg:px-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e6d5b8]">
              <Sparkles size={12} className="text-[#c5a880]" /> The Vision & Landmark
            </div>
            <h1 className="font-cinzel text-4xl font-extrabold text-white sm:text-6xl lg:text-7xl">
              A Destination Built <br />
              <span className="gold-gradient-text-light font-display italic">With A Point Of View.</span>
            </h1>
            <p className="mt-4 max-w-xl text-xs leading-relaxed text-white/70 sm:text-sm">
              Connaught Place Hisar represents a master-planned 9-acre commercial ecosystem crafted for retail excellence, dining, and brand entertainment.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECT ESSENTIALS — Light Luxury Sculpted Showcase */}
      <section className="relative overflow-hidden border-b border-black/8 bg-[#f7f5f0] px-5 py-16 lg:px-8 lg:py-24">
        {/* Subtle Decorative Background Glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#c5a880]/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1380px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            {/* Left Content Column */}
            <div className="max-w-xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#8b6e40]/30 bg-[#8b6e40]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#8b6e40]">
                <Sparkles size={12} className="text-[#8b6e40]" />
                Landmark Scale & Essential Metrics
              </div>

              <h2 className="font-cinzel text-3xl font-extrabold leading-[1.18] text-[#151712] sm:text-4xl lg:text-5xl">
                9 Acres. 100+ Brands. <br />
                <span className="gold-gradient-text">One Prime Address.</span>
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-[#55594f] sm:text-base">
                Engineered as Hisar's premier 9-acre open-courtyard commercial ecosystem featuring high-visibility retail shops, anchor showrooms, multiplex dining, and 9-year guaranteed brand lease returns.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry("About Key Metrics")}
                  className="shimmer-btn flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#8b6e40] to-[#7c5c24] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-[#8b6e40]/20 transition hover:scale-105 active:scale-95"
                >
                  Inquire To Invest <ArrowUpRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Column — 4 Sculpted White Luxury Metric Cards */}
            <div className="grid grid-cols-2 gap-5">
              {[
                {
                  val: "09",
                  unit: "Acres",
                  title: "Total Precinct Land",
                  desc: "100% Commercial Land Hub",
                  icon: Compass
                },
                {
                  val: "100+",
                  unit: "Brands",
                  title: "Target Brand Mix",
                  desc: "Retail, Food Court & Cinema",
                  icon: Sparkles
                },
                {
                  val: "9 Yrs",
                  unit: "Return",
                  title: "Brand Lease Security",
                  desc: "Structured Escalations & Income",
                  icon: ShieldCheck
                },
                {
                  val: "Sector 25",
                  unit: "Location",
                  title: "Hisar Commercial Hub",
                  desc: "5 Mins from Hisar Airport",
                  icon: MapPin
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-black/8 border-t-4 border-t-[#c5a880] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#c5a880] hover:shadow-2xl flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row Icon & Unit */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8b6e40]/10 text-[#8b6e40] transition duration-300 group-hover:bg-[#8b6e40] group-hover:text-white">
                        <stat.icon size={20} />
                      </div>
                      <span className="rounded-full border border-[#8b6e40]/20 bg-[#8b6e40]/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#8b6e40]">
                        {stat.unit}
                      </span>
                    </div>

                    {/* Big Value */}
                    <div className="mt-5">
                      <p className="font-cinzel text-3xl font-extrabold text-[#8b6e40] sm:text-4xl">
                        {stat.val}
                      </p>
                      <h4 className="mt-2 text-sm font-bold text-[#151712] tracking-wide">
                        {stat.title}
                      </h4>
                      <p className="mt-1 text-xs text-[#66695e] leading-relaxed">
                        {stat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONNECTIVITY HUB & VIDEO FLYTHROUGH */}
      <section className="bg-[#f2efe9] px-5 py-16 lg:px-8 lg:py-24 border-b border-black/8">
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
            {/* Left Column — Content & 4 Highlighted Cards Grid */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b6e40]">
                  Growth Corridor & Infrastructure
                </span>
                <h2 className="font-cinzel mt-2 text-3xl font-extrabold text-[#151712] sm:text-4xl">
                  Proximity To Hisar Airport & Manufacturing Hub
                </h2>
                <p className="mt-3 text-xs leading-relaxed text-[#55594f] sm:text-sm">
                  Sector 25 is strategically positioned directly in the high-growth commercial corridor of Hisar, surrounded by the upcoming international airport, 2,988-acre IMC hub, and multi-lane national highways.
                </p>
              </div>

              {/* 4 Highlighted Connectivity Cards Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    img: airport,
                    title: "Hisar Airport",
                    tag: "5 Mins Drive",
                    desc: "International Airport Expansion Hub"
                  },
                  {
                    img: imc,
                    title: "Hisar IMC Cluster",
                    tag: "2,988 Acres",
                    desc: "Industrial Manufacturing Zone"
                  },
                  {
                    img: aerial,
                    title: "Delhi-Sirsa Highway",
                    tag: "Direct NH-9",
                    desc: "Main Arterial Transit Route"
                  },
                  {
                    img: sitePlan,
                    title: "Sector 25 Node",
                    tag: "Master Site",
                    desc: "9-Acres Commercial Precinct"
                  },
                ].map((card, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      onOpenLightbox &&
                      onOpenLightbox(card.img, card.title, card.desc)
                    }
                    className="group relative cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#c5a880] hover:shadow-md"
                  >
                    <div className="relative h-32 w-full overflow-hidden bg-black">
                      <img
                        src={card.img}
                        alt={card.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                      <span className="absolute top-2 right-2 rounded-full border border-white/20 bg-black/60 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#e6d5b8] backdrop-blur-sm">
                        {card.tag}
                      </span>
                    </div>
                    <div className="p-3 bg-white">
                      <h5 className="font-bold text-xs text-[#151712]">{card.title}</h5>
                      <p className="mt-0.5 text-[10px] text-[#66695e]">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — Autoplaying Luxury Video Player */}
            <div className="group relative flex h-full min-h-[440px] flex-col justify-between overflow-hidden rounded-2xl border border-black/10 bg-black shadow-2xl">
              <video
                src="/video.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

              {/* Video Top Header Badges */}
              <div className="relative z-10 p-4 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-[#e6d5b8] backdrop-blur-md">
                  <Sparkles size={11} className="text-[#c5a880]" /> Live Video Walkthrough
                </span>
                <span className="rounded-full bg-red-600/90 px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-white animate-pulse">
                  Official Flythrough
                </span>
              </div>

              {/* Video Bottom Caption Overlay */}
              <div className="relative z-10 p-5 text-white pointer-events-none">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#c5a880]">
                  Connaught Place Hisar
                </span>
                <h4 className="font-cinzel text-lg font-bold">Project & Plaza Video Tour</h4>
                <p className="mt-0.5 text-xs text-white/70">Experience the 9-acre open-courtyard commercial design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LANDSCAPE LOCATION MAP SECTION */}
      <section className="bg-[#f7f5f0] px-5 py-16 lg:px-8 lg:py-24 border-b border-black/8">
        <div className="mx-auto max-w-[1380px] space-y-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b6e40]">
                Strategic Location Map
              </span>
              <h2 className="font-cinzel mt-2 text-3xl font-bold text-[#151712] sm:text-4xl">
                Sector 25 Hisar Master Location Plan
              </h2>
              <p className="mt-1 text-xs text-[#55594f]">
                Regional location plan highlighting Delhi-Sirsa NH-9 highway, Hisar Airport, IMC hub, and Sector 25 commercial node.
              </p>
            </div>
            <button
              onClick={() =>
                onOpenLightbox &&
                onOpenLightbox(locationMap, "Sector 25 Location Map", "High-resolution regional connectivity map detailing Delhi-Sirsa Highway, Hisar Airport, and Sector 25.")
              }
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8b6e40] transition hover:text-[#151712]"
            >
              <Maximize2 size={15} /> View High-Res Map
            </button>
          </div>

          <div
            onClick={() =>
              onOpenLightbox &&
              onOpenLightbox(locationMap, "Sector 25 Location Map", "Strategic regional connectivity map.")
            }
            className="group relative h-[420px] sm:h-[500px] lg:h-[580px] w-full cursor-pointer overflow-hidden rounded-3xl border border-black/12 bg-white shadow-2xl transition-all duration-500 hover:border-[#c5a880]"
          >
            <img
              src={locationMap}
              alt="Sector 25 Location Map Landscape"
              className="h-full w-full object-cover sm:object-contain bg-white transition duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

            <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-black/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e6d5b8] backdrop-blur-md">
                <MapPin size={12} className="text-[#c5a880]" /> Sector 25, Hisar · Master Location Network
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition group-hover:bg-[#c5a880] group-hover:text-black">
                <Maximize2 size={16} />
              </div>
            </div>

            <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-2xl border border-white/15 bg-black/75 p-4 backdrop-blur-xl">
                {[
                  { label: "Hisar Airport", val: "5 Mins Drive" },
                  { label: "IMC Cluster Hub", val: "2,988 Acres" },
                  { label: "Main Highway", val: "Delhi-Sirsa NH-9" },
                  { label: "Commercial Land", val: "Sector 25 Hisar" },
                ].map((item, idx) => (
                  <div key={idx} className="border-r border-white/10 last:border-r-0 px-2">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#c5a880]">{item.label}</p>
                    <p className="font-cinzel text-sm font-bold text-white mt-0.5">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES GRID */}
      <section className="bg-[#f7f5f0] px-5 py-16 lg:px-8 lg:py-24 border-b border-black/8">
        <div className="mx-auto max-w-[1380px] space-y-10">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b6e40]">
              World-Class Infrastructure
            </span>
            <h2 className="font-cinzel mt-2 text-3xl font-bold text-[#151712] sm:text-4xl">
              Commercial Amenities & Specifications
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map((a) => (
              <div key={a.title} className="glass-card-light rounded-2xl p-6 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c5a880]/20 text-[#8b6e40]">
                  <a.icon size={20} />
                </div>
                <h4 className="font-cinzel text-base font-bold text-[#151712]">{a.title}</h4>
                <p className="text-xs text-[#55594f] leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DYNAMIC ARCHITECTURAL & MALL GALLERY SECTION */}
      <section className="bg-[#f2efe9] px-5 py-16 lg:px-8 lg:py-24 border-b border-black/8">
        <div className="mx-auto max-w-[1380px] space-y-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#8b6e40]/30 bg-[#8b6e40]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#8b6e40]">
                <Sparkles size={12} className="text-[#8b6e40]" /> Architectural Walkthrough & Gallery
              </div>
              <h2 className="font-cinzel text-3xl font-extrabold text-[#151712] sm:text-4xl">
                Commercial Precinct & Courtyard Gallery
              </h2>
              <p className="mt-1.5 text-xs text-[#55594f] max-w-xl">
                Explore the open-courtyard commercial design, double-height showroom frontages, illuminated evening dining plazas, and master layout.
              </p>
            </div>

            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry("About Gallery Section")}
              className="shimmer-btn inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8b6e40] to-[#7c5c24] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-[#8b6e40]/20 transition hover:scale-105"
            >
              Enquire For Frontage Units <ArrowUpRight size={15} />
            </button>
          </div>

          {/* DYNAMIC RESPONSIVE BENTO GALLERY GRID */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayList.map((item, idx) => {
              const isFirstLarge = idx === 0;
              return (
                <div
                  key={item._id || idx}
                  onClick={() =>
                    onOpenLightbox &&
                    onOpenLightbox(
                      item.imageUrl,
                      item.title,
                      item.description || "Connaught Place Hisar Commercial Gallery"
                    )
                  }
                  className={`group relative h-[360px] sm:h-[380px] cursor-pointer overflow-hidden rounded-3xl border border-black/10 bg-black shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                    isFirstLarge ? "sm:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-[#e6d5b8] backdrop-blur-md">
                      {item.category || "Commercial Gallery"}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                    <div>
                      <h4 className="font-cinzel text-lg font-bold sm:text-xl">{item.title}</h4>
                      {item.description && (
                        <p className="mt-1 text-xs text-white/70 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition group-hover:bg-[#c5a880] group-hover:text-black">
                      <Maximize2 size={16} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER CTA SECTION */}
      <section className="bg-[#0c0e0b] px-5 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1380px] text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e6d5b8]">
            <Sparkles size={13} className="text-[#c5a880]" /> Own A Commercial Shop At Connaught Place Hisar
          </div>

          <h2 className="font-cinzel text-3xl font-extrabold text-white sm:text-5xl">
            Ready To Invest In Hisar's <br />
            <span className="gold-gradient-text-light font-display italic">Next Big Commercial Landmark?</span>
          </h2>

          <p className="mx-auto max-w-xl text-xs text-white/70 sm:text-sm">
            Connect directly with our commercial leasing & sales desk for floor layout plans, unit pricing, and site walkthroughs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry("About Page Footer CTA")}
              className="shimmer-btn flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#e6d5b8] via-[#c5a880] to-[#a3865c] px-8 py-4 text-xs font-bold uppercase tracking-wider text-black shadow-xl transition hover:scale-105"
            >
              Schedule Site Walkthrough <ArrowUpRight size={16} />
            </button>
            <Link
              to="/contact"
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10"
            >
              Contact Sales Office
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
