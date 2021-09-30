import React from 'react';
import logo from '../../assets/online_logo.svg';

function Image({ url, alt = 'Image', color, className }) {
  const src = url ? `https://online.ntnu.no${url}` : logo;
  return <img
    src={src}
    alt={alt}
    // this doesn't work atm
    style={color ? {fill: color} : {}}
    className={className}
  />;
}

export default Image;