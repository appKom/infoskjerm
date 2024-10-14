import { motion } from 'framer-motion';
import { useDarkMode } from '../utils/DarkModeProvider';

export const OnlineAppBlastPage = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="h-full flex justify-around items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br dark:from-[#111827] dark:to-[#0B5374] from-white via-white via-60% to-online-yellow animate-gradient-x" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl z-10"
      >
        <h1 className="text-6xl font-bold mb-6 leading-tight dark:text-white text-online-blue">
          Visste du at det finnes folk som ikke har <span className="text-online-yellow">Online-Appen</span>?
        </h1>
        <p className="text-xl mb-8 dark:text-white">
          Dette er det virkelig på tide å endre på!
        </p>
        <div className='flex gap-6'>
          <img className='h-16' src="online-app/download-app-store.svg" />
          <img className='h-16' src="online-app/download-google-play.svg" />
        </div>
        <div className="relative">
          {/* Arrow */}
          <img className='w-20 absolute top-[50px] left-[175px] rotate-[20deg]' src="/arrows/arrow1.svg" />
          
          {/* QR code */}
          <img
            className="w-[150px] h-[150px] mt-8"
            src={isDarkMode ? "/qr-codes/online-app-white.svg" : "/qr-codes/online-app-blue.svg"}
            alt="Online-appen QR kode"
          />
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="z-10"
      >
        <div className='flex gap-4 items-end'>
          <FloatingImage
            src="online-app/iphone-1.png"
            height="700px"
            delay={0}
          />
          <FloatingImage
            src="online-app/iphone-2.png"
            height="600px"
            delay={1}
          />
          <FloatingImage
            src="online-app/iphone-3.png"
            height="500px"
            delay={2}
          />
        </div>
      </motion.div>
    </div>
  );
}

const FloatingImage = ({ src, height, delay }: { 
  src: string;
  height: string;
  delay: number;
}) => (
  <motion.img
    animate={{ y: [0, -10, 0] }}
    transition={{
      y: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delay,
      },
    }}
    style={{ height }}
    className='object-contain drop-shadow-[0_150px_150px_rgba(0,0,0,0.25)]'
    src={src}
  />
);
