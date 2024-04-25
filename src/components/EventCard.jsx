import OnlineLogo from './Logo/OnlineLogo.jsx';
import { Badge } from './Badge.jsx';
import { formatDateTime } from '../lib/date.js';
import EVENT_TYPES from '../lib/eventTypes.js';

export function EventCard({event}){

  // const badgeColor = EVENT_TYPES[event.event_type].colorName;

  return(
    <div className="flex flex-col flex-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className={`${event.image ? '' : 'flex justify-center'} w-full h-48 border-b rounded-t-lg border-gray-200 dark:border-gray-700`}>
        {event.image ?
          <img className="object-cover w-full h-full rounded-t-lg" src={event.image.lg} alt="Event" /> :
          <OnlineLogo fillColor={EVENT_TYPES[event.event_type].color} />}
      </div>

      <div className='flex flex-col justify-between flex-grow gap-2 px-5 pt-2 pb-3'>
        <div>
          <h5 className="w-full text-2xl font-bold tracking-tight text-gray-900 line-clamp-1 dark:text-white">{event.title}</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-1">{event.description}</p>
        </div>
        <div className='flex gap-1'>
          {/* <Badge text={EVENT_TYPES[event.event_type].display} icon='star' color={badgeColor}/> */}
          {/* <Badge text={event.organizer_name} icon='star' color={badgeColor}/> */}
          <Badge text={event.attendance_event.number_of_seats_taken + '/' + event.attendance_event.max_capacity} icon='people' color='gray' />
          <Badge text={formatDateTime(event.event_start)} icon='calendar' color='gray'/>
        </div>
      </div>
    </div>
  );
}