import {
    OK,
    ERROR_422,
    ERROR_401,
    ERROR
} from "./http-responses";

const data = {
    Items: [
        {
            "userInterest": "Theater",
            "userInterestReferenceDataId": 31,
            "createdAt": "2017-08-09T14:18:21.121Z"
        },
        {
            "userInterest": "Yoga",
            "userInterestReferenceDataId": 36,
            "createdAt": "2017-08-09T14:18:21.132Z"
        }
    ]
};

const error = {
    name: "error"
};

const validationErrorResponse = {
    name: "validation error",
    details: "'\\Bio\\' cannot be null"
};



describe("Tests for API Responses", () => {
    describe("When OK is sent without a code", () => {
        it("Should send data with 200 and success status", () => {
            const resp = OK(data);
            expect(resp.status).toBe("success");
            expect(resp.code).toBe(200);
            expect(resp.data).toBe(data);
        });
    });

    describe("When OK is sent with code", () => {
        it("Should send data with the code that is specified and success status", () => {
            const resp = OK(data, 201);
            expect(resp.status).toBe("success");
            expect(resp.code).toBe(201);
            expect(resp.data).toBe(data);
        });
    });

    describe("When ERROR is sent without a code", () => {
        it("Should send data with the code that is specified and success status", () => {
            const resp = ERROR(error);
            expect(resp.status).toBe("error");
            expect(resp.code).toBe(500);
            expect(resp.error).toBe(error);
        });
    });

    describe("When ERROR is sent with a code", () => {
        it("Should send data with the code that is specified and success status", () => {
            const resp = ERROR(error, 404);
            expect(resp.status).toBe("error");
            expect(resp.code).toBe(404);
            expect(resp.error).toBe(error);
        });
    });

    describe("When Validation Error is sent without a code and '\\Details\\' in error", () => {
        it("Should send data with the code that is specified and success status", () => {
            const resp = ERROR_422(validationErrorResponse);
            expect(resp.status).toBe("fail");
            expect(resp.code).toBe(422);
            expect(resp.data).toBe(validationErrorResponse.details);
        });
    });

    describe("When Validation Error is sent a code and '\\Detail\\' in error", () => {
        const errorData = {
            name: "validation error",
            detail: "'\\Bio\\' cannot be null"
        };
        const errorDataNoName = {
            name: "ValidationError",
            detail: "'\\Bio\\' cannot be null"
        };

        it("Should return error 400 when called ERROR_422 with status code", () => {
            const resp = ERROR_422(errorData, 400);
            expect(resp.status).toBe("fail");
            expect(resp.code).toBe(400);
            expect(resp.data).toBe(errorData.detail);
        });
        it("Should send data with the code that is specified and success status", () => {
            const resp = ERROR(errorDataNoName);
            expect(resp.status).toBe("fail");
            expect(resp.code).toBe(422);
        });
        it("Should return error 400 when called ERROR_422 with status code", () => {
            const resp = ERROR_401("abs");
            expect(resp.status).toBe("fail");
            expect(resp.code).toBe("401");
            expect(resp.data).toBe("abs");
        });

    });
});

