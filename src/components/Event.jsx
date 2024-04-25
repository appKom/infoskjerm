// import moment from 'moment';
// import eventTypes from '../../eventTypes';
import OnlineLogo from './Logo/OnlineLogo';
import eventTypes from '../lib/eventTypes.js';
import { Badge } from './Badge';



export function Event(){
  const imgSrc = 'https://online.ntnu.no/_next/image?url=https%3A%2F%2Fonlineweb4-prod.s3.eu-north-1.amazonaws.com%2Fmedia%2Fimages%2Fresponsive%2Flg%2Ffe5c674c-336d-411e-85d5-e89f3be7df23.jpeg&w=1200&q=75';
  return(
    <div>
      <a href="vg.no" className ="block max-w-sm w-327 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {imgSrc ?
          <img className="rounded-t-lg h-182 w-327" src={imgSrc} alt="Event" /> :
          <div className="rounded-t-lg h-182 w-327">
            <OnlineLogo  fillColor={eventTypes[event.event_type]?.color} />
          </div>
        }
        <div className='p-5'>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Title: Dogs are cute </h5>
          <div className='flex'>
            <Badge title='100000' icon='people' />
            < Badge title='01.07' icon='calender'/>
          </div>
        </div>
      </a>
    </div>

  );
}