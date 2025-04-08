import express, { Request, Response, Router } from 'express';
import { IBaseRouter } from '../interfaces/interfaces';
import { catchAllErrors } from '../util/util';
import FlightController from '../controllers/flightcontroller';

class FlightRouter implements IBaseRouter {

    path = '/flights';
    
    router: Router = express.Router();
    
    constructor() {
        this.initMiddleware();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/arrivals/:airline', catchAllErrors(this.arrivals));
        this.router.get('/arrivals', catchAllErrors(this.arrivals));
        this.router.get('/departures/:airline', catchAllErrors(this.departures));
        this.router.get('/departures', catchAllErrors(this.departures));
    }

    initMiddleware() {
    }
    
    async arrivals(req: Request, res: Response) {
        const { airline } = req.params;
        const controller = new FlightController();

        let data = [];
        if (airline) {
            data = await controller.arrivalsByAirline(airline);
        }
        else {
            data = await controller.arrivals();
        }

        return res.status(200).json(data);
    }

    async departures(req: Request, res: Response) {
        const { airline } = req.params;
        const controller = new FlightController();


        let data = [];
        if (airline) {
            data = await controller.departuresByAirline(airline);
        }
        else {
            data = await controller.departures();
        }

        return res.status(200).json(data);
    }
}

export default FlightRouter;