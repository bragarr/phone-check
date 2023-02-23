import { db } from "../db/db.js";

export const getPhoneList = (_, res) => {
    const q = "SELECT * FROM phone_list";

    db.query(q, (err, data) => {
        if(err) return res.json();

        return res.status(200).json(data);
    })
}

export const addNewPhone = (req, res) => {
    const q = "INSERT   INTO phone_list(`phone`,`country`,`city`) VALUES(?)";

    const values = [
        req.body.phone,
        req.body.country,
        req.body.city
    ];

    db.query(q, [values], (err) => {
        if(err) return res.json(err);

        return res.status(200).json(values);
    })
}