import { useEffect, useState } from 'react';
import countdownToEaster from '../../lib/daysUntilEaster';

export const EasterPage = () => {
  const [daysUntilEaster, setDaysUntilEaster] = useState(countdownToEaster());

  useEffect(() => {
    const interval = setInterval(() => {
      setDaysUntilEaster(countdownToEaster());
    }, 60000); // Recalculate every 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center h-full bg-gradient-to-b from-[#9acdf5] to-[#d1e3f1] dark:bg-none">
      <div className="w-full max-w-2xl relative">
        <div className="relative z-50 p-8 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700 rounded-3xl">
          <h1 className="mb-8 text-4xl font-bold text-center text-gray-800 dark:text-gray-100">Nedtelling til påskeferie</h1>
          <div className='text-center'>
            <p className={"font-extrabold text-pink-500 text-[250px] leading-none mb-6"}>{daysUntilEaster}</p>
            <p className='text-gray-600 dark:text-gray-300 text-3xl'>
              {daysUntilEaster === 1 ? "dag" : "dager"} igjen!
            </p>
          </div>
        </div>
      </div>
      {/* Background */}
      <img className="w-full h-full absolute object-cover" src="/easter/tulipfield.jpg" alt="" />
    </div>
  )
};
