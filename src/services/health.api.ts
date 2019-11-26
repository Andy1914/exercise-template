import { OK, ERROR } from "../lib/http-responses";

export const checkHealth = (service, callback: any) => {
    service.check().subscribe(healthStatus => callback(OK(healthStatus)),
        error => callback(ERROR(error)));
};
