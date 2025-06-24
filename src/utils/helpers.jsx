/**
 * Format number to fixed decimal places with appropriate rounding
 * @param {Number} number - Number to format
 * @param {Number} decimals - Decimal places
 * @returns {String} Formatted number
 */
export const formatNumber = (number, decimals = 3) => {
  if (number === undefined || number === null) return '0';
  
  // Handle very large or small numbers
  if (Math.abs(number) < 0.001 && number !== 0) {
    return number.toExponential(decimals);
  }
  
  return number.toFixed(decimals).replace(/\.?0+$/, '');
};

/**
 * Format number as currency
 * @param {Number} number - Number to format
 * @param {String} currency - Currency symbol
 * @returns {String} Formatted currency
 */
export const formatCurrency = (number, currency = '') => {
  if (number === undefined || number === null) return `0 ${currency}`;
  
  return `${formatNumber(number)} ${currency}`;
};

/**
 * Format percentage
 * @param {Number} number - Number to format as percentage
 * @returns {String} Formatted percentage
 */
export const formatPercentage = (number) => {
  if (number === undefined || number === null) return '0%';
  
  return `${formatNumber(number * 100, 2)}%`;
};

/**
 * Generate a unique ID
 * @returns {String} Unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Format date to locale string
 * @param {Date} date - Date to format
 * @returns {String} Formatted date
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  return d.toLocaleString();
};

/**
 * Truncate string with ellipsis
 * @param {String} str - String to truncate
 * @param {Number} length - Maximum length
 * @returns {String} Truncated string
 */
export const truncateString = (str, length = 10) => {
  if (!str) return '';
  
  if (str.length <= length) return str;
  
  return `${str.substring(0, length)}...`;
};

/**
 * Format Hive username for display
 * @param {String} username - Hive username
 * @returns {String} Formatted username
 */
export const formatUsername = (username) => {
  if (!username) return '';
  
  if (username.length > 12) {
    return `${username.substring(0, 6)}...${username.substring(username.length - 4)}`;
  }
  
  return username;
};

/**
 * Calculate the price impact of a swap
 * @param {Number} inputAmount - Input amount
 * @param {Number} outputAmount - Output amount
 * @param {Number} spotPrice - Current spot price
 * @returns {Number} Price impact percentage
 */
export const calculatePriceImpact = (inputAmount, outputAmount, spotPrice) => {
  if (!inputAmount || !outputAmount || !spotPrice) return 0;
  
  const expectedOutput = inputAmount * spotPrice;
  const impact = (expectedOutput - outputAmount) / expectedOutput;
  
  return Math.max(0, impact); // Ensure positive
};

/**
 * Wait for a specified time
 * @param {Number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after the delay
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Parse error message from API response
 * @param {Error} error - Error object
 * @returns {String} Formatted error message
 */
export const parseError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  
  return error.message || 'Unknown error occurred';
};

/**
 * Convert array to a grouped object
 * @param {Array} array - Array to convert
 * @param {String} key - Key to group by
 * @returns {Object} Grouped object
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};