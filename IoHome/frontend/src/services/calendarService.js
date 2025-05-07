const { google } = require("googleapis");
const fs = require("fs");

async function authorize() {
  const Googleauth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  return Googleauth;
}

async function createEvent() {
  const Googleauth = await authorize();
  const Googlecalendar = google.calendar({ version: "v3", auth: Googleauth }); // <-- aquí el cambio

  const event = {
    summary: "Evento inicial",
    start: {
      dateTime: "2025-04-25T20:00:00-17:00",
      timeZone: "Europe/Madrid_City",
    },
    end: {
      dateTime: "2025-05-25T20:00:00-17:00",
      timeZone: "Europe/Madrid_City",
    },
  };

  Googlecalendar.events.insert(
    { calendarId: "primary", resource: event },
    (err, res) => {
      if (err) return console.error("No se pudo crear el evento:", err);
      console.log("Evento creado correctamente:", res.data);
    }
  );
}

createEvent();
