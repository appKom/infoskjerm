import OnlineLogo from './Logo/OnlineLogo.jsx';
import { Badge } from './Badge.jsx';
import { formatDateTime } from '../lib/date.js';
import EVENT_TYPES from '../lib/eventTypes.js';

export function EventCard({ event }) {
  const seatsTaken = event.attendance_event.number_of_seats_taken;
  const maxCapacity = event.attendance_event.max_capacity;

  return (
    <div className="flex flex-col flex-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className={`${event.image ? '' : 'flex justify-center'} w-full h-48 border-b rounded-t-lg border-gray-200 dark:border-gray-700`}>
        {event.image ?
          <img className="object-cover w-full h-full rounded-t-lg" src={event.image.lg} alt={event.image.description} /> :
          <OnlineLogo fillColor={EVENT_TYPES[event.event_type].color} />}
      </div>

      <div className='flex flex-col justify-between flex-grow gap-2 px-4 pt-2 pb-3'>
        <div>
          <h5 className="w-full text-2xl font-bold tracking-tight line-clamp-1 dark:text-white">{event.title}</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">{event.description}</p>
        </div>
        <div className='flex gap-1'>
          <Badge text={`${seatsTaken}/${maxCapacity}`} icon='people' color='gray' />
          <Badge text={formatDateTime(event.event_start)} icon='calendar' color='gray' />
        </div>
      </div>
    </div>
  );
}
