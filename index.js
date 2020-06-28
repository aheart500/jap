require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3001;
const JAP_API_URL = "https://justanotherpanel.com/api/v2";
const JAP_API_KEY = process.env.JAP_API_KEY;
const SMM_API_KEY = process.env.SMM_API_KEY;
const SMM_API_URL = "https://smmcpan.com/api/v2";
const SavedServices = require("./services");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.get("/api/recent-services", (req, res) => {
  axios
    .post(SMM_API_URL, { key: SMM_API_KEY, action: "services" })
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/api/services", (_req, res) => {
  res.json(SavedServices);
});
app.post("/api/order", (req, res) => {
  /* const { service, link, quantity, runs, interval } = req.body;

  axios
    .post(SMM_API_URL, {
      key: SMM_API_KEY,
      action: "add",
      service: service.service,
      link,
      quantity,
      runs,
      interval,
    })
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => {
      console.log(err);
    }); */
  res.send({ order: "11152" });
});
app.get("/api/order/:id", (req, res) => {
  axios
    .post(SMM_API_URL, {
      key: SMM_API_KEY,
      action: "status",
      order: req.params.id,
    })
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/api/balance", (_req, res) => {
  axios
    .post(SMM_API_URL, { key: SMM_API_KEY, action: "balance" })
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
