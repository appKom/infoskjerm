import { motion } from "framer-motion"

// Pre-generate positions and sizes for crosses and stars
const crosses = Array.from({ length: 12 }, () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  fontSize: `${Math.random() * 20 + 10}px`,
}))

const stars = Array.from({ length: 20 }, () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
}))

export const RavioliPage = () => {
  return (
    <div className="h-full bg-gradient-radial from-amber-100 via-amber-200 to-amber-300 flex items-center justify-center overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
        <div className="relative">
          {/* Halo effect */}
          <motion.div
            className="absolute inset-0 bg-yellow-300 rounded-full blur-2xl opacity-75"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* Main image */}
          <motion.div
            className="relative z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <img
              src="/ravioli/ravioli.png"
              alt="Holy Ravioli"
              className=""
            />
          </motion.div>
        </div>

        <motion.h1
          className="mt-8 text-4xl font-bold text-center text-yellow-900 drop-shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Den hellige Ravioli
        </motion.h1>
        <motion.p
          className="mt-4 text-xl text-center text-yellow-800 max-w-md mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Du er nå velsignet av den hellige ravioli. Måtte den gi deg styrke og mot i hverdagen.
        </motion.p>
      </motion.div>

      {/* Floating crosses */}
      {crosses.map((cross, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-600 opacity-50"
          style={{
            top: cross.top,
            left: cross.left,
            fontSize: cross.fontSize,
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          ✝
        </motion.div>
      ))}

      {/* Twinkling stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i + crosses.length}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          style={{
            top: star.top,
            left: star.left,
          }}
          animate={{ opacity: [0, 1, 0], y: [0, -20, 0] }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      ))}
    </div>
  )
}
