import Holidays from "date-holidays";

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

  const diffTime = Math.abs(easterEve.getTime() - today.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export default countdownToEaster;