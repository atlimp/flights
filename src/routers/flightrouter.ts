import express, { Request, Response, Router } from 'express';
import { IBaseRouter } from '../interfaces/interfaces';
import { catchAllErrors } from '../util/util';
import FlightController from '../controllers/flightcontroller';

class FlightRouter implements IBaseRouter {

    path = '/';
    
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
        const { scheduledFrom, scheduledTo } = req.query;
        const { airline } = req.params;
        const controller = new FlightController();

        const timePeriods = { 
            scheduledFrom: scheduledFrom ? new Date(Date.parse(scheduledFrom as string)) : new Date(-8640000000000000),
            scheduledTo: scheduledTo ? new Date(Date.parse(scheduledTo as string)) : new Date(8640000000000000),
        };

        let data = [];
        if (airline) {
            data = await controller.arrivalsByAirline(airline, timePeriods);
        }
        else {
            data = await controller.arrivals(timePeriods);
        }

        return res.status(200).json(data);
    }

    async departures(req: Request, res: Response) {
        const { scheduledFrom, scheduledTo } = req.query;
        const { airline } = req.params;
        const controller = new FlightController();

        const timePeriods = { 
            scheduledFrom: scheduledFrom ? new Date(Date.parse(scheduledFrom as string)) : new Date(-8640000000000000),
            scheduledTo: scheduledTo ? new Date(Date.parse(scheduledTo as string)) : new Date(8640000000000000),
        };
        let data = [];
        if (airline) {
            data = await controller.departuresByAirline(airline, timePeriods);
        }
        else {
            data = await controller.departures(timePeriods);
        }

        return res.status(200).json(data);
    }
}

export default FlightRouter;