import { useState } from "react";
import { Calculator, ArrowRight, CheckCircle, Sparkles, Building, Layers, Phone } from "lucide-react";

const rateMap = {
  ground: { label: "Ground Floor Shop", rate: 21000, minSqft: 300, maxSqft: 400, desc: "Prime street-facing retail storefront for sale" },
  first: { label: "1st Floor Shop", rate: 19000, minSqft: 300, maxSqft: 400, desc: "Fashion & lifestyle atrium retail unit for sale" },
  second: { label: "2nd Floor Shop", rate: 17000, minSqft: 300, maxSqft: 400, desc: "Specialty dining, cafe & electronics space for sale" },
  third: { label: "3rd Floor Shop", rate: 16000, minSqft: 300, maxSqft: 400, desc: "Food court & cinema corridor unit for sale" },
  showroom: { label: "Independent Showroom", rate: 26000, minSqft: 1000, maxSqft: 10000, desc: "Multi-level flagship showroom for sale with 9-yr brand lease" },
};

const RateCalculator = ({ onOpenEnquiry }) => {
  const [selectedKey, setSelectedKey] = useState("ground");
  const [sqft, setSqft] = useState(350);

  const activeFloor = rateMap[selectedKey];
  const ratePerSqft = activeFloor.rate;
  const totalCost = sqft * ratePerSqft;

  const formatINR = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#c5a880]/40 bg-white p-6 text-[#151712] shadow-2xl shadow-black/5 sm:p-10">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#c5a880]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#c5a880]/50 bg-[#c5a880]/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#8b6e40]">
            <Sparkles size={12} className="text-[#8b6e40]" /> Commercial Investment Calculator
          </div>
          <h3 className="font-cinzel text-3xl font-bold tracking-tight text-[#151712] sm:text-4xl">
            Shop Sale Price & Investment Estimator
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#55594f] sm:text-sm">
            Calculate exact unit purchase price for commercial retail shops and showrooms for sale at Sector 25, Hisar.
          </p>

          {/* Floor Selection Buttons */}
          <div className="mt-6">
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b6e40]">
              1. Select Commercial Unit Type
            </label>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {Object.entries(rateMap).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedKey(key);
                    setSqft(key === "showroom" ? 1500 : 350);
                  }}
                  className={`flex flex-col items-start rounded-xl border p-3 text-left transition ${
                    selectedKey === key
                      ? "border-[#c5a880] bg-[#121510] text-white font-semibold shadow-md ring-1 ring-[#c5a880]"
                      : "border-black/10 bg-[#f7f5f0] text-[#151712] hover:border-[#c5a880]/50 hover:bg-white"
                  }`}
                >
                  <span className="text-xs font-bold">{data.label}</span>
                  <span className={`mt-1 text-[10px] ${selectedKey === key ? "text-[#c5a880]" : "text-[#8b6e40]"}`}>
                    Sale: ₹{data.rate.toLocaleString("en-IN")} / sq.ft.
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Range Slider */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b6e40]">
                2. Select Unit Area (sq.ft.)
              </span>
              <span className="font-cinzel text-base font-bold text-[#151712]">{sqft.toLocaleString()} sq.ft.</span>
            </div>

            <input
              type="range"
              min={activeFloor.minSqft}
              max={activeFloor.maxSqft}
              step={selectedKey === "showroom" ? 100 : 10}
              value={sqft}
              onChange={(e) => setSqft(Number(e.target.value))}
              className="h-2 w-full cursor-pointer rounded-lg bg-black/10 accent-[#8b6e40]"
            />
            <div className="mt-1 flex justify-between text-[10px] text-[#777a70]">
              <span>{activeFloor.minSqft} sq.ft.</span>
              <span>{activeFloor.maxSqft} sq.ft.</span>
            </div>
          </div>
        </div>

        {/* Calculation Result Dark Contrast Card */}
        <div className="relative overflow-hidden rounded-2xl border border-[#c5a880]/40 bg-gradient-to-b from-[#181d14] to-[#0f120d] p-6 text-white shadow-2xl sm:p-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c5a880]">Investment Breakdown</span>
              <h4 className="font-cinzel text-xl font-bold text-white">{activeFloor.label}</h4>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c5a880]/20 text-[#c5a880]">
              <Building size={20} />
            </div>
          </div>

          <div className="mt-5 space-y-3 text-xs">
            <div className="flex justify-between text-white/70">
              <span>Sale Price per sq.ft.</span>
              <span className="font-semibold text-white">₹{ratePerSqft.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Selected Unit Size</span>
              <span className="font-semibold text-white">{sqft} sq.ft.</span>
            </div>
            <div className="flex justify-between text-white/70">
              <span>Investment Return Option</span>
              <span className="font-semibold text-[#c5a880]">9-Year Brand Lease Rental</span>
            </div>

            <div className="my-4 border-t border-dashed border-white/15 pt-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Total Unit Sale Price</span>
              <p className="font-cinzel mt-1 text-3xl font-extrabold text-[#e6d5b8] sm:text-4xl">
                {formatINR(totalCost)}
              </p>
              <p className="mt-1 text-[10px] text-white/40">*Exclusive of PLC, GST & registration charges</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href="tel:+919718064000"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-[#c5a880]/50 bg-white/10 py-3.5 text-xs font-bold uppercase tracking-wider text-[#e6d5b8] backdrop-blur-md transition hover:bg-white/20"
            >
              <Phone size={14} /> Call: 9718064000
            </a>
            <button
              onClick={() => onOpenEnquiry && onOpenEnquiry(`Purchase Enquiry: ${activeFloor.label}`)}
              className="shimmer-btn flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#a88b60] py-3.5 text-xs font-bold uppercase tracking-wider text-[#090b08] shadow-lg shadow-[#c5a880]/20 transition hover:opacity-95"
            >
              Inquire To Purchase <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateCalculator;
