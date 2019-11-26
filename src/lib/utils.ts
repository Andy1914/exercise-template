import * as response from "./http-responses";
import {
    ValidHttpMethodRule, QueryParameterExistsRule, KeyExistsRule
} from "../lib/validators";

export const valueFromQueryString = (req: any, key: string): string => {
    return req.query ? req.query[`${key}`] : undefined;
};

export const isInvalidQuery = (req: any, queryparameters: string[],
    message: string, responseCallback: any): boolean => {
    for (let p of queryparameters) {
        try {
            console.log(`validating ${p} in ${req.query}`);
            new QueryParameterExistsRule().validate(req, p);
        } catch (e) {
            responseCallback(response.ERROR_403(message));
            return true;
        }
    }
    return false;
};
export const isInvalidHeaderKey = (req: any, headerkeys: string[], message: string, responseCallback: any): boolean => {
    for (let p of headerkeys) {
        try {
            new KeyExistsRule().validate(req, p);
        } catch (e) {
            responseCallback(response.ERROR_403(message));
            return true;
        }
    }
    return false;
};
export const isInvalidHttpMethod = (req: any, methods: string, responseCallback: any): boolean => {
    try {
        new ValidHttpMethodRule().validate(req, methods);
    } catch (e) {
        responseCallback(response.ERROR_405);
        return true;
    }
    return false;
};


