export const ERROR_404 = {
    name: "INVALID_PATH",
    message: "Invalid path",
    code: "404"
};

export const ERROR_405 = {
    name: "METHOD_NOT_ALLOWED",
    message: "Method not allowed",
    code: "405"
};

export const ERROR_403 = (message?: any) => {
    return {
        code: "403",
        type: "NOT_ALLOWED",
        message: message,
        status: "fail",
        data: message
    };
};

export const ERROR_401 = (message?: any) => {
    return {
        code: "401",
        data: message,
        message: "Session timed out",
        status: "fail",
        type: "UNAUTHORIZED"
    };
};

export const OK = (data: any, responseCode?: number) => {
    responseCode = responseCode ? responseCode : 200;
    return {
        data: data,
        code: responseCode,
        status: "success"
    };
};


export const ERROR = (error: any, responseCode?: number) => {
    if (error.name !== undefined && error.name === "ValidationError") {
        responseCode = 422;
        return {
            code: responseCode,
            type: "Validation Error",
            message: "Validation Error",
            status: "fail",
            error: error
        };
    } else {
        responseCode = responseCode ? responseCode : 500;
        return {
            error: error,
            code: responseCode,
            status: "error"
        };
    }
};

export const ERROR_422 = (error: any, responseCode?: number) => {
    responseCode = responseCode ? responseCode : 422;
    const details = error.details ? error.details : error.detail;
    return {
        code: responseCode,
        type: "Validation Error",
        message: "One or more of the attributes entered do not exist on the schema of the object to be created",
        status: "fail",
        data: details
    };
};
