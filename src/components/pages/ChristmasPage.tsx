import Snowfall from "react-snowfall";

const slackEmojies = {
  'julebrus': "https://emoji.slack-edge.com/T03S8TX18/julebrus/0d5529e3ff9e4957.png",
  'folksomergladijul': "https://emoji.slack-edge.com/T03S8TX18/folksomergladijul/d7da5ca5a6ac293b.png",
  'christmaslesbianbarista': "https://emoji.slack-edge.com/T03S8TX18/christmaslesbianbarista/b396503c0688fb07.png",
  'christmas_parrot': "https://emoji.slack-edge.com/T03S8TX18/christmas_parrot/49c1a209126c1f35.gif",
}

export const ChristmasPage = () => {
  return (
    <div className="relative flex items-center justify-center h-full bg-gradient-to-b  from-[#b3d8f5] to-[#d1e3f1] dark:bg-none">
      <img src={slackEmojies.julebrus} className="absolute top-4 left-4 max-h-14" />
      <img src={slackEmojies.julebrus} className="absolute top-4 right-4 max-h-14" />
      <img src={slackEmojies.julebrus} className="absolute bottom-4 right-4 max-h-14" />
      <img src={slackEmojies.julebrus} className="absolute bottom-4 left-4 max-h-14" />
      <Snowfall
        color="#def1ff"
        snowflakeCount={150}
      />
      <div className="relative w-full max-w-2xl p-8 bg-white rounded-lg shadow-xl">
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">Nedtelling til jul</h1>
        <div className="mb-12 text-center">
          <p className="text-6xl font-extrabold text-red-600">{78}</p>
          <p className="mt-2 text-xl text-gray-600">dager igjen!</p>
        </div>
        <div className="py-8 mb-8 border-t border-b border-gray-200">
          <h2 className="mb-4 text-2xl font-semibold text-center text-gray-700">Nominer Årets Nisse</h2>
          <p className="mb-4 text-center text-gray-600">Skann QR-koden og send inn din nominasjon før julebordet!</p>
          <div className="flex justify-center">
            <div className="bg-green-50 h-[250px] w-[250px]"></div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Presentert av interessegruppen <span className="font-bold">folk som er glad i jul</span>!</p>
        </div>
        <img src={slackEmojies.folksomergladijul} className="absolute top-4 left-4 max-h-14" />
        <img src={slackEmojies.folksomergladijul} className="absolute top-4 right-4 max-h-14" />
        <img src={slackEmojies.folksomergladijul} className="absolute bottom-4 right-4 max-h-14" />
        <img src={slackEmojies.folksomergladijul} className="absolute bottom-4 left-4 max-h-14" />
      </div>
    </div>
  );
}