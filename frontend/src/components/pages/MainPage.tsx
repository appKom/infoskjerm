import { useState, useEffect, ReactElement } from "react";
import { Header } from "../header/Header";
import { DarkModeProvider } from "../utils/DarkModeProvider";
import { OnlineAppBlastPage } from "./OnlineAppBlastPage";
import { ChristmasPage } from "./ChristmasPage";
import { EventsPage } from "./EventsPage";
import { VideoPage } from "./VideoPage";
import { NapkomPage } from "./Napkom";
import { BratPage } from "./BratPage";
import { PodcastPage } from "./PodcastPage";
import { MovemberPage } from "./MovemberPage";
import { Kunnskapkom } from "./Kunnskapkom";
import { SlackPage } from "./SlackPage";
import clsx from "clsx";

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

const preparePageSpecifications = (pages: PageSpecification[]): Page[] => {
  const totalPriority = pages
    .map((page) => page.priority())
    .reduce((a, b) => a + b, 0);

  return pages.map(({ priority, ...rest }) => ({
    ...rest,
    probability: priority() / totalPriority,
  }));
};

export const MainPage = () => {
  // All pages with their respective priorities and durations in seconds
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
      priority: () => {
        const today = new Date();
        const seasonStart = new Date(today.getFullYear(), 9, 1);
        const seasonEnd = new Date(today.getFullYear(), 11, 24);

        if (seasonStart <= today && today <= seasonEnd) return 1;
        else return 0;
      },
    },
    {
      component: <OnlineAppBlastPage />,
      duration: 30,
      priority: () => 1.5,
    },
    {
      component: <BratPage />,
      duration: 30,
      priority: () => 0.02,
    },
    {
      component: <NapkomPage />,
      duration: 60,
      priority: () => {
        const weight = 3;
        const hour = new Date().getHours();

        if (0 <= hour && hour < 6) return weight;
        else if (hour >= 16) return (hour / 24) ** 2 * weight;
        else return 0;
      },
    },
    {
      component: <PodcastPage />,
      duration: 30,
      priority: () => 1.5,
    },
    {
      component: <MovemberPage />,
      duration: 60,
      priority: () => {
        const today = new Date();
        const year = today.getFullYear();

        const seasonStart = new Date(year, 11, 1); // December 1st
        const seasonEnd = new Date(year, 11, 24); // December 24th

        if (seasonStart <= today && today <= seasonEnd) return 1;
        else return 0;
      },
    },
    {
      component: <Kunnskapkom />,
      duration: 30,
      priority: () => 0.3,
    },
  ];

  const pages = preparePageSpecifications(pageSpecifications);

  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [millisecondsLeft, setMillisecondsLeft] = useState(
    pages[0].duration * 1000
  );

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
      setMillisecondsLeft((prevMilliseconds) => {
        if (prevMilliseconds <= 250) {
          return pages[selectNextComponent()].duration * 1000; // Reset for the next component
        } else {
          return prevMilliseconds - 250;
        }
      });
    }, 250);

    const handleKeyDown = (event: KeyboardEvent) => {
      let newIndex = currentComponentIndex;

      if (event.key === "ArrowLeft") {
        newIndex = (currentComponentIndex - 1 + pages.length) % pages.length;
      } else if (event.key === "ArrowRight") {
        newIndex = (currentComponentIndex + 1) % pages.length;
      }

      setCurrentComponentIndex(newIndex);
      setMillisecondsLeft(pages[newIndex].duration * 1000);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentComponentIndex, millisecondsLeft]);

  return (
    <DarkModeProvider>
      <div className={clsx(
        "overflow-hidden dark:bg-[#111827] h-screen flex flex-col",
        import.meta.env.VITE_NODE_ENV !== "development" && "cursor-none"
      )}>
        <Header
          displayDuration={pages[currentComponentIndex].duration}
          timeRemaining={millisecondsLeft / 1000}
          nextPage={nextPage}
        />
        <div
          className="h-full"
          style={{ transition: "opacity 500ms", opacity }}
        >
          {pages[currentComponentIndex].component}
        </div>
      </div>
    </DarkModeProvider>
  );
};
