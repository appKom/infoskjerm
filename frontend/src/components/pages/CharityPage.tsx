import { Clock, MapPin, Users } from "lucide-react"

export const CharityPage = () => {
  return (
    <div className="h-full bg-zinc-900 text-white p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-online-blue/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-online-blue/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="absolute right-8 bottom-8 flex gap-6 items-center text-3xl">
        <img src="/charity/mental-helse.svg" alt="Mental Helse logo" className="w-[100px] opacity-70" />
        <span className="font-opensans">Mental Helse</span>
      </div>

      {/* Title Section - Overlapping */}
      {/* <div className="absolute top-0 left-0 translate-x-8 translate-y-16 text-8xl font-bold text-white/10 uppercase">yup yup yup</div> */}

      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 mt-24">
        {/* QR Section - Spans 2 rows */}
        <div className="bg-white/5 backdrop-blur-sm px-16 py-8 rounded-3xl border border-white/10 h-full row-span-2 col-span-2 relative z-10 w-max">
          <p className="text-5xl font-bold tracking-tight">
            støtt veldedighetsfesten
            <span className="text-online-yellow pl-0.5">!</span>
          </p>
          <div className="bg-white p-6 rounded-2xl rotate-3 transition-transform mx-auto mt-16 w-max">
            <img
              src="/charity/vipps.png"
              alt="Vipps QR Code"
              className="w-[450px]"
            />
          </div>
        </div>

        {/* Progress Section - Overlapping previous section */}
        <div className="-ml-[210px] mt-[200px] w-[500px] h-max relative z-20 bg-online-blue/50 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Opptjent så langt</h2>
              <div className="text-5xl font-bold text-online-yellow">kr 15,000</div>
              <div className="space-y-2">
                {/* Custom Progress Bar */}
                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                  <div className="h-full w-[30%] bg-white rounded-full" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    54 donasjoner
                    </span>
                  <span>Mål: kr 50,000</span>
                </div>
            </div>
          </div>
        </div>

        {/* Event Details - Offset from grid */}
        <div className="-ml-[240px] -mb-[100px] relative z-10">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 w-96">
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
  )
}
