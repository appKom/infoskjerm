import React from 'react';
import './Bus.css';

const Bus = ({bussnr, retning, tid}) => {
  return (
    <tr className="bus">
      {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/RWBA_Bus.svg/1200px-RWBA_Bus.svg.png" alt="bilde av bus" className="bildebus" style={{height:'155px', padding: '5px', marginBottom: '2px'}}/> */}
      <td className="buss3 bussNr">{bussnr}</td>
      <td className="buss3">{retning}</td>
      <td className="buss3 tid">{tid}</td>
    </tr>
  );
};

export default Bus;