// Format number with commas and optional decimal places
export const formatNumber = (num, decimals = 2) => {
  return num?.toLocaleString(undefined, { maximumFractionDigits: decimals }) ?? '--';
};

// Calculate percentage change
export const calculatePercentageChange = (current, previous) => {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
};

// Filter items by search term
export const filterBySearchTerm = (items, searchTerm, fields) => {
  const term = searchTerm.toLowerCase();
  return items.filter(item =>
    fields.some(field => 
      String(item[field]).toLowerCase().includes(term)
    )
  );
};

// Get paginated items
export const getPaginatedItems = (items, currentPage, itemsPerPage) => {
  const start = (currentPage - 1) * itemsPerPage;
  return items.slice(start, start + itemsPerPage);
};

// Calculate total pages
export const calculateTotalPages = (totalItems, itemsPerPage) => {
  return Math.max(1, Math.ceil(totalItems / itemsPerPage));
}; 