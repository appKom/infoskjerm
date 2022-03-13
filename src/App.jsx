import { QueryClient, QueryClientProvider } from 'react-query';
import { useState, useEffect } from 'react';
import Card from './components/Card';
import WeatherContainer from './components/Weather/WeatherContainer';
import EventList from './components/Events/EventList';
import BusContainer from './components/Bus/BusContainer';
import OnlineLogo from './components/Events/OnlineLogo';
import moment from 'moment';

import './App.css';

const queryClient = new QueryClient();

function App() {
  const [ time, setTime ] = useState(moment().format('HH:mm'));

  useEffect(() => {
    const timeInterval = setInterval(() => setTime(moment().format('HH:mm')), 30000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Card rowStart={1} colStart={1} colSpan={6}>
          <span className="top-bar">
            <span className="top-bar-logo">
              <OnlineLogo />
            </span>
            {time}
          </span>
        </Card>
        <Card colStart={1}>
          <WeatherContainer />
        </Card>
        <Card colStart={3}>
          <BusContainer stoppID={'NSR:StopPlace:44085'} busstopp={'Gløshaugen'} />
        </Card>
        <Card colStart={5}>
          <BusContainer stoppID={'NSR:StopPlace:41620'} busstopp={'Hesthagen'}/>
        </Card>
        <Card colStart={1} colSpan={6}>
          <EventList eventSize={4} />
        </Card>
      </div>
    </QueryClientProvider>
  );
}

export default App;

//ES7
//rafce
