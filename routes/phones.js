import express from "express";
import { informParams, getPhoneList, addNewPhone, editPhone } from "../controller/phone.js";

export const routerPhones = express.Router();

routerPhones.get("/", informParams);
routerPhones.get("/:values", getPhoneList);
routerPhones.post("/", addNewPhone);
routerPhones.put("/:id", editPhone);