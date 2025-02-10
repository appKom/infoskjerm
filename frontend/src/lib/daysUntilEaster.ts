import Holidays from "date-holidays";

const countdownToEaster = () => {
  const today = new Date();
  const hd = new Holidays("NO");
  
  const holidays = hd.getHolidays(today.getFullYear());
  const goodFridayString = holidays.find(holiday => holiday.name === "Langfredag")!.date;
  const goodFridayDate = new Date(goodFridayString.replace(" ", "T"));

  const easterBreakStartDate = new Date(goodFridayDate);
  easterBreakStartDate.setDate(goodFridayDate.getDate() - 6); // set to saturday the week before "Langfredag"

  const diffTime = Math.abs(easterBreakStartDate.getTime() - today.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export default countdownToEaster;