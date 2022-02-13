const Bus = ({bussnr, retning, tid}) => {
  return (
    <div className="bus">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/RWBA_Bus.svg/1200px-RWBA_Bus.svg.png" alt="bilde av bus" id="bilde-av-bus"/>
      <p id="buss3">{bussnr} {retning} {tid}</p>
    </div>
  );
};

export default Bus;