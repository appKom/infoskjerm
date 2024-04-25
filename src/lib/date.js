export function formatDateTime(dateStr) {
  const weekdays = [ 'Søn', 'Man', 'Tirs', 'Ons', 'Tors', 'Fre', 'Lør' ];
  const date = new Date(dateStr);

  const weekday = weekdays[date.getDay()];
  const day = date.toLocaleDateString('en-US', { day: '2-digit' });
  const month = date.toLocaleDateString('en-US', { month: '2-digit' });

  return `${weekday} ${day}.${month}`;
}