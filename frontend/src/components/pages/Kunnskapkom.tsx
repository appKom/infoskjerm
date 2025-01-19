import clsx from "clsx";
import { useState } from "react";

const backgroundImageStyling = {
  backgroundImage: "url('https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/820035/bookshelf-clipart-xl.png')",
  backgroundPosition: "bottom -10px left -10px",
  backgroundSize: "30%",
  backgroundRepeat: "no-repeat",
};

const funFactList = [
  ["Forelesning: ", "[foːrɛleːsniːŋ] Et teoretisk konsept om å tilegne seg kunnskap i forelesningssal. Utøves ikke i praksis."],
  ["Semesterkrise: ", "[seːmæsteːrkriːsæ] Den eksistensielle krisen som inntreffer når man innser at eksamen er nærmere enn forventet."],
  ["Stack overflow: ", "[stæk oʊvɚfloʊ] Eldgammelt forum for programmeringsdiskusjoner. Blir fortsatt besøkt i ny og ne når ChatGPT glemmer forskjellen på Python2 og Python3."],
  ["Programmeringsbrus: ", "[prugrɑmeːriːŋsbrʉs] Syntetisk væske som gir en illusjon av forbedrede programmeringsferdigheter. Selges for 22kr i A4-kiosken."],
  ["Taktisk kont: ", "[tɑkʈɪsk kunt] Et falskt håp om at man kommer til å gjøre det bedre på eksamen etter to måneder på feriemodus."],
  ["Kok: ", "[kuːk] Tradisjonell teknikk som anvendes for å komme opp til eksamen uten å kunne forskjellen på klasser og objekter."]
];

const funFactsPicker = () => {
  return funFactList[Math.floor(Math.random() * funFactList.length)];
}

export const Kunnskapkom = () => {

  const [funFact] = useState(funFactsPicker());
  const [funFactInfo, funFactBody] = funFact;

  return (
    <div className="h-full w-full flex justify-center items-center" style={backgroundImageStyling}>
      <div className="relative h-2/3 w-2/3 border-solid border-2 border-slate-500 rounded-3xl flex flex-col items-center">
        <div className="h-5/6 w-4/5 flex items-center">
          <div className="text-5xl dark:text-gray-100">
            <span className="font-bold">{funFactInfo}</span>{funFactBody}
          </div>
        </div>
        <div className="h-1/6 w-4/5 border-solid border-slate-500 border-t-2 flex justify-center items-center">
          <div className="text-xl text-gray-600 dark:text-gray-300">- Levert av <span className="font-bold">Kunnskapkom</span></div>
        </div>
        {['top-6 left-6', 'top-6 right-6', 'bottom-6 right-6', 'bottom-6 left-6'].map((pos) => (
          <img 
            key={pos} 
            src={"/kunnskapkom/kunnskapkomlogo.svg"} 
            className={clsx("absolute max-h-20", pos)}
          />
        ))}
      </div>
    </div>
  )
}
