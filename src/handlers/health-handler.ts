import {HealthService, checkHealth} from "../services";
import {isInvalidHttpMethod} from "../lib/utils";

const paths = ["health"];

const handler = function (req, context, responseCallback) {
    if (isInvalidHttpMethod(req, "get", responseCallback)) return;
    checkHealth(new HealthService(), responseCallback);
};
export {paths, handler};
