import Card from './components/Card';
import WeatherContainer from './components/Weather/WeatherContainer';

import './App.css';
import EventList from './components/Events/EventList';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Card rowStart={1} rowSpan={2} colStart={1}>
          <WeatherContainer />
        </Card>
        <Card rowStart={3} colStart={1} rowSpan={3} colSpan={5}>
          <EventList eventSize={4} />
        </Card>
      </div>
    </QueryClientProvider>
  );
}

export default App;

//ES7
//rafce
