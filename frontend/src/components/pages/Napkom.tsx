import { motion } from "framer-motion";
import { StarSky } from "../napkom/StarSky";

const AMOUNT_OF_STARS = 500;

export const NapkomPage = () => (
  <div className="h-full flex justify-around items-center relative overflow-hidden w-full">
    <StarSky starCount={AMOUNT_OF_STARS} />
    {/* Dingling Jon Blund */}
    <img src="/napkom/jon-blund.png" alt="Jon Blund" className="absolute top-0 right-64 w-56 animate-swing" />

    {/* Napkom logo */}
    <img src="/napkom/NapKom.svg" alt="Napkom logo" className="absolute bottom-10 right-10 w-32 z-30" />
    
    {/* Message */}
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="z-20 text-white text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, }}
      >
        <div className="text-8xl font-bold">
          Sov godt i natt
        </div>
        <div className="text-3xl mt-10">
          Presentert av <span className="text-online-yellow font-bold">Napkom</span>, i samarbeid med <span className="text-online-yellow font-bold">Jon Blund</span>.
        </div>
      </motion.div>
    </div>
  </div >
);
