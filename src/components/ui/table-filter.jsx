import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Filter, X } from 'lucide-react';

const TableFilter = ({
  columns,
  onFilter,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    onFilter(filters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setFilters({});
    onFilter({});
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="focus-ring"
      >
        <Filter className="mr-2 h-4 w-4" />
        Filters
        {Object.keys(filters).length > 0 && (
          <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
            {Object.keys(filters).length}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Filter Data</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {columns
              .filter(col => col.filterable !== false)
              .map(column => (
                <div key={column.key} className="space-y-1">
                  <label className="text-sm font-medium">{column.header}</label>
                  <Input
                    placeholder={`Filter by ${column.header.toLowerCase()}`}
                    value={filters[column.key] || ''}
                    onChange={(e) => handleFilterChange(column.key, e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
              ))}
          </div>

          <div className="flex justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              disabled={Object.keys(filters).length === 0}
            >
              Clear
            </Button>
            <Button
              size="sm"
              onClick={applyFilters}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableFilter;