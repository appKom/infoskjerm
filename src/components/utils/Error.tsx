import { useState, useEffect } from "react";

const errorTexts = [
  "Det har skjedd en feil, helt sikkert dotkom :(",
  "En nettverkskabel har knukket :(",
  "Noe gikk galt, kanskje en server har tatt ferie :(",
  "Noen har progget i fylla :(",
  "En katt har gått over tastaturet :(",
  "En feil har oppstått, siste commit ble gjort av dotkom :(",
  "Nytt forskningsresultat: ballmers peak er en myte :(",
]

export const Error = (props: { text?: string }) => {
  const [randomText, setRandomText] = useState('');

  useEffect(() => {
    setRandomText(errorTexts[Math.floor(Math.random() * errorTexts.length)]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <img
        src="/online/online_logo_blue.svg"
        width={300}
        height={100}
        alt="Online logo"
      />
      <div className="text-xl dark:text-white">{props.text ? props.text : randomText}</div>
    </div>
  );
};