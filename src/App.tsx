import './index.css';
import { Header } from './components/Header';
import { DarkModeContainer } from './components/DarkModeContainer';
import { Loading } from './components/Loading';
import { Error } from './components/Error';
import { fetchEventsByStartDate} from './api/EventApi';
import {useQuery} from "@tanstack/react-query";
import { Memes2 } from './components/Memes2';

const REFETCH_INTERVAL_MINUTES = 5;

function App() {
  const { isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEventsByStartDate(),
    refetchInterval: 1000 * 60 * REFETCH_INTERVAL_MINUTES
  });

  if (isLoading){
    return <Loading />;
  }
  if (isError){
    return <Error />;
  }

  return (
      <DarkModeContainer>
        <div className='overflow-hidden dark:bg-[#111827] h-screen flex flex-col'>
          <Header />
          <Memes2 />
        </div>
      </DarkModeContainer>
  );
}

export default App;
