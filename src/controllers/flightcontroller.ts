import { IBaseController } from '../interfaces/interfaces';
import Flight from '../model/flight';
import { getData } from '../services/flightdataservice';

class FlightController implements IBaseController {

    async arrivals(): Promise<Flight[]> {
        const { arrivals } = await getData();

        return arrivals.map(this.mapToFlight);
    }

    async departures(): Promise<Flight[]> {
        const { departures } = await getData();

        return departures.map(this.mapToFlight);
    }

    async departuresByAirline(airlineIATA: string): Promise<Flight[]> {
        const departures = await this.departures();

        return departures.filter(x => x.airlineIATA === airlineIATA);
    }

    async arrivalsByAirline(airlineIATA: string): Promise<Flight[]> {
        const arrivals = await this.arrivals();

        return arrivals.filter(x => x.airlineIATA === airlineIATA);
    }

    mapToFlight(data: any): Flight {
        return {
            actualDateTime: data.ActualDateTime,
            estimatedDateTime: data.EstimatedDateTime,
            scheduledDateTime: data.ScheduledDateTime,
            airlineDesc: data.AirlineDesc,
            airlineIATA: data.AirlineIATA,
            stand: data.StandCode,
            flightNumber: `${data.AirlineIATA}${data.FlightNumber}`,
            flightStatus: data.FlightStatus,
            flightStatusDesc: data.FlightStatusDesc,
            gate: data.GateCode,
            landsideMsg: data.LandsideMessage1,
            airportDesc: data.OriginDestAirportDesc,
            airportIATA: data.OriginDestAirportIATA,
            registration: data.Registration,
            direction: data.DepartureArrivalType,
        } as Flight;
    }
}

export default FlightController;