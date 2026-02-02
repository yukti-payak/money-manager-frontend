import React from 'react';

const StatsCards = ({ income, expense }) => (
  <div className="stats-grid">
    <div className="card shadow">
      <h3>Total Balance</h3>
      <p style={{ color: income - expense >= 0 ? '#2ecc71' : '#e74c3c' }}>
        ${income - expense}
      </p>
    </div>
    <div className="card shadow">
      <h3>Total Income</h3>
      <p className="income-text">+${income}</p>
    </div>
    <div className="card shadow">
      <h3>Total Expenditure</h3>
      <p className="expense-text">-${expense}</p>
    </div>
  </div>
);

export default StatsCards;