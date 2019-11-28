import {EchoService} from "../services";
import { throwError } from "rxjs";

class ServiceErrorStub {
    public check() {
        return throwError(new Error("Test error"));
    }
}
describe("*********** Unit Tests for Echo Service ***********", () => {
    let echoService: EchoService;
    describe("Echo Service", () => {
        let result;
        beforeEach((done) => {
            echoService = new EchoService();
            done();

        });
        it("should instantiate", () => {
            expect(echoService).toBeDefined();
        });
    });
});
