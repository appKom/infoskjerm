import moment from 'moment';

const messagePeriods = [
  { // eksamensperiode vår
    start: '05-01',
    end: '06-15',
    messages: [
      'Lykke til på eksamen!',
      'Husk obligatoriske ispauser!',
      'Stå på A4-krigere!',
    ]
  },
  { // eksamensperiode høst
    start: '11-15',
    end: '12-22',
    messages: [
      'Lykke til på eksamen!',
    ]
  },
  { // sommer
    start: '06-01',
    end: '08-31',
    messages: [
      'God sommer!',
      'Spis nok is!',
    ]
  },
  { // fadderuke
    start: '08-12',
    end: '08-25',
    messages: [
      'Velkommen nye A4 krigere!',
    ]
  },
];

// This function checks if the current date is within a given range
const isDateWithinPeriod = (currentDate, start, end) => {
  const year = currentDate.year();
  const startDate = moment(`${year}-${start}`, 'YYYY-MM-DD');
  const endDate = moment(`${year}-${end}`, 'YYYY-MM-DD');

  // Handle year wrapping
  if (endDate.isBefore(startDate)) {
    endDate.add(1, 'year');
  }

  return currentDate.isBetween(startDate, endDate, undefined, '[]'); // Inclusive of start and end
};

// Get messages for the current date
export const getRelevantMessages = () => {
  const today = moment();
  let relevantMessages = [];

  messagePeriods.forEach(period => {
    if (isDateWithinPeriod(today, period.start, period.end)) {
      relevantMessages = [...relevantMessages, ...period.messages];
    }
  });

  return relevantMessages;
};
