import Card from './components/Card';
import WeatherContainer from './components/Weather/WeatherContainer';

import './App.css';
import EventList from './components/Events/EventList';



function App() {
  return (
    <div className="App">
      <Card rowStart={1} rowSpan={2} colStart={1}>
        <WeatherContainer />
      </Card>
      <Card rowStart={1} colStart={4} rowSpan={5} colSpan={3}>
        <EventList eventSize={4} />
      </Card>
    </div>
  );
}

export default App;

//ES7
//rafce
