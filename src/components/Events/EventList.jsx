import { fetchEventsByStartDate } from '../../api/EventApi';
import Event from './Event';
import moment from 'moment';
import { useQuery } from 'react-query';

import './EventList.css';

function EventList({ eventSize = 3 }) {
  const { isLoading, isError, data } = useQuery('events', () => fetchEventsByStartDate());

  if (isLoading || isError) return null;

  const events = data.results.filter((event) => event?.attendance_event && moment(event.attendance_event.registration_end).isAfter(moment())).slice(0, eventSize);

  return (
    <div className="event-list">
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventList;