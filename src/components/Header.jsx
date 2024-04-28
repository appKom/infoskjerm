import {useState, useEffect} from 'react';
import moment from 'moment';

const REFRESH_TIME = '03:00';

export function Header(){
  const [ time, setTime ] = useState(moment().format('HH:mm:ss'));

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(moment().format('HH:mm:ss'));

      const lastRefreshTime = localStorage.getItem('lastRefreshTime');
      const currentTime = moment().format('YYYY-MM-DD HH:mm');

      if (moment().format('HH:mm') === REFRESH_TIME && currentTime !== lastRefreshTime) {
        localStorage.setItem('lastRefreshTime', currentTime);
        window.location.reload();
      }
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return(
    <div className="flex items-center h-32 gap-8 px-12 py-6 border-b border-light-grey dark:border-gray-700">
      <img className="h-5/6 dark:hidden" src="/online/online_icon_blue.svg" alt="Online logo" />
      <img className="hidden h-5/6 dark:block" src="/online/online_icon_white.svg" alt="Online logo" />

      <img className="px-4 h-5/6 border-x dark:border-gray-700 dark:hidden" src="/bekk/Bekk_navnetrekk_svart.svg" alt="Bekk logo" />
      <img className="hidden px-4 h-5/6 border-x dark:border-gray-700 dark:block" src="/bekk/Bekk_navnetrekk_hvit.svg" alt="Bekk logo" />

      <span className="text-6xl dark:text-white">{time}</span>
    </div>
  );
}