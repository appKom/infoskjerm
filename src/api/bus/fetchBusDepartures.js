import createEnturClient from '@entur/sdk';
import moment from 'moment';

const enturClient = createEnturClient({
  clientName: 'appkom-infoskjerm',
});

//https://stoppested.entur.org/    NSR:StopPlace:44085 id til gløshaugen
const fetchBusDepartures = async(stoppID) => {
  const stop = await enturClient.getDeparturesFromStopPlace(stoppID);

  const output = [];

  for (const departure of stop) {
    const busnr = departure.serviceJourney.journeyPattern.line.publicCode;
    if (busnr.length > 2) continue;
    output.push({
      busnr,
      retning: departure.destinationDisplay.frontText,
      tid: moment(departure.expectedDepartureTime).format('HH:mm')
    });
    if (output.length >= 5) break;
  }

  return output;
};

export default fetchBusDepartures;