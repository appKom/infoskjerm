import { fetchEventsByStartDate } from '../../api/EventApi';
import Event from './Event';
import moment from 'moment';
import { useQuery } from 'react-query';

import './EventList.css';

function EventList({ eventSize = 3 }) {
  const { isLoading, isError, data } = useQuery('events', () => fetchEventsByStartDate());

  if (isLoading || isError) return null;

  const events = data?.results.reduce((events, event) => {
    if (event && event.attendance_event && moment(event.attendance_event.registration_end).isAfter(moment())) {
      events.push(event);
    }
    return events;
  }, []);

  return (
    <div className="event-list">
      {events.slice(0, eventSize).map((event) => {
        return <Event key={event.id} event={event} />;
      })}
    </div>
  );
}

export default EventList;