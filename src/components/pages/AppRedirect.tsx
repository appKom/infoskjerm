import { useEffect, useState } from 'react'

const androidAppLink = "https://play.google.com/store/apps/details?id=ntnu.online.app"
const iosAppLink = "https://apple.co/3YnrSTh"

export const AppRedirect = () => {
  const [platform, setPlatform] = useState<'android' | 'ios' | 'other' | null>(null)

  useEffect(() => {
    const userAgent = navigator.userAgent || (window as any).opera

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
      <h1 className="text-3xl font-bold mb-6 text-center">Viderekobler...</h1>
      <p className="text-xl mb-8 text-center">
        {platform === 'other'
          ? "Det ser ut som at du bruker en mobil. Du kan fortsatt laste ned appen på mobilen din:"
          : "Hvis du ikke blir viderekoblet automatisk, velg plattform manuelt:"}
      </p>
      <div className="space-y-4 w-full max-w-md">
        <a 
          className="w-full bg-[#F9B759] hover:bg-[#f0a93d] text-[#0D5474] font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
          href={androidAppLink}
        >
          Last ned for Android
        </a>
        <a 
          className="w-full bg-white hover:bg-gray-100 text-[#0D5474] font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
          href={iosAppLink}
        >
          Last ned for iOS
        </a>
      </div>
    </div>
  )
}
