// src/components/CalendarView.jsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  const API_KEY = 'TU_API_KEY';
  const CALENDAR_ID = 'TU_CALENDAR_ID';

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`
      );
      const data = await res.json();
      const formatted = data.items.map(event => ({
        title: event.summary,
        date: event.start.date || event.start.dateTime,
      }));
      setEvents(formatted);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h3>Eventos programados</h3>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />
    </div>
  );
};

export default CalendarView;
