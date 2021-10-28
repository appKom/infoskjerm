import React from 'react';

const Card = ({ children, rowStart, rowSpan = 1, colStart, colSpan = 2 }) => {
  return (
    <div style={{ gridRow: `${rowStart} / span ${rowSpan}`, gridColumn: `${colStart} / span ${colSpan}` }}>
      {children}
    </div>
  );
};

export default Card;
