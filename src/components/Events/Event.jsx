import React from 'react';
import moment from 'moment';
import { faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Event.css';

import OnlineLogo from './OnlineLogo';

const TEXT_LENGTH = 48;

const EVENT_TYPES = {
  1: {
    display: 'Sosialt',
    color: 'rgb(67, 177, 113)',
  },
  2: {
    display: 'Bedriftspresentasjon',
    color: 'rgb(235, 83, 110)'
  },
  3: {
    display: 'Kurs',
    color: 'rgb(18, 125, 189)'
  },
  4: {
    display: 'Utflukt',
    color: 'rgb(253, 189, 71)'
  },
  5: {
    display: 'Ekskursjon',
    color: 'rgb(42, 198, 249)'
  },
  6: {
    display: 'Internt',
    color: 'rgb(231, 94, 59)'
  },
  7: {
    display: 'Annet',
    color: 'rgb(179, 107, 205)'
  },
  8: {
    display: 'Realfagskjelleren',
    color: 'rgb(231, 94, 59)'
  },
};

function Event({event}) {
  const formattedDate = moment(event.start_date).format('DD.MM');

  const imageSrc = event.images[0]?.thumb ? `https://online.ntnu.no${event.images[0].thumb}` : false;

  const ingress = event.ingress_short.length > TEXT_LENGTH ? event.ingress_short.substring(0, TEXT_LENGTH) + '...' : event.ingress_short;

  return (
    <div className="event">
      {imageSrc ?
        <img className="thumb" src={imageSrc} alt="Event" /> :
        <OnlineLogo className="thumb" fillColor={EVENT_TYPES[event.event_type]?.color} />
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
