import express from "express";
import { getPhoneList, addNewPhone, editPhone } from "../controller/phone.js";

export const routerPhones = express.Router();

routerPhones.get("/", getPhoneList);
routerPhones.post("/", addNewPhone);
routerPhones.put("/:id", editPhone);