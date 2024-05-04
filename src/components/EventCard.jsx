import { useEffect, useRef } from 'react';
import OnlineLogo from './Logo/OnlineLogo.jsx';
import { Badge } from './Badge.jsx';
import { formatWeekday, formatClock, formatDateName } from '../lib/date.js';
import EVENT_TYPES from '../lib/eventTypes.js';

const calculateSeatsInfo = (attendanceEvent) => {
  const { number_of_seats_taken = 0, max_capacity = 0 } = attendanceEvent || {};
  const seatsLeft = max_capacity - number_of_seats_taken;
  const percentageFilled = (number_of_seats_taken / max_capacity) * 100;
  return { seatsLeft, percentageFilled };
};

const selectIndicatorColor = (percentageFilled) => {
  if (percentageFilled >= 90) {
    return 'bg-red-500';
  } else if (percentageFilled >= 75) {
    return 'bg-orange-400';
  } else {
    return 'bg-green-500';
  }
};

const determineStatusText = (isRegistrationEnded, seatsLeft, number_on_waitlist) => {
  if (isRegistrationEnded) {
    return 'Påmeldingsfrist utløpt';
  } else if (seatsLeft === 0 && number_on_waitlist === 0) {
    return 'Ingen plasser igjen';
  } else if (number_on_waitlist > 0) {
    return `${number_on_waitlist} på venteliste`;
  } else {
    return `${seatsLeft} ${seatsLeft === 1 ? 'plass' : 'plasser'} igjen`;
  }
};

export function EventCard({ event }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const { ingress, title, attendance_event, event_start, event_type, image } = event;
  const eventTypeName = EVENT_TYPES[event_type].display;
  const eventTypeColorName = EVENT_TYPES[event_type].colorName;
  const { seatsLeft, percentageFilled } = calculateSeatsInfo(attendance_event);
  const indicatorColor = selectIndicatorColor(percentageFilled);

  useEffect(() => {
    const container = containerRef.current;
    const overflowWidth = container.scrollWidth - container.offsetWidth;
    container.style.setProperty('--overflow-width', `${overflowWidth}px`);
  }, [event]);

  const registration_end = new Date(attendance_event?.registration_end);
  const isRegistrationEnded = new Date() > registration_end;

  return (
    <div className="relative flex flex-col flex-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {attendance_event && (
        <div className={`absolute inline-flex items-center justify-center py-0.5 px-2 text-sm font-bold text-white ${isRegistrationEnded ? 'bg-gray-400' : indicatorColor} border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900`}>
          {determineStatusText(isRegistrationEnded, seatsLeft, attendance_event.number_on_waitlist)}
        </div>
      )}

      <div className={`${image ? '' : 'flex justify-center'} w-full h-60 border-b rounded-t-lg border-gray-200 dark:border-gray-700`}>
        {image ? (
          <img className="object-cover w-full h-full rounded-t-lg" src={image.lg} alt={image.description} />
        ) : (
          <OnlineLogo fillColor={EVENT_TYPES[event_type].color} />
        )}
      </div>

      <div ref={containerRef} className='flex flex-col justify-between flex-grow w-full gap-2 px-4 pt-2 pb-3 overflow-hidden'>
        <div>
          {title && <h5 className="w-full text-2xl font-bold tracking-tight line-clamp-1 dark:text-white">{title}</h5>}
          {ingress && <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{ingress}</p>}
        </div>
        <div ref={contentRef} className='flex w-full gap-1 scrolling-text'>
          {eventTypeName && eventTypeColorName && <Badge text={eventTypeName} leftIcon='star' color={eventTypeColorName} />}
          {event_start && <Badge text={`${formatWeekday(event_start)} ${formatDateName(event_start)}, ${formatClock(event_start)}`} leftIcon='calendar' color='gray' />}
          {attendance_event && <Badge text={`${attendance_event.number_of_seats_taken}/${attendance_event.max_capacity}`} leftIcon='people' color='gray' />}
        </div>
      </div>
    </div>
  );
}
