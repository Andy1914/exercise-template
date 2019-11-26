import {
    invalid_http_method, no_parameters, no_querystring, ValidationRule,
    NonNullOrEmptyParametersRule, NonNullOrEmptyQueryStringRule,
    KeyExistsRule, QueryParameterExistsRule, ValidHttpMethodRule
} from "./validators";

describe("*********** Validation Rule Tests ***********", () => {
    it("should validate NonNullOrEmptyParametersRule with req null", () => {
        expect(function () {
            new NonNullOrEmptyParametersRule().validate(undefined);
        }).toThrowError(no_parameters);
    });
    it("should validate NonNullOrEmptyParametersRule with req.params null", () => {
        expect(function () {
            new NonNullOrEmptyParametersRule().validate({});
        }).toThrowError(no_parameters);
    });
    it("should validate NonNullOrEmptyParametersRule with req.params with length 0 ", () => {
        let req = {params: {}};
        expect(function () {
            new NonNullOrEmptyParametersRule().validate(req);
        }).toThrowError(no_parameters);
    });
    it("should validate NonNullOrEmptyParametersRule with req.params present", () => {
        let req = {
            params: {
                headers: {UserKey: "hello"}
            }
        };
        expect(function () {
            new NonNullOrEmptyParametersRule().validate(req);
        }).not.toThrow();
    });

    it("should validate KeyExistsRule with req is null", () => {
        expect(function () {
            new KeyExistsRule().validate(undefined, "UserKey");
        }).toThrowError(no_parameters);
    });
    it("should validate KeyExistsRule with req.headers null", () => {
        expect(function () {
            new KeyExistsRule().validate({}, "Authorization");
        }).toThrowError(no_parameters);
    });
    it("should validate KeyExistsRule with Authorization does not exist", () => {
        let req = { headers: { test: "hello"}};
        expect(function () {
            new KeyExistsRule().validate(req, "Authorization");
        }).toThrowError("Key 'Authorization' not found.");
    });
    it("should validate KeyExistsRule with Authorization exist", () => {
        let req = { headers: { Authorization: "hello"} };
        expect(function () {
            new KeyExistsRule().validate(req, "Authorization");
        }).not.toThrow();
    });

    it("should validate ValidHttpMethodRule with req is null", () => {
        expect(function () {
            new ValidHttpMethodRule().validate(undefined, "test");
        }).toThrowError(invalid_http_method);
    });

    it("should validate ValidHttpMethodRule with  method does not exist", () => {
        let req = {params: {"test": "hello"}};
        expect(function () {
            new ValidHttpMethodRule().validate(req, "test");
        }).toThrowError(invalid_http_method);
    });
    it("should validate ValidHttpMethodRule with http method GET ", () => {
        let req = {method: "GET"};
        expect(function () {
            new ValidHttpMethodRule().validate(req, "get,post");
        }).not.toThrow();
    });
    it("should validate ValidHttpMethodRule with http method POST ", () => {
        let req = {method: "POST"};
        expect(function () {
            new ValidHttpMethodRule().validate(req, "get,post");
        }).not.toThrow();
    });
    it("should validate ValidHttpMethodRule with http method PUT ", () => {
        let req = {method: "PUT"};
        expect(function () {
            new ValidHttpMethodRule().validate(req, "get,put");
        }).not.toThrow();
    });
    it("should validate ValidHttpMethodRule with http method GET is not valid ", () => {
        let req = {method: "GET"};
        expect(function () {
            new ValidHttpMethodRule().validate(req, "post,put");
        }).toThrowError(invalid_http_method);
    });


    it("should validate NonNullOrEmptyQueryStringRule with req null", () => {
        expect(function () {
            new NonNullOrEmptyQueryStringRule().validate(undefined);
        }).toThrowError(no_parameters);
    });

    it("should validate NonNullOrEmptyQueryStringRule with req.query with length 0", () => {
        let req = {query: {}};
        expect(function () {
            new NonNullOrEmptyQueryStringRule().validate(req);
        }).toThrowError(no_querystring);
    });

    it("should validate NonNullOrEmptyQueryStringRule with req.query present", () => {
        let req = { query: { name: "ali"} };
        expect(function () {
            new NonNullOrEmptyQueryStringRule().validate(req);
        }).not.toThrow();
    });

    it("should validate QueryParameterExistsRule with req null", () => {
        expect(function () {
            new QueryParameterExistsRule().validate(undefined, "test");
        }).toThrowError(no_parameters);
    });

});
