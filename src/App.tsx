import { useState, useEffect } from 'react';
import { Header } from './components/header/Header';
import { DarkModeProvider } from './components/utils/DarkModeProvider';
import { EventsPage } from './components/pages/EventsPage';
import { VideoPage } from './components/pages/VideoPage';
import { SlackPage } from './components/pages/SlackPage';

function App() {
  // All pages with their respective probabilities and durations in seconds
  const pages = [
    {
      component: <EventsPage />,
      duration: 60,
      probability: 0.45,
    },
    {
      component: <SlackPage />,
      duration: 60,
      probability: 0.45,
    },
    {
      component: <VideoPage pageDuration={120} />,
      duration: 60,
      probability: 0.10,
    },
  ];

  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [millisecondsLeft, setMillisecondsLeft] = useState(pages[0].duration * 1000);

  // Function to select the next component based on probabilities
  const selectNextComponent = () => {
    const randomNum = Math.random();
    let cumulativeProbability = 0;

    for (let i = 0; i < pages.length; i++) {
      cumulativeProbability += pages[i].probability;
      if (randomNum < cumulativeProbability) {
        // Try again if the same component is selected
        if (i === currentComponentIndex) return selectNextComponent();
        return i;
      }
    }

    // Fallback, should not reach here
    return (currentComponentIndex + 1) % pages.length;
  };

  const nextPage = () => {
    setOpacity(0);
    setTimeout(() => {
      const nextIndex = selectNextComponent();
      setCurrentComponentIndex(nextIndex);
      setOpacity(1);
      setMillisecondsLeft(pages[nextIndex].duration * 1000); // Set duration for the next component
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(nextPage, millisecondsLeft);

    const countdown = setInterval(() => {
      setMillisecondsLeft(prevMilliseconds => {
        if (prevMilliseconds <= 250) {
          return pages[selectNextComponent()].duration * 1000; // Reset for the next component
        } else {
          return prevMilliseconds - 250;
        }
      });
    }, 250);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, [currentComponentIndex, millisecondsLeft]);

  return (
    <DarkModeProvider>
      <div className='overflow-hidden dark:bg-[#111827] h-screen flex flex-col'>
        <Header
          displayDuration={pages[currentComponentIndex].duration}
          timeRemaining={millisecondsLeft / 1000}
          nextPage={nextPage}
        />
        <div className='h-full' style={{ transition: 'opacity 500ms', opacity }}>
          {pages[currentComponentIndex].component}
        </div>
      </div>
    </DarkModeProvider>
  );
}

export default App;
