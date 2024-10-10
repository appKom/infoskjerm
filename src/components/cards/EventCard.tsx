import { useEffect, useRef } from 'react';
import OnlineLogo from '../Logo/OnlineLogo';
import { Badge } from '../Badge';
import { formatWeekday, formatClock, formatDateName } from '../../lib/date';
import { EVENT_TYPES, IEvent, IEventAttendanceDetails } from '../../lib/types';
import { BaseCard } from './BaseCard';
import { removeOWFormatting } from '../../lib/text';
import { useQuery } from '@tanstack/react-query';
import { fetchAttendanceByEventId } from '../../api/owApi';

interface AttendanceInfo {
  seatsLeft: number;
  percentageFilled: number;
}

const calculateSeatsInfo = (attendanceEvent: IEventAttendanceDetails): AttendanceInfo => {
  const { number_of_seats_taken = 0, max_capacity = 0 } = attendanceEvent || {};
  const seatsLeft = max_capacity - number_of_seats_taken;
  const percentageFilled = (number_of_seats_taken / max_capacity) * 100;
  return { seatsLeft, percentageFilled };
};

const selectIndicatorColor = (percentageFilled: number): string => {
  if (percentageFilled >= 90) return 'bg-red-500';
  if (percentageFilled >= 75) return 'bg-orange-400';
  return 'bg-green-500';
};

const determineTimeBeforeRegistrationOpens = (registrationStart: Date) => {
  const timeDiff = registrationStart.getTime() - new Date().getTime();

  return {
    daysDiff: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
    hoursDiff: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutesDiff: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
  };
};

const determineStatusText = (
  isRegistrationEnded: boolean,
  { daysDiff, hoursDiff, minutesDiff }: { daysDiff: number; hoursDiff: number; minutesDiff: number },
  seatsLeft: number,
  numberOnWaitlist: number
): string => {
  if (daysDiff > 0) {
    return `Påmelding åpner om ${daysDiff} ${daysDiff === 1 ? 'dag' : 'dager'}`;
  } else if (hoursDiff > 0) {
    return `Påmelding åpner om ${hoursDiff} ${hoursDiff === 1 ? 'time' : 'timer'}`;
  } else if (minutesDiff > 0) {
    return `Påmelding åpner om ${minutesDiff} ${minutesDiff === 1 ? 'minutt' : 'minutter'}`;
  } else if (isRegistrationEnded) {
    return 'Påmeldingsfrist utløpt';
  } else if (seatsLeft === 0 && numberOnWaitlist === 0) {
    return 'Ingen plasser igjen';
  } else if (numberOnWaitlist > 0) {
    return `${numberOnWaitlist} på venteliste`;
  }
  return `${seatsLeft} ${seatsLeft === 1 ? 'plass' : 'plasser'} igjen`;
};

export function EventCard({ event }: { event: IEvent }) {
  const { ingress, title, start_date, event_type, images } = event;
  const image = images[0];

  const isRegistrationEvent = event.max_capacity !== null;

  const { isLoading: attendanceIsLoading, isError: attendanceIsError, data: attendanceData } = useQuery({
    queryKey: ['events', event.id],
    queryFn: () => fetchAttendanceByEventId(event.id),
    enabled: Boolean(event.id) && isRegistrationEvent,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const overflowWidth = container.scrollWidth - container.offsetWidth;
    container.style.setProperty('--overflow-width', `${overflowWidth}px`);
  }, [event, attendanceData]);

  if (attendanceIsLoading) return <BaseCard isLoading />;
  if (attendanceIsError) return <BaseCard isError />;

  const eventType = EVENT_TYPES.get(event_type);
  const eventTypeName = eventType?.display;
  const eventTypeColorName = eventType?.colorName;

  const { seatsLeft, percentageFilled } = calculateSeatsInfo(attendanceData);
  const indicatorColor = selectIndicatorColor(percentageFilled);
  const registrationEnd = new Date(attendanceData?.registration_end);
  const registrationStart = new Date(attendanceData?.registration_start);
  const isRegistrationEnded = new Date() > registrationEnd;
  const timeBeforeRegistrationOpens = determineTimeBeforeRegistrationOpens(registrationStart);

  return (
    <BaseCard showOverflow>
      {isRegistrationEvent && (
        <div
          className={`absolute inline-flex items-center justify-center py-0.5 px-2 text-sm font-bold text-white 
            ${isRegistrationEnded ? 'bg-gray-400' : indicatorColor} 
            border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900`}
        >
          {determineStatusText(
            isRegistrationEnded,
            timeBeforeRegistrationOpens,
            seatsLeft,
            attendanceData?.number_on_waitlist
          )}
        </div>
      )}

      <div className={`${image ? '' : 'flex justify-center'} w-full h-60 border-b rounded-t-lg border-gray-200 dark:border-gray-700`}>
        {image ? (
          <img className="object-cover w-full h-full bg-white rounded-t-lg" src={image.lg} alt={image.description} />
        ) : (
          <OnlineLogo fillColor={eventType?.color} />
        )}
      </div>

      <div ref={containerRef} className='flex flex-col justify-between flex-grow w-full gap-2 px-4 pt-2 pb-3 overflow-hidden'>
        <div>
          {title && <h5 className="w-full text-2xl font-bold tracking-tight line-clamp-1 dark:text-white">{removeOWFormatting(title)}</h5>}
          {ingress && <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{removeOWFormatting(ingress)}</p>}
        </div>
        <div className='flex w-full gap-1 scrolling-text'>
          {eventTypeName && eventTypeColorName && <Badge text={eventTypeName} leftIcon='star' color={eventTypeColorName} />}
          {start_date && <Badge text={`${formatWeekday(start_date)} ${formatDateName(start_date)}, ${formatClock(start_date)}`} leftIcon='calendar' color='gray' />}
          {isRegistrationEvent && attendanceData && (
            <Badge text={`${attendanceData.number_of_seats_taken}/${attendanceData.max_capacity}`} leftIcon='people' color='gray' />
          )}
        </div>
      </div>
    </BaseCard>
  );
}
