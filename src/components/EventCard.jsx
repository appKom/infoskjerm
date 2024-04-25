import OnlineLogo from './Logo/OnlineLogo.jsx';
import { Badge } from './Badge.jsx';

export function EventCard({image}){
  return(
    <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow">
      <div className={`${image ? '' : 'flex justify-center'} w-full h-56 border-b rounded-t-lg border-gray-200`}>
        {image ? <img className="object-cover w-full h-full rounded-t-lg" src={image} alt="Event" /> : <OnlineLogo fillColor="#0B5374" />}
      </div>

      <div className='px-5 pt-2 pb-3'>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Dogs are cute </h5>
        <div className='flex gap-1'>
          <Badge title='65/87' icon='people' />
          < Badge title='01.07' icon='calender'/>
        </div>
      </div>
    </div>
  );
}