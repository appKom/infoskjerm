import Card from './components/Card';
import WeatherContainer from './components/Weather/WeatherContainer';

import './App.css';
import EventList from './components/Events/EventList';
import BusContainer from './components/Bus/BusContainer';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

function App() {
  return (
  // <div className="App">
  //   <Card rowStart={1} rowSpan={2} colStart={1}>
  //     <WeatherContainer />
  //   </Card>
  //   {/* <Card rowStart={1} colStart={4} rowSpan={5} colSpan={3}>
  //     <EventList eventSize={4} />
  //   </Card> */}
  //   <Card rowStart={1} rowSpan={2} colStart={3}><BusContainer stoppID={'NSR:StopPlace:44085'} busstopp={'Gløshaugen'} /></Card>
  //   <Card rowStart={1} rowSpan={2} colStart={5}><BusContainer stoppID={'NSR:StopPlace:41620'} busstopp={'Hesthagen'}/></Card>
  // </div>

    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Card rowStart={1} rowSpan={2} colStart={1}>
          <WeatherContainer />
        </Card>
        <Card rowStart={3} colStart={1} rowSpan={3} colSpan={6}>
          <EventList eventSize={4} />
        </Card>
        <Card rowStart={1} rowSpan={2} colStart={3}><BusContainer stoppID={'NSR:StopPlace:44085'} busstopp={'Gløshaugen'} /></Card>
        {/* <Card rowStart={1} rowSpan={2} colStart={5}><BusContainer stoppID={'NSR:StopPlace:41620'} busstopp={'Hesthagen'}/></Card> */}
      </div>
    </QueryClientProvider>
  );
}

export default App;

//ES7
//rafce
