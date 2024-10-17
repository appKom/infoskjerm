import { Bug } from 'lucide-react'
import { useDarkMode } from '../utils/DarkModeProvider';

export const DebugQR = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='flex items-center justify-center h-[90px] gap-3 p-1.5 bg-[#f3f4f6] dark:bg-[#212f4d] rounded-lg'>
      <div className="p-1 text-center text-gray-600 dark:text-white">
        <div className="flex items-center justify-center gap-2">
          <p className="font-semibold">Debug</p>
          <Bug className="w-5" />
        </div>
        <p className="text-sm">Skann for info</p>
      </div>
      <img 
        className="h-full" 
        src={isDarkMode ? "/debug/debug-white-qr-code.svg" : "/debug/debug-gray-qr-code.svg"} 
        alt="Debug QR Code" 
      />
    </div>
  )
}
