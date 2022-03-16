import { useQuery } from 'react-query';
import moment from 'moment';
import { fetchEventsByStartDate } from '../../api/EventApi';
import Event from './Event';
import Card from '../Card';

import './EventList.css';

function EventList({ eventSize = 3 }) {
  const { isLoading, isError, data } = useQuery('events', () => fetchEventsByStartDate(), { refetchInterval: 1000 * 60 * 60 * 3 });

  if (isLoading || isError) return null;

  const events = data.results.filter((event) => event?.attendance_event && moment(event.attendance_event.registration_end).isAfter(moment())).slice(0, eventSize);

  return (
    events.map((event, i) => (
      <Card key={event.id} colStart={(i * 3) + 1} colSpan={3}>
        <Event event={event} />
      </Card>
    ))
  );
}

export default EventList;