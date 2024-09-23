import { useState, useEffect } from 'react';
import { Header } from './components/header/Header';
import { DarkModeContainer } from './components/utils/DarkModeContainer';
import { EventsPage } from './components/pages/EventsPage';
import { VideoPage } from './components/pages/VideoPage';
import { SlackPage } from './components/pages/SlackPage';

const SECONDS_PER_COMPONENT = 60;  // Total time in seconds for each component
const MS_PER_COMPONENT = SECONDS_PER_COMPONENT * 1000;  // Convert seconds to milliseconds

function App() {
  // array of main components to cycle through
  const components = [
    <EventsPage key={0} />,
    <SlackPage key={1} />,
    <VideoPage key={2} pageTime={SECONDS_PER_COMPONENT} />,
  ];
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [millisecondsLeft, setMillisecondsLeft] = useState(MS_PER_COMPONENT);

  const nextPage = () => {
    setOpacity(0);
    setTimeout(() => {
      setCurrentComponentIndex(prevIndex => (prevIndex + 1) % components.length);
      setOpacity(1);
      setMillisecondsLeft(MS_PER_COMPONENT);  // Reset the countdown in milliseconds
    }, 500);
  }

  useEffect(() => {
    const interval = setInterval(nextPage, MS_PER_COMPONENT);

    const countdown = setInterval(() => {
      setMillisecondsLeft(prevMilliseconds => {
        if (prevMilliseconds <= 250) {  // Near zero, reset
          return MS_PER_COMPONENT;
        } else {
          return prevMilliseconds - 250;  // Decrement by 100ms
        }
      });
    }, 250);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, []);

  return (
    <DarkModeContainer>
      <div className='overflow-hidden dark:bg-[#111827] h-screen flex flex-col'>
        <Header
          timePerComponent={SECONDS_PER_COMPONENT}
          timeToComponentChange={millisecondsLeft / 1000}  // Convert milliseconds back to seconds for display
          nextPage={nextPage}
        />
        <div className='h-full' style={{ transition: 'opacity 500ms', opacity }}>
          {components[currentComponentIndex]}
        </div>
      </div>
    </DarkModeContainer>
  );
}

export default App;