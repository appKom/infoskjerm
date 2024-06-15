import moment from 'moment';

export const fetchEventsByStartDate = async() => {
  const apiUrl = `https://old.online.ntnu.no/api/v1/events?event_start__gte=${moment().format('YYYY-MM-DDTHH:mm')}`;

  const response = await fetch(apiUrl);
  if (response.ok) {
      return await response.json();
  }
  throw response;
};
