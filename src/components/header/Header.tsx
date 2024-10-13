import { useState, useEffect } from 'react';
import moment from 'moment';
import { getRelevantMessages } from '../../lib/messages';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { AnimatedLogo } from './AnimatedLogo';
import { DebugQR } from './DebugQR';
import clsx from 'clsx';
import { useDarkMode } from '../utils/DarkModeProvider';

const REFRESH_TIME = '03:00'; // the time of day to refresh the page (use latest code from git)

const MESSAGE_INTERVAL_MINUTES = 1.5; // how long between each message
const MESSAGE_TIME_SECONDS = 10; // how long the message should be displayed

type HeaderProps = {
  timeRemaining: number;
  displayDuration: number;
  nextPage: () => void;
};

export const Header = (props: HeaderProps) => {
  const [time, setTime] = useState<string>(moment().format('HH:mm'));
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState<string>();
  const [isColonVisible, setIsColonVisible] = useState<boolean>(true);

  const { toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const timeInterval = setInterval(() => {
      // update the clock
      setTime(moment().format('HH:mm'));

      // logic for refreshing the page once each day
      const currentTime = moment().format('YYYY-MM-DD HH:mm');
      const lastRefreshTime = localStorage.getItem('lastRefreshTime');
      if (moment().format('HH:mm') === REFRESH_TIME && currentTime !== lastRefreshTime) {
        localStorage.setItem('lastRefreshTime', currentTime);
        window.location.reload();
      }
    }, 1000);

    // Blinking colon interval
    const blinkInterval = setInterval(() => {
      setIsColonVisible(prev => !prev);
    }, 500);

    // logic for displaying messages
    const messageInterval = setInterval(() => {
      const messages = getRelevantMessages();
      if (messages.length > 0) { // Check if there are any relevant messages
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setMessageContent(randomMessage);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 1000 * MESSAGE_TIME_SECONDS);
      } else {
        setShowMessage(false); // No messages, stop showing any animation
      }
    }, 1000 * 60 * MESSAGE_INTERVAL_MINUTES);

    return () => {
      clearInterval(timeInterval);
      clearInterval(blinkInterval);
      clearInterval(messageInterval);
    };
  }, []);

  const [hours, minutes] = time.split(':');

  return (
    <div className='relative border-b-[1.5px] min-h-32 h-32 max-h-32 border-light-grey dark:border-gray-700 dark:text-white z-20 bg-white dark:bg-[#111827]'>
      <div className={`absolute top-0 left-0 flex items-center justify-center w-full h-full text-6xl italic duration-1000 ${showMessage ? 'animate-[slideIn_1s_forwards]' : 'animate-[slideOut_1s_forwards]'}`}>
        {messageContent}
      </div>

      <div className={`h-full flex items-center justify-between transition-transform duration-1000 ${showMessage ? 'translate-x-full' : ''}`}>
        <div className="flex items-center h-full gap-8 px-12 py-6 cursor-pointer" onClick={toggleDarkMode}>
          <AnimatedLogo />
          <span className="pl-8 text-6xl border-l-[1.5px] dark:border-gray-700">
            {hours}<span className={clsx(isColonVisible ? 'text-[#111827]' : 'text-white')}>:</span>{minutes}
          </span>
        </div>

        <div className='flex items-center h-full gap-10'>
          <DebugQR />

          <div
            className='mr-12 cursor-pointer pl-10 border-l-[1.5px] dark:border-gray-700'
            onClick={props.nextPage}
          >
            <CircularProgressbar
              className="h-12"
              value={props.timeRemaining}
              maxValue={props.displayDuration}
              strokeWidth={50}
              styles={buildStyles({
                pathColor: '#0D5474',
                trailColor: '#eee',
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
