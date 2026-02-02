
import React from 'react';

const Filters = ({ filters, setFilters }) => {
  const handleClear = () => {
    setFilters({ timeframe: 'monthly', division: '', category: '', startDate: '', endDate: '' });
  };

  
  const inputClass = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-700";
  const labelClass = "block text-xs font-semibold text-slate-500 uppercase mb-1 ml-1";

  return (
    <div className="flex flex-wrap items-end gap-4">
      
      <div className="flex-1 min-w-[140px]">
        <label className={labelClass}>View Mode</label>
        <select 
          className={inputClass}
          value={filters.timeframe}
          onChange={(e) => setFilters({...filters, timeframe: e.target.value})}
        >
          <option value="weekly">Weekly View</option>
          <option value="monthly">Monthly View</option>
          <option value="yearly">Yearly View</option>
        </select>
      </div>

      
      <div className="flex-[2] min-w-[280px]">
        <label className={labelClass}>Date Range</label>
        <div className="flex items-center gap-2">
          <input 
            type="date" 
            className={inputClass} 
            value={filters.startDate} 
            onChange={(e) => setFilters({...filters, startDate: e.target.value})} 
          />
          <span className="text-slate-400 text-sm">to</span>
          <input 
            type="date" 
            className={inputClass} 
            value={filters.endDate} 
            onChange={(e) => setFilters({...filters, endDate: e.target.value})} 
          />
        </div>
      </div>

      
      <div className="flex-1 min-w-[140px]">
        <label className={labelClass}>Division</label>
        <select 
          className={inputClass} 
          value={filters.division} 
          onChange={(e) => setFilters({...filters, division: e.target.value})}
        >
          <option value="">All Divisions</option>
          <option value="office">Office</option>
          <option value="personal">Personal</option>
        </select>
      </div>

    
      <div className="flex-1 min-w-[140px]">
        <label className={labelClass}>Category</label>
        <select 
          className={inputClass} 
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

      
      <button 
        className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-rose-600 transition-colors mb-[2px] active:scale-95" 
        onClick={handleClear}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;