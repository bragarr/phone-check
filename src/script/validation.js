export const isNumberValid = (params) => {
    if (
        params.length > 11 ||
        (params.length < 10 && params.length !== 3) ||
        !Number(params)
    ) {
        return false;
    } else {
        return true;
    }
};

export const responseMessage = (params) => {
    const phoneNumberSize = params.length;

    switch (phoneNumberSize) {
        case (10, 11, 3):
            return "Valid number";
            break;
        default:
            return "Invalid number";
            break;
    }
};

export const typeValidation = (digits, data) => {
    const type =
    digits.length > 3
        ? data.filter((type) => type.prefix === digits.slice(2, 3))
        : data.filter((type) => type.prefix === digits);
    console.log(type)
    return type[0].area
}

export const phoneNumberAreaRes = (data, prefixNumber) => {
    const phoneNumberArea = data.filter((item) => item.prefix === prefixNumber);
    return phoneNumberArea[0].area;
}
