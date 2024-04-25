import { Event } from './Event';

export function EventCarousel(){

  return(
    <div className='p-8'>
      <h2 className="text-4xl font-extrabold mb-5">Payments tool for companies</h2>
      <div className ="flex justify-between" >
        <Event />
        <Event />
        <Event />
        <Event />
      </div>
    </div>
  );
}