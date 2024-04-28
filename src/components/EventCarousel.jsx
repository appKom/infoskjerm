import { EventCard } from './EventCard';

export function EventCarousel({events}){

  return(
    <div className='px-8 py-5'>
      <h2 className="mb-5 text-4xl font-bold dark:text-white">Kommende arrangementer</h2>
      <div className ="grid justify-between max-w-full grid-cols-4 gap-8 " >
        {events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </div>
  );
}