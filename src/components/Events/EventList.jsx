import React, { useEffect, useState } from 'react';
import { fetchEventsByStartDate } from '../../api/EventApi';
import Event from './Event';
import moment from 'moment';

import './EventList.css';

function EventList({ eventSize = 3 }) {
  const [ events, setEvents ] = useState([]);


  useEffect(() => {
    fetchEventsByStartDate().then((data) => {
      const filteredEvents = data.results.reduce((events, event) => {
        if (event && event.attendance_event && moment(event.attendance_event.registration_end).isAfter(moment())) {
          events.push(event);
        }
        return events;
      }, []);
      setEvents(filteredEvents);
    });
  }, []);

  return (
    <div className="event-list">
      {events.slice(0, eventSize).map((event) => {
        return <Event key={event.id} event={event} />;
      })}
    </div>
  );
}

export default EventList;