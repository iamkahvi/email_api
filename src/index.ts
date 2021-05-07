import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
const md5 = require("md5");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();

const port = 3000;
app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/email", async (req, res) => {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  const campaignId = process.env.MALICHIMP_CAMPAIGN_ID;
  const subscribeURL = `https://us19.api.mailchimp.com/3.0/lists/${listId}/members/`;
  // Should only allow requests from https://kahvipatel.com
  const subscribeBody = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${apiKey}`,
    },
    body: JSON.stringify({
      email_address: req.body.email,
      status: "subscribed",
    }),
  };

  const sendURL = `https://us19.api.mailchimp.com/3.0/campaigns/${campaignId}/actions/send/`;
  const sendBody = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${apiKey}`,
    },
    body: JSON.stringify({
      title: "foobar",
    }),
  };

  const response = await fetch(subscribeURL, subscribeBody);

  const data = await response.json();

  console.log(data);

  if (data.status === "subscribed") {
    res.status(200).send(JSON.stringify({ title: "subscription successful!" }));
  } else {
    res
      .status(data.status)
      .send(
        JSON.stringify({ title: data.title, description: data.description })
      );
  }
});
