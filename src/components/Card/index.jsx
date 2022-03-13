import './Card.css';

const Card = ({ children, colStart, colSpan = 2 }) => {
  return (
    <div className="card" style={{ gridColumn: `${colStart} / span ${colSpan}` }}>
      {children}
    </div>
  );
};

export default Card;
