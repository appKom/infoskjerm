import {useState, useEffect} from 'react';
import moment from 'moment';

export function Header(){
  const [ time, setTime ] = useState(moment().format('HH:mm:ss'));
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(moment().format('HH:mm:ss'));
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return(
    <div className="h-32 gap-8 flex items-center border-b border-light-grey px-12 py-6">
      <img  className="h-full" src="/online/online_logo.svg" alt="Online logo" />
      <img className="h-full border-x px-4" src="/bekk/Bekk_navnetrekk_hvit.svg" alt="Bekk logo" />
      <span className="text-7xl text-online-blue">{time}</span>
    </div>
  );
}