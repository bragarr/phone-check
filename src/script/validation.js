const landLineDigits = ["2", "3", "4", "5"];

export const isNumberValid = (phoneNumber) => {
    if (
        phoneNumber.length > 11 ||
        (phoneNumber.length < 10 && phoneNumber.length !== 3) ||
        (phoneNumber.length === 10 && !landLineDigits.includes(phoneNumber[2])) ||
        !Number(phoneNumber)
    ) {
        return false;
    } else {
        return true;
    }
};

export const responseMessage = (phoneNumber) => {
    const phoneNumberSize = phoneNumber.length;

    if (
        (phoneNumberSize === 10 && landLineDigits.includes(phoneNumber[2])) ||
        phoneNumberSize === 11 ||
        phoneNumberSize === 3
    ) {
        return "Valid Number";
    } else {
        return "Invalid number";
    }
};

export const numberAreaCode = (data, prefixNumber) => {
    const areaCode = data.filter((item) => item.prefix == prefixNumber);
    return areaCode[0].area;
};
