import { QRCodeSVG } from "qrcode.react"

export const AppPollPage = () => {
  const pageData = fetchGraphData()

  return <div className="flex flex-col items-center w-full h-full justify-between p-5 gap-5" >
    <div>
      <h1 className="text-5xl font-mono">{pageData.question}</h1>
    </div>

    {/* Mammaen */}
    <div className="bg-red-900 flex-row flex w-4/5 h-full gap-52 ">

      {/* Kid 1 */}
      <div className="bg-green-900 h-full w-full" >
      </div>

      {/* Kid 2 */}
      <div className="bg-yellow-500 h-full w-1/3 flex flex-col items-center justify-end p-5">
        <QRCodeSVG value={pageData.appUrl} className="w-full h-auto p-5" />
      </div>
    </div>

  </div>
}

const fetchGraphData = () => {
  return {
    question: "Hvor sitter du og jobber?",
    data: {
      "A4": 24,
      "Biblioteket": 48
    },
    appUrl: "https://www.appkom.no/"
  }


}