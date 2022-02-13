
import Bus from './Bus';
import createEnturClient from '@entur/sdk';
import {useState, useEffect} from 'react';
import './Bus.css';

const BusContainer = ({stoppID, busstopp}) => {
  console.log(stoppID);

  const enturClient = createEnturClient({
    clientName: 'appkom-infoskjerm',
  });

  const [ bus,setBus ] = useState([]);

  useEffect(() => {
    const getGloshaugen=async() => {
      const glos=await fetchBusDepartures();
      setBus(glos);
    };

    getGloshaugen();
  }, []);

  //https://stoppested.entur.org/    NSR:StopPlace:44085 id til gløshaugen
  const fetchBusDepartures = async() => {
    const gloshaugen = await enturClient.getDeparturesFromStopPlace(stoppID);
    let output=[];
    for(let i=0;i<5; i++){
      output.push({

        busnr: gloshaugen[i].serviceJourney.id.substring(19,gloshaugen[i].serviceJourney.id.indexOf('_')),
        retning: gloshaugen[i].destinationDisplay.frontText,
        tid: gloshaugen[i].aimedDepartureTime.substring(gloshaugen[i].aimedDepartureTime.indexOf('T')+1,gloshaugen[i].aimedDepartureTime.indexOf('+')-3)
      });
    }
    return output;
  };

  console.log(bus);
  console.log(busstopp);

  //bus.map(busitem-><Bus bussnr=busitem.servisejourney.id retning="" tid=""></Bus>)
  return (
    <div className="tabellDiv">
      <h3>{busstopp}</h3>
      <table className="tabell">
        {bus.map((busitem, index) => (
          <Bus key={index} tid={busitem.tid} bussnr={busitem.busnr} retning={busitem.retning}/>
        ))}
      </table>
    </div>
  );
};

export default BusContainer;
