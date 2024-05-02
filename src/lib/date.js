export function formatWeekday(dateStr) {
  const weekdays = [ 'Søn', 'Man', 'Tirs', 'Ons', 'Tors', 'Fre', 'Lør' ];
  const date = new Date(dateStr);
  const weekday = weekdays[date.getDay()];
  return `${weekday}dag`;
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.toLocaleDateString('en-US', { day: '2-digit' }).replace(/^0/, ''); // Remove leading zero
  const month = date.toLocaleDateString('en-US', { month: '2-digit' }).replace(/^0/, ''); // Remove leading zero
  return `${day}.${month}`;
}

export function formatDateName(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();  // Get day of the month as a number without leading zero
  const month = date.toLocaleDateString('nb-NO', { month: 'long' });  // Get full month name in Norwegian

  return `${day}. ${month.charAt(0).toUpperCase() + month.slice(1)}`;  // Capitalize the first letter of the month
}


export function formatClock(dateStr) {
  const date = new Date(dateStr);
  const hours = date.getHours().toString().padStart(2, '0'); // Pad with leading zero if necessary
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Pad with leading zero if necessary
  return `${hours}:${minutes}`;
}
