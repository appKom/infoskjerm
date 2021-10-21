
import Bus from './Bus';

const BusContainer = () => {
  return (
    <div>
      <Bus bussnr="3" retning="Moholt" tid="15:30"></Bus>;
      <Bus bussnr="22" retning="Tyholt" tid="09:30"></Bus>;
      <Bus bussnr="3" retning="Hallset" tid="12:30"></Bus>;
      <Bus bussnr="22" retning="Vestlia" tid="07:45"></Bus>;

    </div>
  );
};

export default BusContainer;
