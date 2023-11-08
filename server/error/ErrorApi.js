class ErrorApi extends Error {
    constructor(code, message) {
        super()
        this.code = code;
        this.message = message;
    }

    static badRequest() {
        return new ErrorApi(200, { status: 400, message: "Bad Request" });
    }

    static internalServerError() {
        return new ErrorApi(200, { status: 500, message: "Internal Server Error" });
    }

    static unauthorized() {
        return new ErrorApi(200, { status: 401, message: "Unauthorized" });
    }

    static forbidden() {
        return new ErrorApi(200, { status: 403, message: "Forbidden" });
    }

    static notFound() {
        return new ErrorApi(200, { status: 404, message: "Not Found" });
    }
}

module.exports = ErrorApi;