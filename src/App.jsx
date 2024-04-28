import { Header } from './components/Header';
import { EventCarousel } from './components/EventCarousel';
import './index.css';

function App() {
  return (
    <div className='overflow-hidden dark:bg-[#111827] h-screen flex flex-col'>
      <Header />
      <div className='flex flex-col h-full'>
        <EventCarousel />
        <EventCarousel />
      </div>
    </div>
  );
}

export default App;
