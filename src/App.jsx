import { QueryClient, QueryClientProvider } from 'react-query';
import { useState, useEffect } from 'react';
import Card from './components/Card';
import WeatherContainer from './components/Weather/WeatherContainer';
import EventList from './components/Events/EventList';
import BusContainer from './components/Bus/BusContainer';
import OnlineLogo from './components/Logo/OnlineLogo';
import BekkLogo from './components/Logo/BekkLogo';
import moment from 'moment';

import './App.css';

const queryClient = new QueryClient();
const REFRESH_TIME = '04:00';

function App() {
  const [ time, setTime ] = useState(moment().format('HH:mm'));

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(moment().format('HH:mm'));

      const lastRefreshTime = localStorage.getItem('lastRefreshTime');
      const currentTime = moment().format('YYYY-MM-DD HH:mm');

      if (moment().format('HH:mm') === REFRESH_TIME && currentTime !== lastRefreshTime) {
        localStorage.setItem('lastRefreshTime', currentTime);
        window.location.reload();
      }
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Card rowStart={1} colStart={1} colSpan={12}>
          <span className="top-bar">
            <span className="top-bar-logo">
              <OnlineLogo size="large" />
            </span>
            {time}
            <span className="bekk-logo">
              <BekkLogo />
            </span>
          </span>
        </Card>
        <Card colStart={1} colSpan={4}>
          <WeatherContainer />
        </Card>
        <Card colStart={5} colSpan={4}>
          <BusContainer stoppID={'NSR:StopPlace:44085'} busstopp={'Gløshaugen'} />
        </Card>
        <Card colStart={9} colSpan={4}>
          <BusContainer stoppID={'NSR:StopPlace:41620'} busstopp={'Hesthagen'}/>
        </Card>
        <EventList eventSize={4} />
      </div>
    </QueryClientProvider>
  );
}

export default App;