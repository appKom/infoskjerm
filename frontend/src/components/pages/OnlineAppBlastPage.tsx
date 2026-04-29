import { motion } from 'framer-motion';
import { Star, Download, Ticket } from 'lucide-react';

export const OnlineAppBlastPage = () => (
  <div className="h-full flex items-center relative overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 bg-[#07324a]" />
    <div className="absolute inset-0 bg-gradient-to-br from-[#0B5374] via-[#07324a] to-[#041f2e]" />
    {/* Subtle radial glow */}
    <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-online-yellow/10 blur-[120px] pointer-events-none" />

    {/* Left column */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="z-10 flex-1 pl-32 pr-8 flex flex-col justify-center"
    >
      {/* Version badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="bg-online-yellow text-[#07324a] text-base font-bold px-4 py-1.5 rounded-full uppercase tracking-widest leading-none flex items-center">
          Ny versjon
        </span>
        <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
          <span className="text-white font-bold text-base leading-none">5.0</span>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-online-yellow text-online-yellow" />
            ))}
          </div>
          <span className="text-white/50 text-sm leading-none">App Store</span>
        </div>
      </motion.div>

      {/* Headline */}
      <div className="mb-2">
        <h1 className="text-7xl font-black text-white leading-none tracking-tight">
          Online-Appen
        </h1>
        <div className="flex items-end gap-4">
          <span
            className="font-black leading-none"
            style={{
              fontSize: '9rem',
              background: 'linear-gradient(135deg, #F9B759 0%, #f9d18f 50%, #F9B759 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 0.9,
            }}
          >
            2.0
          </span>
        </div>
      </div>

      <p className="text-white/70 text-2xl mb-8 max-w-xl">
        Råere, raskere og bedre enn noen gang.
      </p>

      {/* Påmelding callout */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-center gap-4 bg-online-yellow/10 border border-online-yellow/40 rounded-2xl px-4 py-4 mb-8 max-w-xl"
      >
        <div className="w-14 h-14 rounded-xl bg-online-yellow/20 flex items-center justify-center flex-shrink-0">
          <Ticket className="w-7 h-7 text-online-yellow" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-online-yellow text-xs font-bold uppercase tracking-widest leading-none">NYHET</span>
          <span className="text-white font-semibold text-2xl leading-tight">Støtter påmelding til arrangementer</span>
        </div>
      </motion.div>

      {/* Download section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="flex items-stretch gap-6"
      >
        <div className="flex flex-col justify-between self-stretch gap-4">
          <img className="w-44" src="online-app/download-app-store.svg" alt="App Store" />
          <img className="w-44" src="online-app/download-google-play.svg" alt="Google Play" />
        </div>

        <div className="flex bg-black border border-[#a6a6a6] rounded-xl items-center p-2 gap-4">
          <img
            className="w-[115px] aspect-square"
            src="/qr-codes/online-app-white.svg"
            alt="Online-appen QR kode"
          />
          <div className="flex flex-col gap-1 items-center">
            <Download className="w-10 h-10 text-white" />
            <span className="text-white text-base font-medium leading-tight w-24 text-center">
              Skann for å laste ned
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>

    {/* Right column — phones */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="z-10 flex-shrink-0 -ml-16"
    >
      <FloatingImage src="online-app/online-app-2-shots.png" height="1200px" delay={0} />
    </motion.div>
  </div>
);

const FloatingImage = ({ src, height, delay }: {
  src: string;
  height: string;
  delay: number;
}) => (
  <motion.img
    animate={{ y: [0, -12, 0] }}
    transition={{
      y: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      },
    }}
    style={{ height }}
    className="object-contain drop-shadow-[0_60px_80px_rgba(0,0,0,0.5)]"
    src={src}
  />
);
