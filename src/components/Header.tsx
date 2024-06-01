import React, { useState, useEffect } from 'react';
import { SeasonalGraphic } from './SeasonalGraphic.jsx';
import moment from 'moment';

const REFRESH_TIME = '03:00';

const MESSAGE_INTERVAL_MINUTES = 2; // how long between each message
const MESSAGE_TIME_SECONDS = 10; // how long the message should be displayed
const MESSAGE_CONTENT = 'Lykke til på eksamen alle A4-krigere!';

export function Header() {
  const [time, setTime] = useState(moment().format('HH:mm:ss'));
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(moment().format('HH:mm:ss'));

      const currentTime = moment().format('YYYY-MM-DD HH:mm');
      const lastRefreshTime = localStorage.getItem('lastRefreshTime');
      if (moment().format('HH:mm') === REFRESH_TIME && currentTime !== lastRefreshTime) {
        localStorage.setItem('lastRefreshTime', currentTime);
        window.location.reload();
      }
    }, 1000);

    const messageInterval = setInterval(() => {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false)
      }, 1000 * MESSAGE_TIME_SECONDS);
    }, 1000 * 60 * MESSAGE_INTERVAL_MINUTES);

    return () => {
      clearInterval(timeInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className='relative h-32 border-b-[1.5px] border-light-grey dark:border-gray-700 dark:text-white'>
      <div className={`absolute top-0 left-0 flex items-center justify-center w-full h-full text-6xl italic duration-1000 ${showMessage ? 'animate-[slideIn_1s_forwards]' : 'animate-[slideOut_1s_forwards]'}`}>
        {MESSAGE_CONTENT}
      </div>
      <div className={`h-full flex items-center justify-between transition-transform duration-1000  ${showMessage ? 'translate-x-full' : ''}`}>
        <div className="flex items-center h-full gap-8 px-12 py-6">
          <img className="h-5/6 dark:hidden" src="/online/online_icon_blue.svg" alt="Online logo" />
          <img className="hidden h-5/6 dark:block" src="/online/online_icon_white.svg" alt="Online logo" />

          <img className="px-4 h-5/6 border-x-[1.5px] dark:border-gray-700 dark:hidden" src="/bekk/Bekk_navnetrekk_svart.svg" alt="Bekk logo" />
          <img className="hidden px-4 h-5/6 border-x dark:border-gray-700 dark:block" src="/bekk/Bekk_navnetrekk_hvit.svg" alt="Bekk logo" />

          <span className="text-6xl">{time}</span>
        </div>

        <div className='flex h-full gap-5 px-4'>
          <SeasonalGraphic />
        </div>
      </div>
    </div>
  );
}