// src/components/CalendarView.jsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";


const CalendarView = () => {
  return (
    <iframe
      src="https://calendar.google.com/calendar/embed?src=TU_EMAIL@gmail.com&ctz=Europe/Madrid"
      style={{ border: "solid 1px #777" }}
      width="450"
      height="450"
      frameBorder="0"
      scrolling="no"
    ></iframe>
  );
};

export default CalendarView;
