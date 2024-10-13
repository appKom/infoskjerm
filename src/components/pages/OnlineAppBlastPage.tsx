import { motion } from 'framer-motion';

export const OnlineAppBlastPage = () => {
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
          Hvis du er blant dem, så er det virkelig på tide å endre på det.
        </p>
        <div className="flex flex-row gap-6">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="rounded-lg bg-[#f3f4f6] shadow-lg p-4 w-[200px] h-[200px] flex items-center justify-center"
          >
            <img className="h-full" src="/debug/debug-gray-qr-code.svg" alt="Debug QR Code" />
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="rounded-lg bg-[#f3f4f6] shadow-lg p-4 w-[200px] h-[200px] flex items-center justify-center"
          >
            <img className="h-full" src="/debug/debug-gray-qr-code.svg" alt="Debug QR Code" />
          </motion.div>
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