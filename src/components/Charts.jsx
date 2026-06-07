import React, { useMemo } from 'react';
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  PointElement, 
  LineElement,  
  Title,
  Filler         
} from 'chart.js';
import moment from "moment";

ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, BarElement, PointElement, 
  LineElement, Title, Filler
);

const COLOR_PALETTE = ['#3182ce', '#38a169', '#e53e3e', '#805ad5', '#d69e2e', '#319795', '#a0aec0'];

const Charts = ({ transactions = [], timeframe = 'monthly' }) => {

  const sortedCategories = useMemo(() => {
    const summary = transactions.reduce((acc, t) => {
      const category = t.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = { name: category, total: 0, type: t.type };
      }
      acc[category].total += t.amount;
      return acc;
    }, {});
    return Object.values(summary).sort((a, b) => b.total - a.total);
  }, [transactions]);


  const maxCategoryTotal = useMemo(() => {
    if (sortedCategories.length === 0) return 1;
    return Math.max(...sortedCategories.map(c => c.total));
  }, [sortedCategories]);

  // Memoize Category Breakdown Chart Data
  const categoryChartData = useMemo(() => ({
    labels: sortedCategories.map(c => c.name),
    datasets: [{
      data: sortedCategories.map(c => c.total),
      backgroundColor: COLOR_PALETTE,
      borderWidth: 0,
      hoverOffset: 10
    }]
  }), [sortedCategories]);

  const { labels, incomeData, expenseData } = useMemo(() => {
    let labelsArr = [];
    let incomeArr = [];
    let expenseArr = [];

    if (timeframe === 'weekly') {
      labelsArr = Array.from({ length: 7 }, (_, i) => moment().subtract(6 - i, 'days').format('ddd'));
      incomeArr = new Array(7).fill(0);
      expenseArr = new Array(7).fill(0);
      
      transactions.forEach(t => {
        const diff = moment().diff(moment(t.date), 'days');
        if (diff >= 0 && diff < 7) {
          const index = 6 - diff;
          if (t.type === 'income') incomeArr[index] += t.amount;
          else if (t.type === 'expense') expenseArr[index] += t.amount;
        }
      });
    } else if (timeframe === 'yearly') {
      labelsArr = moment.monthsShort();
      incomeArr = new Array(12).fill(0);
      expenseArr = new Array(12).fill(0);
      
      transactions.forEach(t => {
        const monthIndex = moment(t.date).month();
        if (t.type === 'income') incomeArr[monthIndex] += t.amount;
        else if (t.type === 'expense') expenseArr[monthIndex] += t.amount;
      });
    } else {
      const daysInMonth = moment().daysInMonth();
      labelsArr = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      incomeArr = new Array(daysInMonth).fill(0);
      expenseArr = new Array(daysInMonth).fill(0);
      
      transactions.forEach(t => {
        if (moment(t.date).isSame(moment(), 'month')) {
          const dayIndex = moment(t.date).date() - 1;
          if (t.type === 'income') incomeArr[dayIndex] += t.amount;
          else if (t.type === 'expense') expenseArr[dayIndex] += t.amount;
        }
      });
    }

    return { labels: labelsArr, incomeData: incomeArr, expenseData: expenseArr };
  }, [transactions, timeframe]);

  // Chart configuration structures
  const lineChartData = {
    labels,
    datasets: [
      {
        label: 'Spending Trend',
        data: expenseData,
        fill: true,
        backgroundColor: 'rgba(239, 68, 68, 0.1)', 
        borderColor: '#ef4444',                    
        tension: 0.4,                              
        borderWidth: 3,
        pointRadius: 2,
        pointBackgroundColor: '#ef4444',
      }
    ]
  };

  const barChartData = {
    labels,
    datasets: [
      { label: 'Income', data: incomeData, backgroundColor: 'rgba(34, 197, 94, 0.8)', borderRadius: 4 },
      { label: 'Expense', data: expenseData, backgroundColor: 'rgba(239, 68, 68, 0.8)', borderRadius: 4 }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Upper Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-slate-800 capitalize">{timeframe} Cashflow</h3>
          <div className="h-64">
            <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-slate-800">Spending Trend</h3>
          <div className="h-64">
            <Line 
              data={lineChartData} 
              options={{ 
                maintainAspectRatio: false, 
                scales: { x: { grid: { display: false } } } 
              }} 
            />
          </div>
        </div>
      </div>

      {/* Lower Section: Category Distributions */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          
          {/* Donut Chart Container */}
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center md:text-left">Category Breakdown</h3>
            <div className="h-56 relative flex justify-center">
              <Doughnut 
                data={categoryChartData} 
                options={{ cutout: '75%', plugins: { legend: { display: false } } }} 
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Expenses</span>
              </div>
            </div>
          </div>
          
          {/* Custom Metrics Grid */}
          <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sortedCategories.slice(0, 6).map((cat, idx) => (
              <div key={cat.name} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-slate-700 capitalize">{cat.name}</span>
                  <span className="text-sm font-bold text-slate-900">${cat.total.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div 
                    className="h-1.5 rounded-full transition-all duration-700" 
                    style={{ 
                      width: `${(cat.total / maxCategoryTotal) * 100}%`,
                      backgroundColor: COLOR_PALETTE[idx % COLOR_PALETTE.length] 
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
