import createEnturClient from '@entur/sdk';
import moment from 'moment';

const enturClient = createEnturClient({
  clientName: 'appkom-infoskjerm',
});

//https://stoppested.entur.org/    NSR:StopPlace:44085 id til gløshaugen
const fetchBusDepartures = async(stoppID) => {
  const stop = await enturClient.getDeparturesFromStopPlace(stoppID);

  const output = stop.slice(0, 5).map(departure => ({
    busnr: departure.serviceJourney.journeyPattern.line.publicCode,
    retning: departure.destinationDisplay.frontText,
    tid: moment(departure.expectedDepartureTime).format('HH:mm')
  }));

  return output;
};

export default fetchBusDepartures;