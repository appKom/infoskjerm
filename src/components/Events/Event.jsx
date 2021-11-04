import React from 'react';
import moment from 'moment';
import { faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import OnlineLogo from './OnlineLogo';

import eventTypes from '../../eventTypes';

import './Event.css';

const TEXT_LENGTH = 48;

function Event({event}) {
  const formattedDate = moment(event.start_date).format('DD.MM');

  const imageSrc = event.images[0]?.thumb ? `https://online.ntnu.no${event.images[0].thumb}` : false;

  const ingress = event.ingress_short.length > TEXT_LENGTH ? event.ingress_short.substring(0, TEXT_LENGTH) + '...' : event.ingress_short;

  return (
    <div className="event">
      {imageSrc ?
        <img className="thumb" src={imageSrc} alt="Event" /> :
        <OnlineLogo className="thumb" fillColor={eventTypes[event.event_type]?.color} />
      }
      <div className="data">
        <h3 className="title">{event.title}</h3>
        {event.ingress_short.length > 0 && <div className="ingress">{ingress}</div>}
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
