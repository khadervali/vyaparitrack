import React from 'react';

const Select = ({ children, value, onChange, ...props }) => {
  return (
    <select value={value} onChange={onChange} {...props}>
      {children}
    </select>
  );
};

const SelectTrigger = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const SelectContent = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const SelectItem = ({ children, value, ...props }) => {
  return <div {...props} data-value={value}>{children}</div>;
};

const SelectValue = ({ children, ...props }) => {
  return <span {...props}>{children}</span>;
};


export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
};