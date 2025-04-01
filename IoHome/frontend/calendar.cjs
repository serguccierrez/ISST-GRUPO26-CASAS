const express = require("express");
const { google } = require("googleapis");
const session = require("cookie-session");
require("dotenv").config();

const app = express();

app.use(session({ secret: "clave-secreta", resave: false, saveUninitialized: true }));

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

app.get("/auth", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar.events"],
  });
  res.redirect(url);
});

app.get("/auth/callback", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  req.session.tokens = tokens;
  res.redirect("/calendar");
});

app.get("/calendar", async (req, res) => {
  if (!req.session.tokens) return res.redirect("/auth");

  oauth2Client.setCredentials(req.session.tokens);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const { data } = await calendar.events.list({ calendarId: "primary" });
  res.json(data);
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));

