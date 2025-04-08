import { IBaseController } from '../interfaces/interfaces';
import { getData } from '../services/flightdataservice';

class FlightController implements IBaseController {

    async flights(): Promise<any> {
        return await getData();
    }
}

export default FlightController;