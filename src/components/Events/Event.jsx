import React from 'react';
import './Event.css';

import Image from '../Image/Image';


function Event({event}) {
  const date = new Date(event.start_date);
  const formattedDate = `${date.getDate()}.${date.getMonth()}`;

  return (
    <div className="event">
      <Image className="thumb" url={event.images[0]?.thumb} color="red" />
      <div className="info">
        <h3 className="title">{event.title}</h3>
        {event.ingress_short.length > 0 && <div className="ingress">{event.ingress_short}</div>}
        <span>{formattedDate}</span>
        <span className="seats">{event.max_capacity ? `${event.number_of_seats_taken}/${event.max_capacity}` : '\u221E'}</span>
      </div>
    </div>
  );
}

export default Event;
