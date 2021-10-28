import Card from './components/Card';
import WeatherContainer from './components/Weather/WeatherContainer';

import './App.css';

function App() {
  return (
    <div className="App">
      <Card rowStart={1} rowSpan={2} colStart={2}>
        <WeatherContainer />
      </Card>
    </div>
  );
}

export default App;

//ES7
//rafce
