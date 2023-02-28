import { db } from "../db/db.js";
import { Result } from "../src/script/result.js";
import { responseMessage, isNumberValid, numberAreaCode } from "../src/script/validation.js";

export const informParams = (_, res) => {
    const falseResult = new Result(false, "You need to inform parameter!")
    return res.status(200).json(falseResult);
}

export const getPhoneList = (req, res) => {
    const q = "SELECT * FROM brazil_fone_list";
    const value = req.params.values;

    db.query(q, [value], (err, data) => {
        const digits = value.toString();
        const numberValid = isNumberValid(digits);
        const message = responseMessage(digits);
        if (err) return res.json(err);
        if (!numberValid) {
            const falseResult = new Result(numberValid, message);
            return res.status(200).json(falseResult);
        }
        const prefixNumber = digits.length > 3 ? digits.slice(0, 2) : digits;
        const localDialing = "Utility number";
        const numberArea = numberAreaCode(data, prefixNumber);
        const countryCode = digits.length > 3 ? "+55" : "Not applied";
        const phoneNumber =
            digits.length > 3
                ? digits.slice(2, digits.length - 4) + "-" + digits.slice(-4)
                : digits;
        const internationalFormat = digits.length > 3 ? countryCode + "(" + prefixNumber + ")" + phoneNumber : "Not applied";
        const generalResult = new Result(
            numberValid,
            message,
            localDialing,
            numberArea,
            countryCode,
            prefixNumber,
            phoneNumber,
            internationalFormat
        );
        return res.status(200).json(generalResult);
    });
};

export const addNewPhone = (req, res) => {
    const q = "INSERT INTO phone_list(`phone`,`country`,`city`) VALUES(?)";

    const values = [req.body.phone, req.body.country, req.body.city];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);
        return res.status(200).json("done");
    });
};

export const editPhone = (req, res) => {
    const q =
        "UPDATE testesapi.phone_list SET `phone`=?,`country`=?,`city`=? WHERE (`id`=?)";

    const values = [req.body.phone, req.body.country, req.body.city];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("update");
    });
};