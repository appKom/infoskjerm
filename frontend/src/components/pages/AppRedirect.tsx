import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

const androidAppLink = "https://play.google.com/store/apps/details?id=ntnu.online.app"
const iosAppLink = "https://apple.co/3YnrSTh"

export const AppRedirect = () => {
  const [platform, setPlatform] = useState<'android' | 'ios' | 'other' | null>(null)

  useEffect(() => {
    const userAgent = navigator.userAgent || (window as any).opera

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

  return (
    <div className="min-h-screen bg-[#07324a] flex flex-col items-center justify-center gap-8 px-8">
      <img src="/online/online_icon_white.svg" alt="Online" className="w-16 h-16" />

      {(!platform || platform === 'android' || platform === 'ios') && (
        <div className="flex flex-col items-center gap-3 text-center">
          <Loader2 className="w-6 h-6 text-white/40 animate-spin" />
          <p className="text-white/50 text-base">Viderekobler…</p>
        </div>
      )}

      {/* Fallback / manual links */}
      <div className="flex flex-col items-center gap-3">
        {(platform === 'ios' || platform === 'other') && (
          <a href={iosAppLink} className="active:opacity-70 transition-opacity">
            <img src="online-app/download-app-store.svg" alt="Last ned på App Store" className="h-12" />
          </a>
        )}
        {(platform === 'android' || platform === 'other') && (
          <a href={androidAppLink} className="active:opacity-70 transition-opacity">
            <img src="online-app/download-google-play.svg" alt="Last ned på Google Play" className="h-12" />
          </a>
        )}
      </div>
    </div>
  )
}
