import { useState } from "react";
import { Sparkles, Store } from "lucide-react";

import haldiramLogo from "../assets/haldirams.jpeg";
import kfcLogo from "../assets/kfc.jpeg";
import pvrLogo from "../assets/pvr.jpeg";
import lordLogo from "../assets/lord-drinks.png";

const featuredBrands = [
  { name: "PVR Cinemas", category: "Entertainment", logo: pvrLogo, desc: "Multiplex Experience" },
  { name: "Haldiram's", category: "F&B", logo: haldiramLogo, desc: "Family Dining & Sweets" },
  { name: "KFC", category: "F&B", logo: kfcLogo, desc: "Global Fast Food Leader" },
  { name: "Lord of the Drinks", category: "F&B", logo: lordLogo, desc: "Premium Resto-Bar" },
];

const retailBrandLogos = [
  { name: "Puma", logo: "/puma-logo.webp", category: "Retail" },
  { name: "Pepe Jeans", logo: "/pepejeans-logo.jpg", category: "Retail" },
  { name: "Being Human", logo: "/being-human-logo.jpg", category: "Retail" },
  { name: "United Colors of Benetton", logo: "/ucob-logo.jpg", category: "Retail" },
  { name: "Adidas", logo: "/adidas-logo.jpg", category: "Retail" },
  { name: "Mufti", logo: "/mufti-logo.jpg", category: "Retail" },
  { name: "Aurelia", logo: "/aurelia-logo.jpg", category: "Retail" },
  { name: "Numero Uno", logo: "/numerouno-logo.jpg", category: "Retail" },
  { name: "Asics", logo: "/asics-logo.jpg", category: "Retail" },
  { name: "Rangriti", logo: "/rangriti-logo.jpg", category: "Retail" },
  { name: "Jack & Jones", logo: "/jackandjones-logo.jpg", category: "Retail" },
  { name: "Spykar", logo: "/spykar-logo.jpg", category: "Retail" },
  { name: "Skechers", logo: "/skechers-logo.jpg", category: "Retail" },
  { name: "Shree", logo: "/shree-logo.jpg", category: "Retail" },
  { name: "Bata", logo: "/bata-logo.jpg", category: "Retail" },
  { name: "Lotto", logo: "/lotto-logo.jpg", category: "Retail" },
  { name: "Nike", logo: "/nike-logo.jpg", category: "Retail" },
  { name: "Reebok", logo: "/reebok-logo.jpg", category: "Retail" },
  { name: "W", logo: "/W-logo.jpg", category: "Retail" },
  { name: "Hush Puppies", logo: "/hushpuppies-logo.jpg", category: "Retail" },
  { name: "Junior Killer", logo: "/juniorkiller-logo.jpg", category: "Retail" },
  { name: "New Balance", logo: "/newbalance-logo.jpg", category: "Retail" },
  { name: "Mini Klub", logo: "/miniklub-logo.jpg", category: "Retail" },
  { name: "Levi's", logo: "/levis-logo.jpg", category: "Retail" },
];

const categories = ["All", "Entertainment", "F&B", "Retail"];

const BrandMarquee = () => {
  const [activeTab, setActiveTab] = useState("All");

  const showFeatured = activeTab === "All" || activeTab === "Entertainment" || activeTab === "F&B";
  const showRetail = activeTab === "All" || activeTab === "Retail";

  const filteredFeatured =
    activeTab === "All"
      ? featuredBrands
      : featuredBrands.filter((b) => b.category === activeTab);

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
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
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

      {/* Featured Anchor Partners (PVR, Haldiram's, KFC, Lord of the Drinks) */}
      {showFeatured && filteredFeatured.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8b6e40]">
            <Sparkles size={14} />
            <span>Anchor & Entertainment Partners</span>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            {filteredFeatured.map((brand) => (
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
        </div>
      )}

      {/* High-Resolution Individual Retail Brand Matrix */}
      {showRetail && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-t border-black/8 pt-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8b6e40]">
              <Store size={14} />
              <span>Retail & Fashion Brand Roster (100+ Brands Target Mix)</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#777a70]">
              High-Visibility Frontage
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
            {retailBrandLogos.map((brand) => (
              <div
                key={brand.name}
                className="group relative flex h-28 sm:h-32 w-full items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c5a880] hover:shadow-2xl"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandMarquee;
