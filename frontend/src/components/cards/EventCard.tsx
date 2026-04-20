import { useEffect, useRef } from 'react';
import OnlineLogo from '../logo/OnlineLogo';
import { Badge } from '../Badge';
import { formatWeekday, formatClock, formatDateName, isLongEvent, sameMonth } from '../../lib/date';
import { EVENT_TYPES, IEventAttendanceDetails, INewEvent } from '../../lib/types';
import { BaseCard } from './BaseCard';
import { removeOWFormatting } from '../../lib/text';
/* import { calculateSeatsInfo, selectIndicatorColor, determineTimeBeforeRegistrationOpens, determineStatusText } from '../../lib/event';
import clsx from 'clsx'; */

export function EventCard({ event }: { event: INewEvent & { attendance?: IEventAttendanceDetails | null } }) {
  const { title, start, end, imageUrl } = event;

  const isRegistrationEvent = event.max_capacity !== null;

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const attendanceData = event.attendance;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const overflowWidth = container.scrollWidth - container.offsetWidth;
    container.style.setProperty('--overflow-width', `${overflowWidth}px`);
  }, [event, attendanceData]);

  const eventType = EVENT_TYPES.find(t => t.typeName === event.type);
  const eventTypeName = eventType?.displayName;
  const eventColor = eventType?.colorName;

  /* const { seatsLeft, percentageFilled } = attendanceData
    ? calculateSeatsInfo(attendanceData)
    : { seatsLeft: 0, percentageFilled: 0 };

  const indicatorColor = selectIndicatorColor(
    percentageFilled,
    String(start),
    String(end)
  );

  const registrationEnd = new Date(attendanceData?.registerEnd ?? 0);
  const registrationStart = new Date(attendanceData?.registerStart ?? 0);
  const isRegistrationEnded = new Date() > registrationEnd;
  const timeBeforeRegistrationOpens = determineTimeBeforeRegistrationOpens(registrationStart); */
  const isLongDurationEvent = isLongEvent(new Date(start), new Date(end));

  const dateBadgeText = isLongDurationEvent
    ? sameMonth(start, end)
      ? `Fra ${formatDateName(start, false)} til ${formatDateName(end)}` // Start and end date in same month
      : `Fra ${formatDateName(start)} til ${formatDateName(end)}` // Start and end date in different months
    : `${formatWeekday(start)} ${formatDateName(start)}, ${formatClock(start)}`; // Single day event

  /* const statusText = determineStatusText( //todo
    isRegistrationEnded,
    timeBeforeRegistrationOpens,
    seatsLeft,
    attendanceData?.number_on_waitlist ?? 0,
    start,
    end,
  ); */

  const reservedCount = attendanceData?.attendees.filter(a => a.reserved).length ?? 0;

  return (
    <BaseCard showOverflow>
      {/* {statusText && (
        <div
          className={clsx(
            'absolute inline-flex items-center justify-center py-0.5 px-2 text-sm font-bold border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900',
            isRegistrationEnded ? 'bg-gray-400 text-white' : indicatorColor
          )}
        >
          {statusText}
        </div>
      )} */}

      <div className='flex justify-center w-full h-60 border-b rounded-t-lg border-gray-200 dark:border-gray-700'>
        {imageUrl ? (
          <img className="object-cover w-full h-full bg-white rounded-t-lg" src={imageUrl} alt={imageUrl} />
        ) : (
          <OnlineLogo fillColor={eventColor} />
        )}
      </div>

      <div ref={containerRef} className='flex flex-col justify-between flex-grow w-full gap-2 px-4 pt-2 pb-3 overflow-hidden'>
        <div>
          {title && <h5 className="w-full text-2xl font-bold tracking-tight line-clamp-1 dark:text-white">{removeOWFormatting(title)}</h5>}
          {/* {ingress && <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{removeOWFormatting(ingress)}</p>} */}
        </div>
        <div ref={contentRef} className='flex w-full gap-3 scrolling-text'>
          {eventTypeName && <Badge text={eventTypeName} leftIcon='star' color={eventColor} />}
          {start && <Badge text={dateBadgeText} leftIcon='calendar' color='gray' />}
          {isRegistrationEvent && attendanceData && (
            <Badge text={
              attendanceData.pools?.[0]?.capacity
                ? `${reservedCount}/${attendanceData.pools[0]?.capacity}`
                : `${reservedCount}`
            } leftIcon='people' color='gray' />
          )}
        </div>
      </div>
    </BaseCard>
  );
}
