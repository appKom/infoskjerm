import React from 'react';
// import Card from '../Card/Card';
import apiResponse from './api_response.json';
import Event from './Event';
import './EventList.css';

function EventList() {
  return (
    <div className="event-list">
      {apiResponse.results.map((event) => {
        return <Event key={event.id} event={event} />;
      })}
    </div>
  );
}

export default EventList;