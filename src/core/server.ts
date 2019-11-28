import * as express from 'express';
import {loadRoutes} from '../loaders/loadRoutes'

const init = function(port) {
    const app = express();
    loadRoutes(app);
    app.listen(port, () => {
        console.log(`Server listening at port: ${port}`);
    })
}

export {
    init
}