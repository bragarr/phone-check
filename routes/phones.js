import express from "express";
import { getPhoneList, addNewPhone } from "../controller/phone.js";

export const routerPhones = express.Router();

routerPhones.get("/", getPhoneList);
routerPhones.post("/", addNewPhone);