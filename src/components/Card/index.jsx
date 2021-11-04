import React from 'react';

import './Card.css';

const Card = ({ children, rowStart, rowSpan = 1, colStart, colSpan = 2 }) => {
  return (
    <div className="card" style={{ gridRow: `${rowStart} / span ${rowSpan}`, gridColumn: `${colStart} / span ${colSpan}` }}>
      {children}
    </div>
  );
};

export default Card;
