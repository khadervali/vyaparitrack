import React from 'react';

// Simple native select implementation with better styling
const Select = ({ children, value, defaultValue, onValueChange, onChange, className = "", ...props }) => {
  const handleChange = (e) => {
    if (onChange) onChange(e);
    if (onValueChange) onValueChange(e.target.value);
  };

  return (
    <select 
      value={value} 
      defaultValue={defaultValue}
      onChange={handleChange}
      className={`w-full rounded-md border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

// These components are just for compatibility with the existing code
const SelectTrigger = ({ children }) => children;
const SelectContent = ({ children }) => children;
const SelectItem = ({ children, value, ...props }) => (
  <option value={value} {...props}>{children}</option>
);
const SelectValue = ({ children }) => children;

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
};