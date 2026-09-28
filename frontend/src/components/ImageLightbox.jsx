import { useState, useEffect } from "react";
import { X, ZoomIn, ZoomOut, Download, Sparkles } from "lucide-react";

const ImageLightbox = ({ isOpen, onClose, imageSrc, title, description }) => {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setZoom(1);
  }, [imageSrc]);

  if (!isOpen || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6">
      {/* Dark backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/92 backdrop-blur-xl transition-opacity duration-300"
      />

      {/* Main Container */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0f120d] shadow-2xl">
        {/* Header Controls */}
        <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-5 py-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#c5a880]">
              <Sparkles size={11} /> High-Resolution Visual
            </span>
            <h4 className="font-cinzel text-lg font-bold text-white sm:text-xl">
              {title || "Connaught Place Hisar"}
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.25, 2.5))}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.25, 0.75))}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
            <a
              href={imageSrc}
              download="ConnaughtPlaceHisar-Visual.jpg"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 transition hover:bg-[#c5a880] hover:text-black"
              title="Download Image"
            >
              <Download size={16} />
            </a>
            <button
              onClick={onClose}
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/20 text-red-400 transition hover:bg-red-500 hover:text-white"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Image viewport */}
        <div className="relative flex flex-1 items-center justify-center overflow-auto p-4 max-h-[70vh]">
          <img
            src={imageSrc}
            alt={title || "Project visual"}
            style={{ transform: `scale(${zoom})`, transition: "transform 0.2s ease-out" }}
            className="max-h-[65vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
          />
        </div>

        {/* Footer info */}
        {description && (
          <div className="border-t border-white/10 bg-black/40 px-6 py-3 text-xs text-white/60">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageLightbox;
