export const no_parameters = "No Parameters found.";
export const no_querystring = "No query string present.";
export const invalid_http_method = "Invalid Http Method";

export interface ValidationRule {
    validate(req: any, key?: string): void;
}

export class NonNullOrEmptyParametersRule implements ValidationRule {

    public validate(req: any): void {
        if (!req) {
            throw new Error(no_parameters);
        }
        if (!req.params) {
            throw new Error(no_parameters);
        }
        if (Object.keys(req.params).length === 0) throw new Error(no_parameters);
    }
}
export class NonNullOrEmptyQueryStringRule implements ValidationRule {
    public  validate(req: any): void {
        if (!req) {
            throw new Error(no_parameters);
        }
        if (!req.query)  throw new Error(no_querystring);
        if (Object.keys(req.query).length === 0) throw new Error(no_querystring);
    }
}
export class KeyExistsRule implements ValidationRule {
    public  validate(req: any, key: string): void {
        if (!req) throw new Error(no_parameters);
        if (!req.headers) throw new Error(no_parameters);
        if (!req.headers[`${key}`]) throw new Error(`Key '${key}' not found.`);
    }
}

export class QueryParameterExistsRule implements ValidationRule {
    public  validate(req: any, key: string): void {
        if (!req) throw new Error(no_parameters);
        if (!req.query)  throw new Error(no_querystring);
        if (Object.keys(req.query).length === 0) throw new Error(no_querystring);
        if (!req.query[key]) throw new Error(`Parameter '${key}' not found.`);
    }
}

export class ValidHttpMethodRule implements ValidationRule {
    public  validate(req: any, methods: string): void {
        if (!req) throw new Error(invalid_http_method);
        if (!req.method) throw new Error(invalid_http_method);
        if (!(methods.indexOf(req.method.toLowerCase()) >= 0)) throw new Error(invalid_http_method);

    }
}

