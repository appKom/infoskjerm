import { useQuery } from "@tanstack/react-query";
import { fetchEventsByStartDate } from "../api/EventApi";
import { EventCard } from "./EventCard";
import { Loading } from "./Loading";
import { Error } from "./Error";

const REFETCH_INTERVAL_MINUTES = 5; // how often to refetch events from Online API
const NUMBER_OF_EVENTS = 4; // how many events to display

export const UpcomingEvents = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEventsByStartDate(),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES
  });

  isLoading && <Loading />;
  isError && <Error />;

  return (
    <div>
      <div className="mb-5 text-4xl font-bold dark:text-white">Kommende arrangementer</div>
      <div className ="grid justify-between max-w-full grid-cols-4 gap-8" >
        {data?.results.slice(0, NUMBER_OF_EVENTS).map((event: any) => <EventCard key={event.id} event={event} />)}
      </div>
    </div>
  )
}