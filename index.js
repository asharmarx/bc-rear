const express = require("express");

const designers = require("./designers");
const shirts = require("./shirts");

const app = express();
const port = process.env.PROD_PORT || 9442;

const whereDatComeFrom =
  process.env.NODE_ENV === "production"
    ? "https://bizarrocollective.com"
    : "http://localhost:3000";

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.get("/", (req, res) => {
  return res.send(`Thanks for increasing entropy :)`);
});

app.get("/designers", (req, res) => {
  return res.send(designers);
});
app.get("/shirts", (req, res) => {
  return res.send(shirts);
});
app.get("/shirt/:shirt", (req, res) => {
  const shirt = shirts.find((shirt) => shirt.route_name === req.params.shirt);
  res.send(shirt);
});

app.listen(port, () => {
  const event = new Date(Date.now());
  console.log(
    `bc brain listening on port ${port} ${event.toLocaleDateString()} ${event.toLocaleTimeString()}`
  );
});
