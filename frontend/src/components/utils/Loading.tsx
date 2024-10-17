import { useState, useEffect } from "react";

const loadingTexts = [
  "Venter på dotkom...",
  "Dataen er forsinket, sikkert bussen...",
  "Laster... Kanskje vi ta en kaffe i mellomtiden?",
  "Dataen må ha gått seg vill...",
  "Holder på å overtale serveren...",
  "Datapakkene tar den lange veien...",
  "Teller bytes, ett sekund...",
]

export const Loading = (props: { text?: string, hideLogo?: boolean}) => {
  const [randomText, setRandomText] = useState('');

  useEffect(() => {
    setRandomText(loadingTexts[Math.floor(Math.random() * loadingTexts.length)]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-10 animate-pulse">
      {!props.hideLogo && (
        <img
          src="/online/online_logo_blue.svg"
          width={300}
          height={100}
          alt="Online logo"
        />
      )}
      <div className="text-xl dark:text-white">{props.text ? props.text : randomText}</div>
    </div>
  );
};
