import { memo } from "react";

export const BlobBackground = memo(function BlobBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-background">
      {/* Top Left Blob */}
      <div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-pink-300/40 to-purple-300/40 blur-3xl animate-blob mix-blend-multiply opacity-70" />
      
      {/* Bottom Right Blob */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-pink-400/30 to-orange-300/30 blur-3xl animate-blob animation-delay-2000 mix-blend-multiply opacity-70" />
      
      {/* Center Blob */}
      <div className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-bl from-purple-400/20 to-pink-300/30 blur-3xl animate-blob animation-delay-4000 mix-blend-multiply opacity-70" />
      
      {/* Grain Overlay for Texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
    </div>
  );
});
