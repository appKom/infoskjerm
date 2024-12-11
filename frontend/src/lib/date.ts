export function formatWeekday(dateStr: string) {
  const weekdays = [ 'Søn', 'Man', 'Tirs', 'Ons', 'Tors', 'Fre', 'Lør' ];
  const date = new Date(dateStr);
  const weekday = weekdays[date.getDay()];
  return `${weekday}dag`;
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.toLocaleDateString('en-US', { day: '2-digit' }).replace(/^0/, ''); // Remove leading zero
  const month = date.toLocaleDateString('en-US', { month: '2-digit' }).replace(/^0/, ''); // Remove leading zero
  return `${day}.${month}`;
}

export function formatDateName(dateStr: string, includeMonth: boolean = true) {
  const date = new Date(dateStr);
  const day = date.getDate(); // Get day of the month as a number without leading zero
  const month = date.toLocaleDateString('nb-NO', { month: 'long' }); // Get full month name in Norwegian

  return includeMonth
    ? `${day}. ${month.charAt(0).toUpperCase() + month.slice(1)}` // Capitalize the first letter of the month
    : `${day}.`;
}

export function formatClock(dateStr: string) {
  const date = new Date(dateStr);
  const hours = date.getHours().toString().padStart(2, '0'); // Pad with leading zero if necessary
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Pad with leading zero if necessary
  return `${hours}:${minutes}`;
}

export const formatSlackDate = (dateInput: string): string => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return 'Ugyldig dato';

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isSameDay = (firstDate: Date, secondDate: Date) =>
    firstDate.toDateString() === secondDate.toDateString();

  if (isSameDay(date, now)) return 'I dag';
  if (isSameDay(date, yesterday))return 'I går';

  const diffDays = Math.floor(
    Math.abs(now.getTime() - date.getTime()) / (1000 * 3600 * 24)
  );

  return diffDays === 1 ? '1 dag siden' : `${diffDays} dager siden`;
};

export const isLongEvent = (start: Date, end: Date, thresholdDays: number = 1): boolean => {
  const durationMs = end.getTime() - start.getTime();
  const durationDays = durationMs / (1000 * 60 * 60 * 24); // Convert milliseconds to days
  return durationDays >= thresholdDays;
}

export const sameMonth = (startDate: string, endDate: string): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
};