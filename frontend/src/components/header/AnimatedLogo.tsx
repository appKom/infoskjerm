import { AnimatePresence, motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useDarkMode } from "../utils/DarkModeProvider"

const LOGO_INTERVAL_SECONDS = 7 // Time in seconds between logo changes

const logos = [
  {
    src: '/online/online_logo_blue.svg',
    darkSrc: '/online/online_logo_white.svg',
    alt: 'Online logo',
  },
]

export const AnimatedLogo = () => {
  const [currentLogo, setCurrentLogo] = useState(0)
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const logoInterval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % logos.length)
    }, 1000 * LOGO_INTERVAL_SECONDS)
    return () => clearInterval(logoInterval)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={currentLogo}
        src={isDarkMode ? logos[currentLogo].darkSrc : logos[currentLogo].src} // Switch src based on dark mode
        alt={logos[currentLogo].alt}
        className='w-[150px]'
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
      />
    </AnimatePresence>
  )
}