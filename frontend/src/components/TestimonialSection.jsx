import { useEffect, useState } from "react";
import { Sparkles, Star, Quote, Play, X, Video, Loader2, MessageSquare } from "lucide-react";
import API_URL from "../api";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL || "http://localhost:5000"}/api/testimonials`);
      const data = await res.json();
      if (res.ok && data.success) {
        setTestimonials(data.data || []);
      } else {
        setError("Failed to load testimonials.");
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError("Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f5f0] px-5 py-16 lg:px-8 lg:py-24 border-b border-black/8">
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#c5a880]/15 blur-3xl" />

      <div className="relative mx-auto max-w-[1380px] space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#8b6e40]/30 bg-[#8b6e40]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#8b6e40]">
            <Sparkles size={12} className="text-[#8b6e40]" /> Dynamic Video Reviews & Client Feedback
          </div>

          <h2 className="font-cinzel text-3xl font-extrabold text-[#151712] sm:text-4xl lg:text-5xl">
            Watch Real Investor & <br />
            <span className="gold-gradient-text">Client Video Reviews.</span>
          </h2>

          <p className="text-xs text-[#55594f] leading-relaxed sm:text-sm">
            Hear directly from commercial buyers, brand lease partners, and NRI investors who have chosen Connaught Place Hisar.
          </p>
        </div>

        {/* Dynamic Testimonials Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-black/50">
            <Loader2 className="animate-spin mb-3 text-[#8c734b]" size={32} />
            <p className="text-xs font-bold">Loading live video reviews from MongoDB...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">
            <p className="text-sm font-semibold">{error}</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="p-16 text-center border border-dashed border-black/15 bg-white rounded-3xl">
            <MessageSquare className="mx-auto mb-3 text-black/30" size={40} />
            <p className="text-base font-bold text-[#151712]">No client testimonials uploaded yet</p>
            <p className="text-xs text-black/60 mt-1">Add video reviews from the Admin Dashboard Testimonial Manager.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((item) => (
              <div
                key={item._id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/10 border-t-4 border-t-[#c5a880] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#c5a880] hover:shadow-2xl"
              >
                {/* Video Header Card Area if Video Attached */}
                {item.videoUrl ? (
                  <div
                    onClick={() => setActiveVideoUrl(item.videoUrl)}
                    className="relative h-44 w-full bg-black cursor-pointer overflow-hidden group/vid"
                  >
                    {item.videoUrl.endsWith(".mp4") || item.videoUrl.startsWith("data:video") ? (
                      <video
                        src={item.videoUrl}
                        muted
                        playsInline
                        className="h-full w-full object-cover opacity-80 transition duration-500 group-hover/vid:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-[#121510] flex items-center justify-center">
                        <Video size={40} className="text-[#c5a880]/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Centered Big Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c5a880] text-black shadow-lg shadow-black/50 transition duration-300 group-hover/vid:scale-110">
                        <Play size={20} className="ml-1 fill-black" />
                      </div>
                    </div>

                    <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#e6d5b8] backdrop-blur-md">
                      🎬 Video Feedback
                    </span>
                  </div>
                ) : (
                  <div className="p-6 pb-0 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#c5a880]">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} size={14} fill="#c5a880" />
                      ))}
                    </div>
                    <Quote size={24} className="text-[#c5a880]/30" />
                  </div>
                )}

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {item.videoUrl && (
                      <div className="flex items-center gap-1 text-[#c5a880] mb-3">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} size={13} fill="#c5a880" />
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-[#33362e] leading-relaxed italic mb-5">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Profile Footer */}
                  <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="h-10 w-10 rounded-full object-cover border border-[#c5a880]/40 shadow-xs"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8b6e40]/15 text-[#8b6e40] font-bold text-sm">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-xs text-[#151712]">{item.name}</h4>
                        <p className="text-[10px] text-[#8c734b] font-semibold">{item.role || "Investor"}</p>
                      </div>
                    </div>

                    {item.videoUrl && (
                      <button
                        onClick={() => setActiveVideoUrl(item.videoUrl)}
                        className="text-[10px] font-bold uppercase tracking-wider text-[#8c734b] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        Play <Play size={10} className="fill-[#8c734b]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal Popup */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-black shadow-2xl">
            <button
              onClick={() => setActiveVideoUrl(null)}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black border border-white/20"
            >
              <X size={20} />
            </button>

            <div className="relative aspect-video w-full flex items-center justify-center bg-black">
              {activeVideoUrl.endsWith(".mp4") || activeVideoUrl.startsWith("data:video") || activeVideoUrl.startsWith("/") ? (
                <video
                  src={activeVideoUrl}
                  controls
                  autoPlay
                  className="h-full w-full object-contain"
                />
              ) : (
                <iframe
                  src={activeVideoUrl}
                  title="Client Video Review"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialSection;
