import React, { useState, useMemo } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Search } from 'lucide-react';
import TablePagination from './table-pagination';
import TableFilter from './table-filter';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

const DataTable = ({ 
  data, 
  columns, 
  searchable = true,
  sortable = true,
  pagination = true,
  pageSize = 10,
  loading = false,
  actions = null,
  emptyMessage = "No data available"
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({});
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc, column) => ({ ...acc, [column.key]: true }), {})
  );

  // Filter data based on search term and column filters
  const filteredData = useMemo(() => {
    let filtered = data;
    
    // Apply search term filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(item => {
        return columns.some(column => {
          const value = item[column.key];
          if (value == null) return false;
          return String(value).toLowerCase().includes(searchLower);
        });
      });
    }
    
    // Apply column-specific filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim()) {
        const filterValue = value.toLowerCase();
        filtered = filtered.filter(item => {
          const itemValue = item[key];
          if (itemValue == null) return false;
          return String(itemValue).toLowerCase().includes(filterValue);
        });
      }
    });
    
    return filtered;
  }, [data, searchTerm, columns, filters]);

  // Sort data based on current sort configuration
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      // Handle nullish values
      if (aValue === null || aValue === undefined) aValue = '';
      if (bValue === null || bValue === undefined) bValue = '';
      
      // Handle numbers
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // Handle strings (case-insensitive)
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * currentPageSize;
    return sortedData.slice(startIndex, startIndex + currentPageSize);
  }, [sortedData, currentPage, currentPageSize, pagination]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    if (!pagination) return 1;
    return Math.max(1, Math.ceil(sortedData.length / currentPageSize));
  }, [sortedData, currentPageSize, pagination]);

  // Handle sort
  const handleSort = (key) => {
    if (!sortable) return;
    
    setSortConfig(prevConfig => {
      if (prevConfig.key === key) {
        return { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  // Handle pagination
  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  // Handle page size change
  const handlePageSizeChange = (value) => {
    const newPageSize = parseInt(value);
    setCurrentPageSize(newPageSize);
    // Reset to first page when changing page size
    setCurrentPage(1);
  };

  // Toggle column visibility
  const toggleColumnVisibility = (key) => {
    setVisibleColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full">
      {/* Search and actions row */}
      {(searchable || actions) && (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
          {searchable && (
            <div className="relative flex-grow w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
          )}
          <div className="flex gap-2">
            <TableFilter 
              columns={columns} 
              onFilter={setFilters} 
            />
            {actions && <>{actions}</>}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-accent/50 dark:bg-accent/20">
            <tr>
              {columns.map(column => (
                visibleColumns[column.key] && (
                  <th 
                    key={column.key} 
                    className={`px-4 py-3 ${sortable ? 'cursor-pointer select-none' : ''} ${column.className || ''}`}
                    onClick={sortable ? () => handleSort(column.key) : undefined}
                  >
                    <div className="flex items-center">
                      {column.header}
                      {sortable && sortConfig.key === column.key && (
                        <span className="ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </th>
                )
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr 
                  key={row.id || rowIndex} 
                  className="border-b dark:border-border/50 hover:bg-accent/30 dark:hover:bg-accent/10 transition-colors"
                >
                  {columns.map(column => (
                    visibleColumns[column.key] && (
                      <td 
                        key={`${rowIndex}-${column.key}`} 
                        className={`px-4 py-3 ${column.className || ''}`}
                      >
                        {column.render ? column.render(row) : row[column.key]}
                      </td>
                    )
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.filter(col => visibleColumns[col.key]).length} 
                  className="text-center py-6 text-muted-foreground"
                >
                  {searchTerm ? `No results found for "${searchTerm}"` : emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Records per page:</span>
            <Select value={currentPageSize.toString()} onValueChange={handlePageSizeChange}>
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {totalPages > 1 && (
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={sortedData.length}
              pageSize={currentPageSize}
              onPageChange={goToPage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DataTable;