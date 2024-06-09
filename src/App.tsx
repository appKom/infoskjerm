import './index.css';
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DarkModeContainer } from './components/DarkModeContainer';
import { UpcomingEvents } from './components/UpcomingEvents';
import { LatestMemes } from './components/LatestMemes';

const SECONDS_PER_PAGE = 120;

function App() {
  const components = [
    <UpcomingEvents key={0} />,
    <LatestMemes key={1} />
  ];
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0); // Start the fade out
      setTimeout(() => {
        setCurrentComponentIndex(prevIndex => (prevIndex + 1) % components.length); // Cycle through components
        setOpacity(1); // Fade in the new content
      }, 500);
    }, 1000 * SECONDS_PER_PAGE);

    return () => clearInterval(interval);
  }, []);

  return (
    <DarkModeContainer>
      <div className='overflow-hidden dark:bg-[#111827] h-screen flex flex-col'>
        <Header />
        <div className='flex flex-col h-full px-8 py-8' style={{ transition: 'opacity 500ms', opacity }}>
          {components[currentComponentIndex]}
        </div>
      </div>
    </DarkModeContainer>
  );
}

export default App;
