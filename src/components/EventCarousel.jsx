import { EventCard } from './EventCard';

export function EventCarousel({title}){

  return(
    <div className='px-8 py-5'>
      <h2 className="mb-5 text-4xl font-extrabold">{title}</h2>
      <div className ="flex justify-between gap-8" >
        <EventCard image="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F03%2F20%2F0320de86cc3b3b862aa18687c3600cffbc8baa42.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bkids_oldergirls_clothing_topstshirts_tshirts%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]" />
        <EventCard image="https://img.etimg.com/thumb/width-1200,height-1200,imgsize-399321,resizemode-75,msid-58073262/news/international/business/hm-tries-on-multiple-personalities-to-grow.jpg" />
        <EventCard />
        <EventCard image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8aVsyhOkyGNFlnGRCCJ8R63FHcHhnMZ1oWp0PB8svjA&s" />
        <EventCard />
      </div>
    </div>
  );
}