import { motion } from "framer-motion"

// Helper to generate random motion properties
const getRandomAnimation = () => ({
  x: [Math.random() * 50 - 25, Math.random() * 50 - 25],
  y: [Math.random() * 50 - 25, Math.random() * 50 - 25],
  opacity: [0.5, 1, 0.5],
})

// List of holy symbols
const symbols = ["✝", "✡", "☯", "☦", "☸", "☪", "☮"]

// Pre-generate positions, sizes, and types for holy symbols
const holySymbols = Array.from({ length: 30 }, () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  fontSize: `${Math.random() * 20 + 10}px`,
  symbol: symbols[Math.floor(Math.random() * symbols.length)],
  animation: getRandomAnimation(),
}))

const stars = Array.from({ length: 75 }, () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animation: getRandomAnimation(),
}))

export const RavioliPage = () => {
  return (
    <div className="h-full bg-gradient-radial from-amber-100 via-amber-200 to-amber-300 flex items-center justify-center overflow-hidden relative font-cardo">
      
      {/* Floating holy symbols */}
      {holySymbols.map((symbol, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-600 opacity-50 z-0"
          style={{
            top: symbol.top,
            left: symbol.left,
            fontSize: symbol.fontSize,
          }}
          animate={symbol.animation}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        >
          {symbol.symbol}
        </motion.div>
      ))}

      {/* Twinkling stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i + stars.length}
          className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full z-0"
          style={{
            top: star.top,
            left: star.left,
          }}
          animate={star.animation}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />
      ))}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="relative z-10">
        <div className="relative">
          {/* Halo effect */}
          <motion.div
            className="absolute inset-0 bg-yellow-300 rounded-full blur-2xl opacity-75 z-0"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* Main image */}
          <motion.div
            className="relative z-20"
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <img
              src="/ravioli/ravioli.png"
              alt="Holy Ravioli"
              className="w-[512px] mx-auto"
            />
          </motion.div>
        </div>

        <motion.h1
          className="mt-8 text-8xl font-bold text-center text-yellow-900 drop-shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Holy Ravioli
        </motion.h1>
        <motion.p
          className="mt-8 text-4xl text-center text-yellow-800 max-w-lg mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          Du er nå velsignet av den Hellige Ravioli. Måtte den gi deg styrke, mot og disiplin i hverdagen.
        </motion.p>
      </motion.div>
    </div>
  )
}
