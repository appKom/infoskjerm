import { motion } from 'framer-motion';
import { useDarkMode } from '../utils/DarkModeProvider';

export const OnlineAppBlastPage = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen flex justify-around items-center relative overflow-hidden">
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
        <div className="relative pt-16 justify-center flex">
          {/* Top-left arrow */}
          <img className='w-24 absolute top-[40px] left-[180px] rotate-[210deg]' src="/arrows/arrow1.svg" alt="" />
          
          {/* Top-right arrow */}
          <img className='w-24 absolute top-0 right-[200px] -rotate-[40deg]' src="/arrows/arrow2.svg" alt="" />
          
          {/* Bottom-left arrow */}
          <img className='w-24 absolute -bottom-[120px] left-[250px] rotate-[130deg]' src="/arrows/arrow3.svg" alt="" />
          
          {/* Bottom-right arrow */}
          <img className='w-24 absolute bottom-[100px] right-[125px] rotate-[5deg]' src="/arrows/arrow4.svg" alt="" />
          
          {/* QR code */}
          <img
            className="w-[250px] h-[250px]"
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
        <motion.img
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="h-[700px] object-contain drop-shadow-2xl"
          // src="https://pngimg.com/d/iphone_12_PNG23.png"
          src='online-app/ep.png'
          alt="Online App on iPhone"
        />
      </motion.div>
    </div>
  );
}