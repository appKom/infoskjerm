import React from 'react';
import './Event.css';

import { faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import OnlineLogo from './OnlineLogo';

// TODO: classNames => styles.{class}

function Event({event}) {
  const date = new Date(event.start_date);
  const formattedDate = `${date.getDate()}.${date.getMonth()}`;

  const imageSrc = event.images[0]?.thumb ? `https://online.ntnu.no${event.images[0].thumb}` : false;

  return (
    <div className="event">
      {imageSrc ?
        <img className="thumb" src={imageSrc} alt="Event" /> :
        <OnlineLogo className="thumb" fillColor="red" />
      }
      <div className="data">
        <h3 className="title">{event.title}</h3>
        {event.ingress_short.length > 0 && <div className="ingress">{event.ingress_short}</div>}
        <div className="info">
          <span className="info-line">
            <FontAwesomeIcon icon={faCalendarAlt} /><span>{formattedDate}</span>
          </span>
          <span className="info-line">
            <FontAwesomeIcon icon={faUser} /><span>{event.max_capacity ? `${event.number_of_seats_taken}/${event.max_capacity}` : '\u221E'}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Event;
