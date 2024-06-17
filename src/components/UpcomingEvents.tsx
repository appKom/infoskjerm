import { useQuery } from "@tanstack/react-query";
import { fetchEventsByStartDate } from "../api/eventsApi";
import { EventCard } from "./cards/EventCard";
import { Loading } from "./utils/Loading";
import { Error } from "./utils/Error";

const REFETCH_INTERVAL_MINUTES = 5; // how often to refetch events from Online API
const NUMBER_OF_EVENTS = 8; // how many events to display

export const UpcomingEvents = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEventsByStartDate(),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES
  });

  if (isLoading) return <Loading text="Henter siste arrangementer fra OW..." />;
  if (isError) return <Error />;

  return (
    <div className="px-8 py-8">
      <div className="mb-5 text-4xl font-bold dark:text-white">Kommende arrangementer</div>
      <div className ="grid justify-between max-w-full grid-cols-4 gap-8" >
        {data?.results.slice(0, NUMBER_OF_EVENTS).map((event: any) => <EventCard key={event.id} event={event} />)}
      </div>
      <div className="mt-5 text-xl dark:text-white">Meld deg på arrangementer via <span className='font-medium'>online.ntnu.no</span></div>
    </div>
  )
}