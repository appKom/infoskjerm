import { useState, useEffect, ReactElement } from 'react';
import { Header } from '../header/Header';
import { DarkModeProvider } from '../utils/DarkModeProvider';
import { OnlineAppBlastPage } from './OnlineAppBlastPage';
import { ChristmasPage } from './ChristmasPage';
import { EventsPage } from './EventsPage';
import { SlackPage } from './SlackPage';
import { VideoPage } from './VideoPage';

interface PageAbstract {
  component: ReactElement;
  duration: number;
}

interface PageSpecification extends PageAbstract {
  priority: () => number;
}

interface Page extends PageAbstract {
  probability: number;
}

function preparePageSpecifications(pages: PageSpecification[]): Page[] {
  const totalPriority = pages.map(page => page.priority()).reduce((a, b) => a + b, 0)

  return pages.map((page) => {
    const mappedPage = page as any

    mappedPage.probability = page.priority() / totalPriority
    delete mappedPage.priority

    return mappedPage
  }
  )
}

export const MainPage = () => {
  // All pages with their respective probabilities and durations in seconds
  const pageSpecifications: PageSpecification[] = [
    {
      component: <EventsPage />,
      duration: 60,
      priority: () => 4,
    },
    {
      component: <SlackPage />,
      duration: 60,
      priority: () => 3,
    },
    {
      component: <VideoPage pageDuration={60} />,
      duration: 60,
      priority: () => 0.5,
    },
    {
      component: <ChristmasPage />,
      duration: 60,
      priority: () => 1,
    },
    {
      component: <OnlineAppBlastPage />,
      duration: 30,
      priority: () => 1.5,
    },
  ];

  const pages = preparePageSpecifications(pageSpecifications)

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
