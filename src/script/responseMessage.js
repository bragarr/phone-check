export const responseMessage = (params) => {
    const phoneNumberSize = params.length;

    switch (phoneNumberSize) {
        case 3:
            return "Utility number";
            break;
        case 10, 11:
            return "Valid number";
            break;
        default:
            return "Invalid number";
            break;
    }
}