import './Bus.css';

const Bus = ({bussnr, retning, tid}) => {
  return (
    <tr className="bus">
      <td className="buss3 bussNr">{bussnr}</td>
      <td className="buss3">{retning}</td>
      <td className="buss3 tid">{tid}</td>
    </tr>
  );
};

export default Bus;