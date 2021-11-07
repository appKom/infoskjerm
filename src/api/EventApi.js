import moment from 'moment';

const ONLINE_API_URL = 'https://online.ntnu.no/api/v1/';

const today = () => moment().format('YYYY-MM-DD');

// TODO: Store URL somewhere (.env?)
// Make general fetcher
// Make general Online api
async function fetchEventsByStartDate(startDate = today()) {
  const apiUrl = ONLINE_API_URL + `events?event_start__gte=${startDate}`;
  const response = await fetch(apiUrl);
  if (response.ok) {
    return await response.json();
  }
  throw response;
}

export {
  fetchEventsByStartDate
};
