import { Clock, MapPin } from "lucide-react"

export const CharityPage = () => {
  return (
    <div className="h-full bg-zinc-900 text-white p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-online-blue/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-online-blue/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto">
        {/* Title Section - Overlapping */}
        <div className="absolute top-0 left-0 translate-x-8 translate-y-16 text-8xl font-bold text-white/10">VELDEDIGHETSFEST</div>

        <div className="grid grid-cols-3 gap-8 mt-24">
          {/* QR Section - Spans 2 rows */}
          <div className="row-span-2 col-span-2 relative z-10">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 h-full row-span-2 col-span-2 relative z-10">
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                <p className="text-5xl font-bold tracking-tight">
                  støtt mental helse
                  <span className="text-online-yellow">.</span>
                </p>
                <div className="bg-white p-6 rounded-2xl rotate-3 transition-transform">
                  <img
                    src="https://dk3wdpvyk5ksy.cloudfront.net/wp-content/uploads/2021/06/14143720/vipps-qr-PCK.png"
                    alt="Vipps QR Code"
                    width={400}
                    height={400}
                    className="w-full max-w-[400px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section - Overlapping previous section */}
          <div className="-ml-24 mt-12 relative z-20">
            <div className="bg-online-blue p-8 rounded-3xl">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Opptjent så langt</h2>
                <div className="text-5xl font-bold text-online-yellow">kr 15,000</div>
                <div className="space-y-2">
                  {/* Custom Progress Bar */}
                  <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                    <div className="h-full w-[30%] bg-white rounded-full" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Nåværende</span>
                    <span>Mål: kr 50,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Details - Offset from grid */}
          <div className="-ml-24 -mb-64 relative z-10">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <h2 className="text-4xl font-bold mb-8">Når og hvor?</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-online-yellow mt-1" />
                  <div>
                    <p className="text-lg">Lørdag, 29. mars</p>
                    <p className="text-zinc-400">18:00 - 23:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-online-yellow mt-1" />
                  <div>
                    <p className="text-lg">R2</p>
                    <p className="text-zinc-400">Realfagsbygget</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

