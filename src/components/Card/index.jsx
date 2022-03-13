import './Card.css';

const Card = ({ children, className, colStart, colSpan = 2 }) => {
  return (
    <div className={`card ${className}`} style={{ gridColumn: `${colStart} / span ${colSpan}` }}>
      {children}
    </div>
  );
};

export default Card;
