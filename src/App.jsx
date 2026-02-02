import React, { useState, useEffect } from "react";
import StatsCards from "./components/StatsCards";
import Charts from "./components/Charts";
import HistoryTable from "./components/HistoryTable";
import TransactionModal from "./components/TransactionModal";
import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import { fetchTransactions } from "./services/api";
import { deleteTransaction } from "./services/api";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [filters, setFilters] = useState({ 
    timeframe: 'monthly', 
    division: '', 
    category: '', 
    startDate: '', 
    endDate: '' 
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

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((a, b) => a + b.amount, 0);
    
  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((a, b) => a + b.amount, 0);

  const pieData = {
    labels: ['Income', 'Expense'],
    datasets: [{ data: [income, expense], backgroundColor: ['#48bb78', '#f56565'] }]
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
    <div className="full-width-app">
      <Navbar />

      <main className="main-content-fluid">
        <div className="content-wrapper">
          <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '2rem', margin: 0 }}>Dashboard Overview</h1>
            
            <button 
              className="primary-btn-circle" 
              onClick={() => setIsModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '50px', 
                width: 'auto',      
                height: '42px',
                backgroundColor: '#3182ce',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                boxShadow: '0 4px 6px rgba(49, 130, 206, 0.3)'
              }}
            >
              <span style={{ fontSize: '1.4rem', lineHeight: '1' }}>+</span>
              <span>Add Transaction</span>
            </button>
          </header>

          <StatsCards income={income} expense={expense} />
          
          <Filters filters={filters} setFilters={setFilters} />

          <div className="dashboard-body">
            <Charts 
              transactions={transactions} 
              pieData={pieData} 
              timeframe={filters.timeframe} 
            />
           
            <div className="section-container" style={{ marginTop: '2rem' }}>
              <HistoryTable 
                transactions={transactions} 
                onDelete={handleDelete} 
                onEdit={handleEdit} 
                onRefresh={loadData} 
              />
            </div>
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