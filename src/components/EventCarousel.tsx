import React from 'react';
import { EventCard } from './EventCard';

export function EventCarousel({title, events}: {title: string, events: any[]}) {

  return(
    <div className='px-8 py-5'>
      <div className="mb-5 text-4xl font-bold dark:text-white">{title}</div>
      <div className ="grid justify-between max-w-full grid-cols-4 gap-8 " >
        {events.map((event: any) => <EventCard key={event.id} event={event} />)}
      </div>
      <div className="mt-5 text-xl dark:text-white">Meld deg på arrangementer via <span className='font-medium'>online.ntnu.no</span></div>
    </div>
  );
}