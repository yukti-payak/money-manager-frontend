import React from 'react';
import { Pie, Bar } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  Title
} from 'chart.js';
import moment from "moment";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Charts = ({ transactions, timeframe }) => {
  

  const getCategorySummary = () => {
    const summary = transactions.reduce((acc, t) => {
      const category = t.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = { name: category, total: 0, type: t.type };
      }
      acc[category].total += t.amount;
      return acc;
    }, {});

    return Object.values(summary).sort((a, b) => b.total - a.total);
  };

  const sortedCategories = getCategorySummary();


  const categoryPieData = {
    labels: sortedCategories.map(c => c.name),
    datasets: [{
      data: sortedCategories.map(c => c.total),
      backgroundColor: ['#3182ce', '#38a169', '#e53e3e', '#805ad5', '#d69e2e', '#319795', '#a0aec0'],
      borderWidth: 0,
      hoverOffset: 10
    }]
  };

  const getChartData = () => {
    let labels = [];
    let incomeData = [];
    let expenseData = [];

    if (timeframe === 'weekly') {
      labels = Array.from({ length: 7 }, (_, i) => moment().subtract(6 - i, 'days').format('ddd'));
      incomeData = new Array(7).fill(0);
      expenseData = new Array(7).fill(0);
      transactions.forEach(t => {
        const diff = moment().diff(moment(t.date), 'days');
        if (diff >= 0 && diff < 7) {
          const index = 6 - diff;
          if (t.type === 'income') incomeData[index] += t.amount;
          else if (t.type === 'expense') expenseData[index] += t.amount;
        }
      });
    } else if (timeframe === 'yearly') {
      labels = moment.monthsShort();
      incomeData = new Array(12).fill(0);
      expenseData = new Array(12).fill(0);
      transactions.forEach(t => {
        const monthIndex = moment(t.date).month();
        if (t.type === 'income') incomeData[monthIndex] += t.amount;
        else if (t.type === 'expense') expenseData[monthIndex] += t.amount;
      });
    } else {
      const daysInMonth = moment().daysInMonth();
      labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      incomeData = new Array(daysInMonth).fill(0);
      expenseData = new Array(daysInMonth).fill(0);
      transactions.forEach(t => {
        if (moment(t.date).isSame(moment(), 'month')) {
          const dayIndex = moment(t.date).date() - 1;
          if (t.type === 'income') incomeData[dayIndex] += t.amount;
          else if (t.type === 'expense') expenseData[dayIndex] += t.amount;
        }
      });
    }

    return {
      labels,
      datasets: [
        { label: 'Income', data: incomeData, backgroundColor: 'rgba(72, 187, 120, 0.8)', borderRadius: 4 },
        { label: 'Expense', data: expenseData, backgroundColor: 'rgba(245, 101, 101, 0.8)', borderRadius: 4 }
      ]
    };
  };

  return (
    <div className="charts-grid">
      <div className="chart-card bar-area">
        <div className="chart-header">
          <h3 className="capitalize">{timeframe} Cashflow</h3>
          <span className="chart-subtext">Income vs Expenses</span>
        </div>
        <div className="chart-body">
          <Bar 
            data={getChartData()} 
            options={{ 
              maintainAspectRatio: false, 
              plugins: { legend: { position: 'top', align: 'end' } },
              scales: { x: { grid: { display: false } }, y: { grid: { borderDash: [5, 5] } } }
            }} 
          />
        </div>
      </div>

      <div className="chart-card pie-area">
        <div className="chart-header">
          <h3>Category Summary</h3>
          <span className="chart-subtext">Expenses & Income Breakdown</span>
        </div>
        <div className="chart-body">
          <div className="donut-wrapper">
             <Pie data={categoryPieData} options={{ cutout: '70%', plugins: { legend: { display: false } } }} />
          </div>
          
          <div className="category-summary-list">
            {sortedCategories.slice(0, 5).map((cat, idx) => (
              <div key={idx} className="cat-item">
                <div className="cat-info">
                  <span className="cat-name">{cat.name}</span>
                  <span className="cat-value">${cat.total.toLocaleString()}</span>
                </div>
                <div className="cat-progress-bg">
                  <div 
                    className={`cat-progress-fill ${cat.type}`} 
                    style={{ 
                      width: `${(cat.total / Math.max(...sortedCategories.map(c => c.total))) * 100}%`,
                      backgroundColor: categoryPieData.datasets[0].backgroundColor[idx] 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;