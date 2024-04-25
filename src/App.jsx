import { Header } from './components/Header';
import { EventCarousel } from './components/EventCarousel';
import './index.css';

function App() {

  return (
    <div className='h-full overflow-hidden'>
      <Header />
      <div className='flex flex-col justify-between h-full'>
        <EventCarousel title="Sosialt" />
        <hr />
        <EventCarousel title="Bedriftspresentasjoner" />
      </div>
    </div>
  );
}

export default App;