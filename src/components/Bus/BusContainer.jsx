
import Bus from './Bus';
import fetchBusDepartures from '../../api/bus/fetchBusDepartures';
import { useQuery } from 'react-query';

import './Bus.css';

const BusContainer = ({stoppID, busstopp}) => {
  const { isLoading, isError, data: bus } = useQuery(`bus-${stoppID}`, () => fetchBusDepartures(stoppID), {refetchInterval: 1000 * 30});

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
