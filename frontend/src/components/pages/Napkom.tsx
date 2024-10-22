import { StarSky } from "../napkom/StarSky";

const AMOUNT_OF_STARS = 500;

export const NapkomPage = () => (
  <div className="h-full flex justify-around items-center relative overflow-hidden w-full">
    <StarSky starCount={AMOUNT_OF_STARS} />

    {/* Dingling Jon Blund */}
    <img src="/napkom/dingling-jon-blund.png" alt="Jon Blund" className="absolute top-0 right-32 z-10 w-56 animate-swing" />

    {/* Napkom logo */}
    <img src="/napkom/napkom-logo.svg" alt="Napkom logo" className="absolute bottom-8 right-8 w-32 z-30" />

    {/* Message */}
    <div className="absolute inset-0 flex items-center flex-col justify-center z-20 text-white">
      <img src="/napkom/jon-blund.png" alt="" className="h-2/5 m-10" style={{ boxShadow: "0 2em 4em 1em black" }} />

      <div className="relative text-8xl font-bold mt-12">
        Sov godt i natt
        {[0, 2, 4].map((animationOffset, index) => <b
          key={index}
          className="absolute text-white text-5xl -right-5 -top-5"
          style={{
            animationName: "driftOff",
            animationDuration: "6s",
            animationDelay: `${animationOffset}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear"
          }}>Z</b>)}
      </div>
      <div className="text-3xl mt-8 mb-16">
        Presentert av <span className="text-online-yellow font-bold">Napkom</span>, i samarbeid med <span className="text-online-yellow font-bold">Jon Blund</span>.
      </div>

    </div>
  </div >
);
