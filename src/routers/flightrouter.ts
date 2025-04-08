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
        this.router.get('/', catchAllErrors(this.ping));
    }

    initMiddleware() {
    }
    
    async ping(req: Request, res: Response) {
        const controller = new FlightController();

        const result = await controller.flights();

        return res.status(200).json(result);
    }
}

export default FlightRouter;