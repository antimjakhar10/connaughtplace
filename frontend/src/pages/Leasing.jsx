import { ArrowUpRight, Check, MoveUpRight, Sparkles, Building2, Store, FileText, CheckCircle2, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import hero from "../assets/exterior-day.jpeg";
import interior from "../assets/interior-gallery.jpeg";
import showroom from "../assets/exterior-day-2.jpeg";

import RateCalculator from "../components/RateCalculator";

const retailRates = [
  { floor: "Ground Floor", rate: "₹21,000", desc: "High-traffic street facing shops with double frontage options.", size: "300–400 sq.ft." },
  { floor: "1st Floor", rate: "₹19,000", desc: "Lifestyle fashion retail wing with central atrium view.", size: "300–400 sq.ft." },
  { floor: "2nd Floor", rate: "₹17,000", desc: "Specialty dining, cafes, and electronics outlets.", size: "300–400 sq.ft." },
  { floor: "3rd Floor", rate: "₹16,000", desc: "Food court, entertainment, cinema corridor.", size: "300–400 sq.ft." },
];

const processSteps = [
  { step: "01", title: "Enquiry & Interest", desc: "Submit your brand footprint requirements and preferred space category." },
  { step: "02", title: "Guided Site Walkthrough", desc: "Inspect available shop locations, frontage width, and atrium visibility." },
  { step: "03", title: "Unit Allotment", desc: "Finalize floor positioning, rate locking, and commercial terms." },
  { step: "04", title: "Lease Execution", desc: "Execute 9-year institutional brand lease agreement with structured terms." },
];

const Leasing = ({ onOpenEnquiry }) => {
  return (
    <main className="overflow-x-hidden bg-[#f7f5f0] text-[#151712] pt-20">
      {/* HERO SECTION — Dark Contrast Banner */}
      <section className="relative overflow-hidden bg-[#0c0e0b] py-16 lg:py-24 text-white border-b border-white/10">
        <div className="mx-auto grid max-w-[1380px] gap-10 px-5 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e6d5b8]">
              <Sparkles size={12} className="text-[#c5a880]" /> Commercial Tariff & Specs
            </div>
            <h1 className="font-cinzel text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              Leasing Rates & <br />
              <span className="gold-gradient-text-light font-display italic">Inventory Pricing.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              Official floor-by-floor rate cards for retail shops and independent showroom spaces at Connaught Place Hisar.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenEnquiry && onOpenEnquiry("Leasing Page Hero")}
                className="shimmer-btn flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#a88b60] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#090b08]"
              >
                Schedule Visit <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl">
            <img src={hero} alt="Connaught Place Exterior" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#c5a880]">
                Commercial Frontage
              </span>
              <p className="font-cinzel text-xl font-bold">Premier Sector 25 Elevation</p>
            </div>
          </div>
        </div>
      </section>

      {/* RETAIL SHOPS FLOOR PRICING — Light Section */}
      <section className="bg-[#f7f5f0] px-5 py-16 lg:px-8 lg:py-24 border-b border-black/8">
        <div className="mx-auto max-w-[1380px] space-y-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b6e40]">
                Retail Shop Tariff
              </span>
              <h2 className="font-cinzel mt-2 text-3xl font-bold text-[#151712] sm:text-4xl">
                Floor-Wise Rates (300–400 sq.ft.)
              </h2>
            </div>
            <p className="text-sm text-[#55594f]">*Rates subject to PLC and government applicable taxes.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {retailRates.map((item) => (
              <div
                key={item.floor}
                className="group relative overflow-hidden rounded-2xl border border-black/8 bg-white p-6 shadow-sm transition duration-300 hover:border-[#c5a880] hover:shadow-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-[#c5a880]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8b6e40]">
                    {item.size}
                  </span>
                  <Store size={18} className="text-[#8b6e40]" />
                </div>

                <h4 className="font-cinzel text-xl font-bold text-[#151712]">{item.floor}</h4>
                <p className="font-cinzel mt-3 text-3xl font-extrabold text-[#8b6e40]">
                  {item.rate}
                  <span className="font-sans text-xs text-[#777a70] font-normal"> / sq.ft.</span>
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[#33362d]">{item.desc}</p>

                <div className="mt-6 grid grid-cols-2 gap-2 pt-3 border-t border-black/5">
                  <a
                    href="tel:+919718064000"
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-[#8b6e40]/30 bg-[#8b6e40]/5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#8b6e40] transition hover:border-[#8b6e40] hover:bg-[#8b6e40] hover:text-white"
                  >
                    <Phone size={13} />
                    <span>Call Now</span>
                  </a>
                  <button
                    onClick={() => onOpenEnquiry && onOpenEnquiry(item.floor)}
                    className="flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-[#8b6e40] to-[#7c5c24] py-2.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md shadow-[#8b6e40]/20 transition hover:scale-[1.02] active:scale-95"
                  >
                    <span>Enquire Now</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDEPENDENT SHOWROOM & BRAND LEASE — Dark Contrast Block */}
      <section className="bg-[#121510] text-white px-5 py-16 lg:px-8 lg:py-24 border-b border-black/8">
        <div className="mx-auto grid max-w-[1380px] gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="relative min-h-[440px] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl">
            <img src={showroom} alt="Independent Showroom" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="rounded-full bg-[#c5a880] px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-[#090b08]">
                Anchor Format
              </span>
              <p className="font-cinzel mt-2 text-3xl font-bold">1,000–10,000 sq.ft. Showrooms</p>
              <p className="mt-1 text-xs text-white/60">Multi-level flagships with double-height glass frontage</p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#c5a880]/30 bg-[#161a13] p-6 text-white sm:p-8 space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c5a880]">
                Institutional Brand Lease
              </span>
              <h3 className="font-cinzel text-3xl font-bold text-white">
                Showroom Commercial Terms
              </h3>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">Sale Rate</p>
                <p className="font-cinzel text-3xl font-bold text-[#e6d5b8]">
                  ₹26,000 <span className="font-sans text-xs text-white/40">/ sq.ft.</span>
                </p>
                <p className="mt-1 text-[10px] text-white/40">+ Preferred Location Charges (PLC) + Govt. Taxes</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">Min Monthly Rental Lock</p>
                <p className="font-cinzel text-2xl font-bold text-white">₹1,00,000 / month</p>
              </div>

              <div className="rounded-xl border border-[#c5a880]/40 bg-[#c5a880]/10 p-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c5a880]">Lease Guarantee</p>
                <p className="font-cinzel text-xl font-bold text-[#e6d5b8]">9-Year Institutional Brand Lease</p>
              </div>
            </div>

            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry("Independent Showroom")}
              className="shimmer-btn flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#a88b60] py-3.5 text-xs font-bold uppercase tracking-wider text-[#090b08]"
            >
              Request Showroom Inventory <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* EMBEDDED RATE CALCULATOR */}
      <section className="bg-[#f2efe9] px-5 py-16 lg:px-8 lg:py-20 border-b border-black/8">
        <div className="mx-auto max-w-[1380px]">
          <RateCalculator onOpenEnquiry={onOpenEnquiry} />
        </div>
      </section>

      {/* 4-STEP LEASING PROCESS */}
      <section className="bg-[#f7f5f0] px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1380px] space-y-12">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8b6e40]">
              Seamless Onboarding
            </span>
            <h2 className="font-cinzel mt-2 text-3xl font-bold text-[#151712] sm:text-4xl">
              The 4-Step Leasing Journey
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((p) => (
              <div
                key={p.step}
                className="glass-card-light rounded-2xl p-6 space-y-3"
              >
                <span className="font-cinzel text-4xl font-extrabold text-[#c5a880]">
                  {p.step}
                </span>
                <h4 className="font-cinzel text-base font-bold text-[#151712]">{p.title}</h4>
                <p className="text-xs text-[#55594f] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Leasing;
