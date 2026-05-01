import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { BlobBackground } from "@/components/layout/BlobBackground";
import { Sparkles, Heart, LogIn, LogOut, Loader2, User, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

function LoginForm({ onLogin }: { onLogin: (name: string) => void }) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onLogin(name.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          data-testid="input-name"
          className="w-full px-4 py-3 rounded-xl border-2 border-border bg-white/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-body text-base"
          autoFocus
        />
      </div>
      <button
        type="submit"
        disabled={!name.trim()}
        data-testid="button-login-submit"
        className="group relative w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-pink-500 text-white px-8 py-4 rounded-2xl font-display text-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_28px_-4px_rgba(255,50,120,0.45)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        <LogIn className="w-6 h-6 relative z-10" />
        <span className="relative z-10">Enter PinkSpace</span>
      </button>
    </form>
  );
}

export default function Home() {
  const { user, isLoading, isAuthenticated, login, logout, isLoggingOut } = useAuth();
  const [hasFiredConfetti, setHasFiredConfetti] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !hasFiredConfetti) {
      const end = Date.now() + 2500;
      const frame = () => {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ["#ff5ca8", "#ff7eb3", "#ffb3d1", "#ff3385", "#ff8fab"],
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ["#ff5ca8", "#ff7eb3", "#ffb3d1", "#ff3385", "#ff8fab"],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
      setHasFiredConfetti(true);
    }
  }, [isAuthenticated, hasFiredConfetti]);

  const handleLogin = (name: string) => {
    login({
      id: crypto.randomUUID(),
      firstName: name,
      email: `${name.toLowerCase().replace(/\s+/g, ".")}@pinkspace.app`,
    });
    setShowLoginForm(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-8">
      <BlobBackground />

      <main className="w-full max-w-md mx-auto relative z-10">
        <AnimatePresence mode="wait">

          {/* Loading State */}
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center justify-center gap-5 py-20"
            >
              <div className="relative w-16 h-16">
                <Heart className="absolute inset-0 w-16 h-16 text-primary opacity-20 animate-ping" />
                <Heart className="w-16 h-16 text-primary fill-primary animate-float" />
              </div>
              <p className="text-xl font-display text-primary animate-pulse">Loading...</p>
            </motion.div>
          )}

          {/* Login State */}
          {!isLoading && !isAuthenticated && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
              className="glass-card rounded-3xl overflow-hidden"
              data-testid="card-login"
            >
              <div className="h-2 bg-gradient-to-r from-pink-400 via-primary to-accent" />

              <div className="p-8 sm:p-10 text-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-pink-100 to-primary/20 flex items-center justify-center shadow-md rotate-3"
                >
                  <Sparkles className="w-10 h-10 text-primary -rotate-3" />
                </motion.div>

                <h1 className="text-4xl sm:text-5xl font-display text-foreground mb-3 leading-tight text-balance">
                  Welcome to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    PinkSpace
                  </span>
                </h1>

                <p className="text-muted-foreground text-base mb-8 font-body leading-relaxed">
                  A vibrant, playful space just for you. Sign in to get started!
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {["Playful", "Secure", "Magical"].map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                    >
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      {label}
                    </span>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {showLoginForm ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <LoginForm onLogin={handleLogin} />
                      <button
                        onClick={() => setShowLoginForm(false)}
                        className="mt-3 text-sm text-muted-foreground hover:text-primary transition-colors font-body"
                      >
                        Cancel
                      </button>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="login-btn"
                      onClick={() => setShowLoginForm(true)}
                      data-testid="button-login"
                      className="group relative w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-pink-500 text-white px-8 py-4 rounded-2xl font-display text-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_28px_-4px_rgba(255,50,120,0.45)] active:scale-95"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                      <LogIn className="w-6 h-6 relative z-10" />
                      <span className="relative z-10">Log In to PinkSpace</span>
                    </motion.button>
                  )}
                </AnimatePresence>

                <p className="mt-5 text-sm text-muted-foreground font-body">
                  Pure React · No server needed
                </p>
              </div>
            </motion.div>
          )}

          {/* Profile / Logged-in State */}
          {!isLoading && isAuthenticated && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.45, duration: 0.7 }}
              className="glass-card rounded-3xl overflow-hidden"
              data-testid="card-profile"
            >
              <div className="h-2 bg-gradient-to-r from-pink-400 via-primary to-accent" />

              <div className="relative px-8 pt-10 pb-6 text-center bg-gradient-to-b from-primary/10 to-transparent">
                <div className="relative inline-block mb-4">
                  <div className="w-28 h-28 rounded-full ring-4 ring-white shadow-xl overflow-hidden">
                    {user?.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt={user.firstName || "User"}
                        className="w-full h-full object-cover"
                        data-testid="img-avatar"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-pink-200 to-primary/40 flex items-center justify-center">
                        <User className="w-12 h-12 text-primary" />
                      </div>
                    )}
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.35, type: "spring", bounce: 0.6 }}
                    className="absolute -bottom-1 -right-1 bg-accent text-white p-1.5 rounded-full shadow-md"
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                </div>

                <h2 className="text-3xl font-display text-foreground mb-1" data-testid="text-username">
                  Hi, {user?.firstName || "Beautiful"}!
                </h2>
                <p className="text-muted-foreground font-body">
                  Welcome back — we missed you!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 px-8 pb-6">
                <div className="bg-secondary/60 rounded-2xl p-4 text-center">
                  <div className="text-primary font-display text-2xl font-bold mb-0.5">100%</div>
                  <div className="text-sm font-medium text-secondary-foreground">Magical</div>
                </div>
                <div className="bg-secondary/60 rounded-2xl p-4 text-center">
                  <div className="text-primary font-display text-2xl font-bold mb-0.5">∞</div>
                  <div className="text-sm font-medium text-secondary-foreground">Good Vibes</div>
                </div>
              </div>

              <div className="px-8 pb-8">
                <button
                  onClick={() => logout()}
                  disabled={isLoggingOut}
                  data-testid="button-logout"
                  className="group w-full inline-flex items-center justify-center gap-2 bg-white/60 hover:bg-white text-foreground border-2 border-border px-6 py-3.5 rounded-2xl font-display text-lg transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  ) : (
                    <>
                      <LogOut className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span>Sign out</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
