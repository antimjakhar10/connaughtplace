import { useState } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

import haldiramLogo from "../assets/haldirams.jpeg";
import kfcLogo from "../assets/kfc.jpeg";
import pvrLogo from "../assets/pvr.jpeg";
import lordLogo from "../assets/lord-drinks.png";
import brandGrid from "../assets/brand-grid.jpeg";

const brandList = [
  { name: "PVR Cinemas", category: "Entertainment", logo: pvrLogo, desc: "Multiplex Experience" },
  { name: "Haldiram's", category: "F&B", logo: haldiramLogo, desc: "Family Dining & Sweets" },
  { name: "KFC", category: "F&B", logo: kfcLogo, desc: "Global Fast Food Leader" },
  { name: "Lord of the Drinks", category: "F&B", logo: lordLogo, desc: "Premium Resto-Bar" },
];

const categories = ["All", "Entertainment", "F&B", "Retail"];

const BrandMarquee = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredBrands =
    activeTab === "All"
      ? brandList
      : brandList.filter((b) => b.category === activeTab);

  return (
    <div className="space-y-8">
      {/* Category Tabs Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8b6e40]">
            Curated Tenant Mix
          </span>
          <h3 className="font-cinzel text-2xl font-bold text-[#151712] sm:text-3xl">
            Brands Showcase & Partnerships
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                activeTab === cat
                  ? "bg-[#121510] text-[#e6d5b8] shadow-md"
                  : "border border-black/10 bg-white text-[#55594f] hover:bg-black/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Logo Cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        {filteredBrands.map((brand) => (
          <div
            key={brand.name}
            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-black/8 bg-white p-6 text-center shadow-sm transition hover:border-[#c5a880] hover:shadow-xl"
          >
            <div className="mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#f7f5f0] p-3 shadow-inner transition duration-500 group-hover:scale-105">
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h4 className="font-cinzel text-sm font-bold text-[#151712]">{brand.name}</h4>
            <span className="mt-1 text-[10px] uppercase tracking-wider text-[#8b6e40]">
              {brand.desc}
            </span>
          </div>
        ))}
      </div>

      {/* Brand Matrix Image Showcase Card */}
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-xl">
        <div className="mb-2 bg-[#121510] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e6d5b8] flex justify-between items-center rounded-t-lg">
          <span>Project Presentation Deck Roster</span>
          <span className="text-white/60">100+ Brands Target Mix</span>
        </div>
        <img
          src={brandGrid}
          alt="Brands Mix Presentation"
          className="w-full rounded-b-lg object-cover"
        />
      </div>
    </div>
  );
};

export default BrandMarquee;
