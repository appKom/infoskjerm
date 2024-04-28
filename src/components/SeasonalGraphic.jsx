import { useState } from 'react';

function getSeason(date) {
  const month = date.getMonth() + 1;

  // Define special days with specific start and end dates in "DD.MM" format
  const specialDays = [
    { graphic: 'halloween', start: '21.10', end: '31.10' }, // TODO
    { graphic: 'christmas', start: '1.12', end: '30.12' }, // TODO
    { graphic: '17mai', start: '17.05', end: '17.05' }, // TODO
    { graphic: 'easter', start: '18.04', end: '31.04' } // TODO
  ];

  // Check if the current date matches a range for any special day
  for (const event of specialDays) {
    const [ startDay, startMonth ] = event.start.split('.').map(Number);
    const [ endDay, endMonth ] = event.end.split('.').map(Number);
    const startDate = new Date(date.getFullYear(), startMonth - 1, startDay);
    const endDate = new Date(date.getFullYear(), endMonth - 1, endDay);

    // Adjust end date for single day events to include the whole day
    endDate.setHours(23, 59, 59, 999);

    if (date >= startDate && date <= endDate) {
      return event.graphic;
    }
  }

  // Regular seasonal check if no special conditions are met
  if (month >= 3 && month <= 5) {
    return 'spring'; // TODO
  } else if (month >= 6 && month <= 8) {
    return 'summer';
  } else if (month >= 9 && month <= 11) {
    return 'autumn'; // TODO
  } else {
    return 'winter'; // TODO
  }
}

export function SeasonalGraphic() {
  const currentDate = new Date();
  const season = getSeason(currentDate);
  const [ imageExists, setImageExists ] = useState(true);

  const handleImageError = () => {
    setImageExists(false);
  };

  return (
    imageExists && season ? (
      <img
        className='w-auto h-full'
        src={`/graphics/${season}.svg`}
        alt={`${season} graphic`}
        onError={handleImageError}
      />
    ) : null
  );
}