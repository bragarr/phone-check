export class Result {
    constructor(status,
        message,
        local_dialing,
        area,
        code,
        area_code,
        local_number,
        international_format) {
        this.status = status;
        this.message = message;
        this.local_dialing = local_dialing;
        this.area = area;
        this.code = code;
        this.area_code = area_code;
        this.local_number = local_number;
        this.international_format = international_format;
    }
};