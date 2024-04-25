import OnlineLogo from './Logo/OnlineLogo.jsx';
import { Badge } from './Badge.jsx';
import { formatDateTime } from '../lib/date.js';

export function EventCard({event}){
  return(
    <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow">
      <div className={`${event.image ? '' : 'flex justify-center'} w-full h-48 border-b rounded-t-lg border-gray-200`}>
        {event.image ? <img className="object-cover w-full h-full rounded-t-lg" src={event.image.lg} alt="Event" /> : <OnlineLogo fillColor="#0B5374" />}
      </div>

      <div className='px-5 pt-2 pb-3'>
        <h5 className="w-full mb-2 text-2xl font-bold tracking-tight text-gray-900">{event.title}</h5>
        <div className='flex gap-1'>
          <Badge text={event.attendance_event.number_of_seats_taken + '/' + event.attendance_event.max_capacity} icon='people' />
          <Badge text={formatDateTime(event.event_start)} icon='calendar'/>
        </div>
      </div>
    </div>
  );
}