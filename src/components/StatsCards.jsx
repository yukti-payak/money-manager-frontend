

import React from 'react';

const StatsCards = ({ income, expense }) => {
  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Balance</h3>
        <p className={`text-3xl font-bold mt-2 ${balance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          ${balance.toLocaleString()}
        </p>
      </div>

      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-emerald-500">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Income</h3>
        <p className="text-3xl font-bold mt-2 text-emerald-600">+${income.toLocaleString()}</p>
      </div>

      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-rose-500">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Expenditure</h3>
        <p className="text-3xl font-bold mt-2 text-rose-600">-${expense.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default StatsCards;