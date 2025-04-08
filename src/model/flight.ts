class Flight {

    actualDateTime: Date;
    estimatedDateTime: Date;
    scheduledDateTime: Date;
    airlineDesc: string;
    airlineIATA: string;
    stand: string;
    flightNumber: string;
    flightStatus: string;
    flightStatusDesc: string;
    gate: string;
    landsideMsg: string;
    airportDesc: string;
    airportIATA: string;
    registration: string;
    direction: "A" | "D";
}

export default Flight;