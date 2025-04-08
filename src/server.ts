import App from './app';
import BaseRouter from './routers/baserouter';
import FlightRouter from './routers/flightrouter';
import { getConfigOrDefault } from './util/util';

const host: string = getConfigOrDefault('HOST', 'localhost');
const port: number = getConfigOrDefault('process.env.PORT', 3000, (x: string) => Number(x));


const app = new App({
    host,
    port,
    routers: [
        new FlightRouter(),
    ],
});

app.listen();
