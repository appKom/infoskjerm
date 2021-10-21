
//import Bus from './components/Bus/Bus';
import BusContainer from './components/Bus/BusContainer';
import './App.css';

function App() {

  const [bus, setBus] = useState(initialState)

  return (
    <div className="App">
      <BusContainer></BusContainer>
    </div>
  );
}



export default App;
