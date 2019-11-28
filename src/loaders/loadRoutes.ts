import { EchoService } from '../services';

export function loadRoutes(app) {
    console.log('loading routes...');
    app.use('/echo', new EchoService());
}