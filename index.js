import express from "express";
import cors from "cors";

import { routerPhones } from "./routes/phones.js";

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/phonelist", routerPhones);

app.listen(port, () => {
    console.log("Server on");
})