import { useEffect, useRef } from 'react';
import OnlineLogo from './Logo/OnlineLogo.jsx';
import { Badge } from './Badge.jsx';
import { formatDateTime } from '../lib/date.js';
import EVENT_TYPES from '../lib/eventTypes.js';

export function EventCard({ event }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const overflowWidth = container.scrollWidth - container.offsetWidth;
    container.style.setProperty('--overflow-width', `${overflowWidth}px`);
  }, [event]);

  const { attendance_event, event_type, image } = event;
  const eventTypeName = EVENT_TYPES[event_type].display;
  const eventTypeColorName = EVENT_TYPES[event_type].colorName;

  return (
    <div className="flex flex-col flex-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className={`${image ? '' : 'flex justify-center'} w-full h-60 border-b rounded-t-lg border-gray-200 dark:border-gray-700`}>
        {image ?
          <img className="object-cover w-full h-full rounded-t-lg" src={event.image.lg} alt={event.image.description} /> :
          <OnlineLogo fillColor={EVENT_TYPES[event.event_type].color} />}
      </div>
      <div ref={containerRef} className='flex flex-col justify-between flex-grow w-full gap-2 px-4 pt-2 pb-3 overflow-hidden'>
        <div>
          {event.title && <h5 className="w-full text-2xl font-bold tracking-tight line-clamp-1 dark:text-white">{event.title}</h5>}
          {event.title && <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{event.description}</p>}
        </div>
        <div ref={contentRef} className='flex w-full gap-1 scrolling-text'>
          {eventTypeName && eventTypeColorName && <Badge text={eventTypeName} leftIcon='star' color={eventTypeColorName} />}
          {event.event_start && <Badge text={formatDateTime(event.event_start)} leftIcon='calendar' color='gray' />}
          {attendance_event && (
            <Badge text={`${attendance_event.number_of_seats_taken}/${attendance_event.max_capacity}`} leftIcon='people' color='gray' />
          )}
        </div>
      </div>
    </div>
  );
}
