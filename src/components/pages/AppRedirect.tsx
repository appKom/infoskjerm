import { useEffect, useState } from 'react'
import { AppleIcon, PlayIcon } from 'lucide-react'

const androidAppLink = "https://play.google.com/store/apps/details?id=ntnu.online.app"
const iosAppLink = "https://apple.co/3YnrSTh"

export const AppRedirect = () => {
  const [platform, setPlatform] = useState<'android' | 'ios' | 'other' | null>(null)

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera

    // Check if the user is on Android or iOS
    if (/android/i.test(userAgent)) {
      setPlatform('android')
      window.location.href = androidAppLink
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setPlatform('ios')
      window.location.href = iosAppLink
    } else {
      setPlatform('other')
    }
  }, [])

  if (!platform) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D5474] text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Download Our App</h1>
      <p className="text-xl mb-8 text-center">
        {platform === 'other' 
          ? "It looks like you're not on a mobile device. You can still download our app on your mobile phone:"
          : "If you haven't been redirected automatically, please click the button below:"}
      </p>
      <div className="space-y-4 w-full max-w-md">
        <a 
          className="w-full bg-[#F9B759] hover:bg-[#f0a93d] text-[#0D5474] font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
          href={androidAppLink}
        >
          <PlayIcon className="mr-2 h-5 w-5" />
          Download for Android
        </a>
        <a 
          className="w-full bg-white hover:bg-gray-100 text-[#0D5474] font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
          href={iosAppLink}
        >
          <AppleIcon className="mr-2 h-5 w-5" />
          Download for iOS
        </a>
      </div>
    </div>
  )
}