import {
    handler
} from "./health-handler";
import * as services from "../services";



describe("Health Handler", () => {
    describe("when handler is called", () => {
        it("should invoke checkHealth", () => {
            spyOn(services, "checkHealth").and.callFake(function(undefined) {});
            const req = JSON.parse(`{"method":"get","body":null,"params":{"action":"health"}}`);
            handler(req, null, undefined);
            expect(services.checkHealth).toHaveBeenCalled();


        });

        it("should return error if invalid method", () => {
            const req = JSON.parse(`{"method":"put","body":null,"params":{"action":"health"}}`);
            handler(req, null, function(resp) {
                expect(resp.code).toBe("405");
            });

        });


    });
});


