
import Bus from './Bus';
import createEnturClient from '@entur/sdk';
import { useQuery } from 'react-query';
import './Bus.css';

const BusContainer = ({stoppID, busstopp}) => {
  const enturClient = createEnturClient({
    clientName: 'appkom-infoskjerm',
  });

  //https://stoppested.entur.org/    NSR:StopPlace:44085 id til gløshaugen
  const fetchBusDepartures = async() => {
    const gloshaugen = await enturClient.getDeparturesFromStopPlace(stoppID);
    let output=[];
    for(let i=0;i<5; i++){

      if(gloshaugen[i].serviceJourney.id.substring(19,gloshaugen[i].serviceJourney.id.indexOf('_')).length<=2){
        output.push({
          busnr: gloshaugen[i].serviceJourney.id.substring(19,gloshaugen[i].serviceJourney.id.indexOf('_')),
          retning: gloshaugen[i].destinationDisplay.frontText,
          tid: gloshaugen[i].aimedDepartureTime.substring(gloshaugen[i].aimedDepartureTime.indexOf('T')+1,gloshaugen[i].aimedDepartureTime.indexOf('+')-3)
        });
      }
    }
    return output;
  };

  const { isLoading, isError, data: bus } = useQuery('bus', fetchBusDepartures);

  if (isLoading || isError) return null;

  return (
    <div className="tabellDiv">
      <div className="header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/RWBA_Bus.svg/1200px-RWBA_Bus.svg.png" alt="bilde av bus" className="bildebus inline" style={{height:'155px', padding: '5px', marginBottom: '2px'}}/>
        <h3 className="inline">{busstopp}</h3>
      </div>
      <table className="tabell">
        <tbody>
          {bus.map((busitem, index) => (
            <Bus key={index} tid={busitem.tid} bussnr={busitem.busnr} retning={busitem.retning}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusContainer;
