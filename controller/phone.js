import { db } from "../db/db.js";
import { Result } from "../src/script/result.js";

export const getPhoneList = (req, res) => {
    const q = "SELECT * FROM brazil_fone_list";
    const value = req.params.values;

    db.query(q, [value], (err, data) => {
        const digits = value.toString();
        if (err) return res.json(err);
        if (digits.length > 11 || digits.length < 10 && digits.length !== 3 || !Number(digits)) {
            const falseResult = new Result(false, "Enter a valid number!");
            return res.status(200).json(falseResult);
        }
        const prefixNumber = digits.slice(0, 2);
        const phoneNumber =
            digits.slice(2, digits.length - 4) + "-" + digits.slice(-4);
        const phoneNumberArea = data.filter(
            (item) => item.prefix === prefixNumber
        );
        const type = data.filter(
            (type) => type.prefix === phoneNumber.slice(0, 1)
        );
        const generalResult = new Result(
            true,
            "Valid number",
            type[0].area,
            phoneNumberArea[0].area,
            "Brazil",
            "+55",
            "(" + prefixNumber + ")",
            phoneNumber,
            "+55" + "(" + prefixNumber + ")" + phoneNumber
        );
        return res.status(200).json(generalResult);
    });
};

export const addNewPhone = (req, res) => {
    const q = "INSERT INTO phone_list(`phone`,`country`,`city`) VALUES(?)";

    const values = [
        req.body.phone,
        req.body.country,
        req.body.city
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);
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
        if (err) return res.json(err);

        return res.status(200).json("update");
    })
}