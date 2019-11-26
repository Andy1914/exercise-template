import {HealthService, checkHealth} from "../services";
import { throwError } from "rxjs";

class ServiceErrorStub {
    public check() {
        return throwError(new Error("Test error"));
    }
}
describe("*********** Unit Tests for Health API ***********", () => {
    let healthService: HealthService;
    let result: any;
    describe("Health Check", () => {
        let result;
        beforeEach((done) => {
            healthService = new HealthService();
            done();

        });
        it("should instantiate", () => {
            expect(healthService).toBeDefined();
        });
        it("should checkHealth", () => {
            checkHealth(healthService, (resultData) => {
                result = resultData;
                console.log(resultData);
            });
            expect(result).toBeDefined();
        });
        describe("When healcheck return error", () => {
            let result;
            beforeEach((done) => {
                checkHealth(new ServiceErrorStub(), (data) => {
                    result = data;
                    done();
                });

            });
            it("Verify checkHealth returned error", () => {
                expect(result).toBeTruthy();
                expect(result.code).toBeTruthy();
            });
        });


    });
});
