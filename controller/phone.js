import { db } from "../db/db.js";

export const getPhoneList = (req, res) => {
    const q = "SELECT * FROM brazil_fone_list";

    const value = [
        req.body.phone_number
    ]

    db.query(q, [value],(err, data) => {
        if(err) return res.json();
        if(value[0].length > 11 || value[0].length < 10 || !Number(value[0])) {
            return res.status(200).json("Not valid");
        } else {
            const prefixNumber = value[0].slice(0,2);
            const phoneNumber = value[0].slice(2, (value[0].length)-4)+"-"+value[0].slice(-4);
            const phoneNumberArea = data.filter(item => item.prefix===prefixNumber);

            const result = {
                code: "+55",
                prefix:"("+prefixNumber+")",
                phone_number: phoneNumber,
                area: phoneNumberArea[0].area,
                country: "Brazil",
                international_format: "+55"+"("+prefixNumber+")"+phoneNumber
            }
            return res.status(200).json(result);
        }
    })
}

export const addNewPhone = (req, res) => {
    const q = "INSERT INTO phone_list(`phone`,`country`,`city`) VALUES(?)";

    const values = [
        req.body.phone,
        req.body.country,
        req.body.city
    ];

    db.query(q, [values], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("done");
    })
}

export const editPhone = (req, res) => {
    const q = "UPDATE testesapi.phone_list SET `phone`=?,`country`=?,`city`=? WHERE (`id`=?)";

    const values = [
        req.body.phone,
        req.body.country,
        req.body.city
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("update");
    })
}