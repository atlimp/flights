import { IBaseController } from '../interfaces/interfaces';
import Flight from '../model/flight';
import { getData } from '../services/flightdataservice';

class FlightController implements IBaseController {

    async arrivals({ scheduledFrom, scheduledTo }: { scheduledFrom: Date, scheduledTo: Date}): Promise<Flight[]> {
        const { arrivals } = await getData();

        return arrivals.map(this.mapToFlight).filter((x: Flight) => x.scheduledDateTime >= scheduledFrom && x.scheduledDateTime <= scheduledTo);
    }

    async departures({ scheduledFrom, scheduledTo }: { scheduledFrom: Date, scheduledTo: Date}): Promise<Flight[]> {
        const { departures } = await getData();

        return departures.map(this.mapToFlight).filter((x: Flight) => x.scheduledDateTime >= scheduledFrom && x.scheduledDateTime <= scheduledTo);
    }

    async departuresByAirline(airlineIATA: string, { scheduledFrom, scheduledTo }: { scheduledFrom: Date, scheduledTo: Date}): Promise<Flight[]> {
        const departures = await this.departures({ scheduledFrom, scheduledTo });

        return departures.filter(x => x.airlineIATA === airlineIATA);
    }

    async arrivalsByAirline(airlineIATA: string, { scheduledFrom, scheduledTo }: { scheduledFrom: Date, scheduledTo: Date}): Promise<Flight[]> {
        const arrivals = await this.arrivals({ scheduledFrom, scheduledTo });

        return arrivals.filter(x => x.airlineIATA === airlineIATA);
    }

    mapToFlight(data: any): Flight {
        return {
            actualDateTime: new Date(Date.parse(data.ActualDateTime)),
            estimatedDateTime: new Date(Date.parse(data.EstimatedDateTime)),
            scheduledDateTime: new Date(Date.parse(data.ScheduledDateTime)),
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