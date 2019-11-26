import {
    valueFromQueryString, isInvalidQuery, isInvalidHeaderKey,
    isInvalidHttpMethod
} from "./utils";

describe("*********** Request Header and Query Tests ***********", () => {
    it("should validate valueFromQueryString with name", () => {
        let req =  { query: { name: "ali"}};
        const name = valueFromQueryString(req, "name");
        expect(name).toBe("ali");
    });

    it("should validate valueFromQueryString when query not present", () => {
        let req =  { query: { test: "ali"}};
        const name = valueFromQueryString(req, "name");
        expect(name).toBeUndefined();
    });
    it("should validate valueFromQueryString when query not present", () => {
        let req =  { test: { test: "ali"}};
        const name = valueFromQueryString(req, "name");
        expect(name).toBeUndefined();
    });
    it("should validate isInvalidQuery", () => {
        let req =  { query: { name: "ali"}};
        let responseCallback = function(res) {
            console.log(res);
        };
        expect(function () {
            isInvalidQuery(req, ["name"], "none", responseCallback);
        }).not.toThrowError();
    });
    it("should validate isInvalidQuery", () => {
        let req =  { query: { name: "ali"}};
        let responseCallback = function(res) {
            console.log(res);
        };
        const result = isInvalidQuery(req, ["test"], "none", responseCallback);
        expect(result).toEqual(true);
    });
    it("should validate isInvalidHeaderKey", () => {
        let req =  { headers: { name: "ali"}};
        let responseCallback = function(res) {
            console.log(res);
        };
        expect(function () {
            isInvalidHeaderKey(req, ["name"], "none", responseCallback);
        }).not.toThrowError();
    });
    it("should validate isInvalidHeaderKey", () => {
        let req =  { headers: { name: "ali"}};
        let responseCallback = function(res) {
            console.log(res);
        };
        let result = isInvalidHeaderKey(req, ["test"], "none", responseCallback);
        expect(result).toEqual(true);

    });
    it("should validate isInvalidHttpMethod", () => {
        let req =  { method: "GET"};
        let responseCallback = function(res) {
            console.log(res);
        };
        let result = isInvalidHttpMethod(req, "get", responseCallback);
        expect(result).toEqual(false);
    });
    it("should validate isInvalidHttpMethod", () => {
        let req =  { method: "GET"};
        let responseCallback = function(res) {
            console.log(res);
        };
        const result = isInvalidHttpMethod(req, "put", responseCallback);

    });
});
