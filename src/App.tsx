import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DarkModeContainer } from './components/utils/DarkModeContainer';
import { UpcomingEvents } from './components/UpcomingEvents';
import { LatestMemes } from './components/LatestMemes';
import { LatestBlasts } from './components/LatestBlasts';

const SECONDS_PER_COMPONENT = 60;  // Total time in seconds for each component
const MS_PER_COMPONENT = SECONDS_PER_COMPONENT * 1000;  // Convert seconds to milliseconds

function App() {
  // array of main components to cycle through
  const components = [
    <UpcomingEvents key={0} />,
    <>
      <div className='flex justify-between p-3 mb-5 text-4xl font-bold bg-white border dark:border-b-gray-700 dark:bg-[#111827] dark:border-0 dark:border-b-[1px] dark:text-white border-b-light-grey px-28'>
        <div>#memeogvinogklinoggrin2</div>
        <div>#korktavla</div>
      </div>
      <div className='flex justify-between px-28' key={1}>
        <LatestMemes />
        <div className='w-1 -mt-10 border-l -z-10 border-light-grey'></div>
        <LatestBlasts />
      </div>
    </>
  ];
  const [currentComponentIndex, setCurrentComponentIndex] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [millisecondsLeft, setMillisecondsLeft] = useState(MS_PER_COMPONENT);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentComponentIndex(prevIndex => (prevIndex + 1) % components.length);
        setOpacity(1);
        setMillisecondsLeft(MS_PER_COMPONENT);  // Reset the countdown in milliseconds
      }, 500);
    }, MS_PER_COMPONENT);

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
        />
        <div className='h-full' style={{ transition: 'opacity 500ms', opacity }}>
          {components[currentComponentIndex]}
        </div>
      </div>
    </DarkModeContainer>
  );
}

export default App;
