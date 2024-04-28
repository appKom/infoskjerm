import moment from 'moment';

const ONLINE_API_URL = 'https://old.online.ntnu.no/api/v1/';

// TODO: Store URL somewhere (.env?)
// Make general fetcher
// Make general Online api
async function fetchEventsByStartDate() {
  const apiUrl = ONLINE_API_URL + `events?event_start__gte=${moment().format('YYYY-MM-DDTHH:mm')}`;

  const response = await fetch(apiUrl);
  if (response.ok) {
    return await response.json();
  }
  throw response;
}

export {
  fetchEventsByStartDate
};
