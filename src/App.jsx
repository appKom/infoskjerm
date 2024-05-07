import './index.css';
import { Header } from './components/Header';
import { EventCarousel } from './components/EventCarousel';
import { useQuery } from 'react-query';
import fetchEventsByStartDate from './api/eeee';
import { DarkModeContainer } from './components/DarkModeContainer';

const refetchIntervalMinutes = 5;

function App() {
  const { isLoading, isError, data } = useQuery('events', () => fetchEventsByStartDate(), { refetchInterval: 1000 * 60 * refetchIntervalMinutes });

  if (isLoading){
    return <p>Laster inn...</p>;
  }
  if (isError){
    return <p>{isError}. Kontakt appkom.</p>;
  }

  return (
    <DarkModeContainer>
      <div className='overflow-hidden dark:bg-[#111827] h-screen flex flex-col'>
        <Header />
        <div className='flex flex-col h-full'>
          <EventCarousel title='Kommende arrangementer' events = {data.results.slice(0, 8)}/>
        </div>
      </div>
    </DarkModeContainer>
  );
}

export default App;
