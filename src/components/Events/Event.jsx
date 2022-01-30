import React from 'react';
import moment from 'moment';
import { faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import OnlineLogo from './OnlineLogo';

import eventTypes from '../../eventTypes';

import './Event.css';

function Event({event}) {
  const eventStart = moment(event.start_date).format('DD.MM');
  const regStart = moment(event.attendance_event.registration_start).format('DD.MM HH:MM');

  const imgSrc = event.image?.thumb;

  return (
    <div className="event">
      {imgSrc ?
        <img className="thumb" src={imgSrc} alt="Event" /> :
        <OnlineLogo className="thumb" fillColor={eventTypes[event.event_type]?.color} />
      }
      <div className="data">
        <h3 className="title">{event.title}</h3>
        <div>
          Påmelding: {regStart}
        </div>
        <div className="info">
          <span className="info-line">
            <FontAwesomeIcon icon={faCalendarAlt} /><span>{eventStart}</span>
          </span>
          <span className="info-line">
            <FontAwesomeIcon icon={faUser} /><span>{event.attendance_event.max_capacity ? `${event.attendance_event.number_of_seats_taken}/${event.attendance_event.max_capacity}` : '\u221E'}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Event;
