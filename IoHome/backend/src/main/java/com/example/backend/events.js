app.post("/add-event", async (req, res) => {
    if (!req.session.user) return res.status(401).send("No autorizado");
  
    oauth2Client.setCredentials(req.session.user.tokens);
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  
    const event = {
      summary: "Cita con el cliente",
      start: { dateTime: "2024-04-01T10:00:00Z", timeZone: "Europe/Madrid" },
      end: { dateTime: "2024-04-01T11:00:00Z", timeZone: "Europe/Madrid" },
    };
  
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
  
    res.json(response.data);
  });
  