



import React, { useState, useEffect } from "react";
import StatsCards from "./components/StatsCards";
import Charts from "./components/Charts";
import HistoryTable from "./components/HistoryTable";
import TransactionModal from "./components/TransactionModal";
import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import { fetchTransactions, deleteTransaction } from "./services/api";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filters, setFilters] = useState({ 
    timeframe: 'monthly', division: '', category: '', startDate: '', endDate: '' 
  });

  const loadData = async () => {
    try {
      const res = await fetchTransactions(filters);
      setTransactions(res.data.data);
    } catch (error) {
      console.error("Failed to load transactions:", error);
    }
  };

  useEffect(() => { loadData(); }, [filters]);

  const income = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);

  const pieData = {
    labels: ['Income', 'Expense'],
    datasets: [{ data: [income, expense], backgroundColor: ['#22c55e', '#ef4444'] }]
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteTransaction(id);
      if (response.data.success) {
        setTransactions(transactions.filter(t => t._id !== id));
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting transaction");
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction); 
    setIsModalOpen(true);                
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null); 
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Dashboard Overview</h1>
            <p className="text-slate-500">Welcome back! Here is what's happening with your money.</p>
          </div>
          
          <button 
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg shadow-blue-500/30 transition-all active:scale-95" 
            onClick={() => setIsModalOpen(true)}
          >
            <span className="text-xl">+</span>
            <span>Add Transaction</span>
          </button>
        </header>

      
        <div className="space-y-6">
          <StatsCards income={income} expense={expense} />
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <Filters filters={filters} setFilters={setFilters} />
          </div>
        </div>

        
        <div className="mt-8 grid grid-cols-1 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <Charts 
              transactions={transactions} 
              pieData={pieData} 
              timeframe={filters.timeframe} 
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold">Recent Transactions</h3>
            </div>
            <HistoryTable 
              transactions={transactions} 
              onDelete={handleDelete} 
              onEdit={handleEdit} 
              onRefresh={loadData} 
            />
          </div>
        </div>
      </main>

      {isModalOpen && (
        <TransactionModal 
          onClose={handleCloseModal} 
          onRefresh={loadData} 
          editData={editingTransaction} 
        />
      )}
    </div>
  );
}

export default App;