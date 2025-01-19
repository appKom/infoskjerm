import Holidays from 'date-holidays';
// import {useState, useEffect} from 'react';

const countdownToEaster = () => {
  const today = new Date();
  const hd = new Holidays("NO");
  const holidays = hd.getHolidays(today.getFullYear());
  const goodFridayString = holidays.find(holiday => holiday.name === "Langfredag")?.date;
  let goodFridayDate;
  if (goodFridayString) {
    goodFridayDate = new Date(goodFridayString.replace(" ", "T"));
  } else {
    console.log("Good Friday date not found");
  }
  const easterEve = new Date(goodFridayDate);
  easterEve.setDate(goodFridayDate.getDate() + 1);
  console.log(easterEve);
  
  return easterEve;
};


export const EasterPage = () => {
  //Const for countdown, use usestate to set "today" as the current date
  // const [countdown, setCountdown] = useState(countdownToEaster());
  console.log(countdownToEaster());
  return (
    <div className="relative flex items-center justify-center h-full bg-gradient-to-b from-[#9acdf5] to-[#d1e3f1] dark:bg-none">
      <div className="w-full max-w-2xl relative">
        <div className="relative z-50 p-8 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700 rounded-3xl">
          <h1 className="mb-8 text-4xl font-bold text-center text-gray-800 dark:text-gray-100">Nedtelling til påske</h1>
        </div>
      </div>
    </div>
  )
};