import React from 'react';

const Button = ({ children, className, ...props }) => (
  <button 
    className={`button ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;