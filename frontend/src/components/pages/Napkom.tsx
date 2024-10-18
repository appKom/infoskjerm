
export const NapkomPage = () => (
  <div className="h-full flex justify-around items-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#7f79b5] to-[#584ad4] animate-gradient-x" />
    <div className="relative flex flex-col items-center w-full max-w-4xl aspect-video z-20 p-12 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700 rounded-3xl">

      <h1 className="mb-8 text-4xl font-bold text-center text-gray-800 dark:text-gray-100">Sov godt i natt!🌙</h1>
      <img src="/napkom/JonBlund.png" alt="Jon Blund" className="w-full" />
      <p className="text- text-center mt-6 text-gray-500 dark:text-gray-400">Denne meldingen er presentert av <b>NapKom</b> i samarbeid med <b>Jon Blund</b>!</p>

      {['top-4 left-4', 'top-4 right-4', 'bottom-4 right-4', 'bottom-4 left-4'].map((pos) => (
        <img
          key={pos}
          src="/napkom/NapKom.svg"
          className={`absolute max-h-16 ${pos}`}
        />
      ))}

    </div>
  </div >
);


