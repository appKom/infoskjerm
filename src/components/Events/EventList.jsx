import React, { useEffect, useState } from 'react';
import { fetchEventsByStartDate } from '../../api/EventApi';
// import Card from '../Card/Card';
// import apiResponse from './api_response.json';
import Event from './Event';
import './EventList.css';

function EventList() {
  const [ events, setEvents ] = useState([]);

  useEffect(() => {
    fetchEventsByStartDate().then((data) => {
      setEvents(data.results);
    });
  });

  return (
    <div className="event-list">
      {events.map((event) => {
        return <Event key={event.id} event={event} />;
      })}
    </div>
  );
}

export default EventList;