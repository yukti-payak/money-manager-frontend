import React from 'react';
import moment from "moment";

const HistoryTable = ({ transactions, onDelete, onEdit }) => {
  return (
    <div className="section-container">
      <h3>History of Income & Expenditure</h3>
      <table>
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Division</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t._id}>
              <td>{moment(t.date).format('lll')}</td>
              <td className="capitalize">{t.category}</td>
              <td className={t.type === 'income' ? 'income-text' : 'expense-text'}>
                ${t.amount}
              </td>
              <td className="capitalize">{t.division}</td>
              <td>
                <div className="action-buttons" style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    className="edit-btn" 
                    onClick={() => onEdit(t)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#3182ce',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#2b6cb0'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#3182ce'}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => {
                      if(window.confirm('Are you sure you want to delete this?')) {
                        onDelete(t._id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;