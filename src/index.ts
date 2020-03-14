import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
const md5 = require("md5");
const fetch = require("node-fetch");

const app = express();

const port = 3000;
app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/email", async (req, res) => {
  res.status(200).send("subscription successful!");
  console.log(req.body);
  console.log(req.body.email);
  const apiKey = "b6f30bb2eba093453b54fb9592bd1ea5-us19";
  const listId = "b2503f99aa";
  const md5Email = md5(req.body.email);
  const url = `https://us19.api.mailchimp.com/3.0/lists/${listId}/members/${md5Email}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Basic ${apiKey}`
    }
  });
  const data = await response.json()
  console.log(data)
});
