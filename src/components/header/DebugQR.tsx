import { Bug } from 'lucide-react'

export const DebugQR = () => (
  <div className='flex items-center justify-center h-full gap-3 p-1.5 bg-[#f3f4f6] dark:bg-[#212f4d] rounded-lg max-h-min'>
    <div className="p-1 text-center text-gray-600 dark:text-white">
      <div className="flex items-center justify-center gap-2">
        <p className="font-semibold">Debug</p>
        <Bug className="w-5" />
      </div>
      <p className="text-sm">Skann for info</p>
    </div>
    <img className="hidden dark:block h-2/3" src="/debug/debug-white-qr-code.svg" alt="Debug QR Code" />
    <img className="dark:hidden h-2/3" src="/debug/debug-gray-qr-code.svg" alt="Debug QR Code" />
  </div>
)