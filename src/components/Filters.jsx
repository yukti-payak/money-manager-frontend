import React from 'react';

const Filters = ({ filters, setFilters }) => {
  const handleClear = () => {
    setFilters({ timeframe: 'monthly', division: '', category: '', startDate: '', endDate: '' });
  };

  return (
    <div className="filter-toolbar shadow-sm">
      <div className="filter-item">
        <label className="filter-label">View Mode</label>
        <select 
          className="filter-input"
          value={filters.timeframe}
          onChange={(e) => setFilters({...filters, timeframe: e.target.value})}
        >
          <option value="weekly">Weekly View</option>
          <option value="monthly">Monthly View</option>
          <option value="yearly">Yearly View</option>
        </select>
      </div>


      <div className="filter-item">
        <label className="filter-label">Date Range</label>
        <div className="range-container">
          <input 
            className="filter-input date-picker"
            type="date" 
            value={filters.startDate}
            onChange={(e) => setFilters({...filters, startDate: e.target.value})} 
          />
          <span className="range-separator">to</span>
          <input 
            className="filter-input date-picker"
            type="date" 
            value={filters.endDate}
            onChange={(e) => setFilters({...filters, endDate: e.target.value})} 
          />
        </div>
      </div>

      <div className="filter-item">
        <label className="filter-label">Division</label>
        <select 
          className="filter-input"
          value={filters.division}
          onChange={(e) => setFilters({...filters, division: e.target.value})}
        >
          <option value="">All Divisions</option>
          <option value="office">Office</option>
          <option value="personal">Personal</option>
        </select>
      </div>

      <div className="filter-item">
        <label className="filter-label">Category</label>
        <select 
          className="filter-input"
          value={filters.category}
          onChange={(e) => setFilters({...filters, category: e.target.value})}
        >
          <option value="">All Categories</option>
          <option value="food">Food</option>
          <option value="fuel">Fuel</option>
          <option value="movie">Movie</option>
          <option value="loan">Loan</option>
          <option value="medical">Medical</option>
        </select>
      </div>

      <button className="reset-button" onClick={handleClear}>
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;