
class Exceptions {
    code;
    message;
    constructor(codeNumber) {
        this.code = codeNumber;
        switch (this.code) {
            case 401:
                this.message = "Unauthorized";
                break;
            case 404:
                this.message = "Not found"
                break;
            case 409:
                this.message = "Conflict";
                break;
            case 422:
                this.message = "Unprocessable Entity";
                break;
            case 500:
                this.message = "Internal Server Error";
                break;
            case 503:
                this.message = "Service Unavailable";
                break;
            default:
                this.message = "Unknown Error";
                break;
        }
    }

    getCode() {
        return this.code;
    }

    getMessage() {
        return this.message;
    }


}

module.exports = Exceptions;