import { DebugLogo } from "../logo/DebugLogo";


export const DebugQR = () => (
  <div className='flex items-center justify-center h-full gap-3 pl-4 p-1.5 bg-[#f3f4f6] dark:bg-[#212f4d] rounded-lg max-h-min fill-gray-600 dark:fill-white'>
    <DebugLogo />
    <div className="p-1 text-center text-gray-600 dark:text-white">
      <div className="flex items-center justify-center gap-2">
        <p className="font-semibold">Debug</p>
      </div>
      <p className="text-sm">Skann for info</p>
    </div>
    <img className="hidden dark:block h-2/3" src="/debug/debug-white-qr-code.svg" alt="Debug QR Code" />
    <img className="dark:hidden h-2/3" src="/debug/debug-gray-qr-code.svg" alt="Debug QR Code" />
  </div>
)