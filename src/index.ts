import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

const app = express();
app.use(cors())
app.use(bodyParser.json());

const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/email', (req, res) => {
    res.status(200).send(JSON.stringify({
        foo: "bar"
    }))
    console.log(req.body);
})


