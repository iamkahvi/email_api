import * as express from "express";
import * as cors from "cors";
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();

const port = 3000;
app.use(
  cors({
    origin: ["https://kahvipatel.com", "http://kahvipatel.com"],
  })
);
app.use(express.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/email", async (req, res) => {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
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
