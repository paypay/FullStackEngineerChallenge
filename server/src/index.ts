import express from "express";
import bodyParser from "body-parser";
import { RouterEmployee } from "./routes";

const app = express();

app.use(bodyParser.json());
app.use("/v1", RouterEmployee);

app.listen(8081);
