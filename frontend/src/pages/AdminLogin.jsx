import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import API_URL from "../api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL || "http://localhost:5000"}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.user));
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Cannot connect to server. Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#151712] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative Light Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#c5a880]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#566f35]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Badge Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c5a880]/40 bg-[#c5a880]/15 text-[#7a623a] text-[11px] font-bold tracking-[0.25em] uppercase mb-4 shadow-sm">
            <Sparkles size={13} className="text-[#8c734b]" />
            Connaught Place Hisar
          </div>
          <h1 className="font-cinzel text-3xl font-extrabold text-[#151712] tracking-tight">
            Admin Management Portal
          </h1>
          <p className="text-xs text-[#151712]/60 mt-2">
            Light theme login for commercial desk managers
          </p>
        </div>

        {/* Card Container - Clean White Light Theme */}
        <div className="bg-white/90 backdrop-blur-xl border border-[#c5a880]/30 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-black/5 relative">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#c5a880]/15 border border-[#c5a880]/40 text-[#8c734b] mx-auto mb-6 shadow-sm">
            <ShieldCheck size={26} />
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl border border-red-500/30 bg-red-50 text-red-600 text-xs text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8c734b] mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" size={17} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@connaughtplace.com"
                  className="w-full bg-[#f9f8f4] border border-black/10 rounded-xl py-3 pl-11 pr-4 text-xs text-black placeholder-black/40 focus:outline-none focus:border-[#8c734b] focus:ring-1 focus:ring-[#8c734b] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#8c734b] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" size={17} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#f9f8f4] border border-black/10 rounded-xl py-3 pl-11 pr-4 text-xs text-black placeholder-black/40 focus:outline-none focus:border-[#8c734b] focus:ring-1 focus:ring-[#8c734b] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-6 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-[#121510] hover:bg-[#252922] transition shadow-lg shadow-black/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> Authenticating...
                </>
              ) : (
                <>
                  Sign In to Dashboard <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-black/10 text-center">
            <p className="text-[11px] text-black/50">
              Default Credentials: <code className="text-[#8c734b] bg-black/5 px-1.5 py-0.5 rounded font-mono">admin@connaughtplace.com</code> / <code className="text-[#8c734b] bg-black/5 px-1.5 py-0.5 rounded font-mono">admin123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
