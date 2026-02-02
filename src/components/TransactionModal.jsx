import React, { useState, useEffect } from "react";

const TransactionModal = ({ onClose, onRefresh, editData }) => {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    division: "",
    description: "",
    account: "Main",
    toAccount: "",
    method: "UPI", 
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        type: editData.type,
        amount: editData.amount,
        category: editData.category,
        division: editData.division,
        description: editData.description || "",
        account: editData.account || "Main",
        toAccount: "",
        method: editData.method || "UPI",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isTransfer = formData.type === "transfer";
    const url = isTransfer 
      ? "http://localhost:3000/api/transactions/transfer" 
      : (editData ? `http://localhost:3000/api/transactions/${editData._id}` : "http://localhost:3000/api/transactions");
    
    try {
      const response = await fetch(url, {
        method: isTransfer ? "POST" : (editData ? "PUT" : "POST"),
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        onRefresh();
        onClose();
      } else {
        alert(result.message || "Operation failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2 className="modal-title">
            {editData ? "Edit" : "Add"} {formData.type === "transfer" ? "Transfer" : "Transaction"}
          </h2>
          <button className="icon-close-btn" onClick={onClose}>&times;</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">Type</label>
              <select className="form-input" name="type" value={formData.type} onChange={handleChange}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
            <div className="form-group flex-1">
              <label className="form-label">Amount</label>
              <input
                className="form-input"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          
          {formData.type === "transfer" && (
            <>
              <div className="form-row">
                <div className="form-group flex-1">
                  <label className="form-label">From Account</label>
                  <input className="form-input" name="account" value={formData.account} onChange={handleChange} placeholder="Main" required />
                </div>
                <div className="form-group flex-1">
                  <label className="form-label">To Account</label>
                  <input className="form-input" name="toAccount" value={formData.toAccount} onChange={handleChange} placeholder="Savings" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Transfer via</label>
                <select className="form-input" name="method" value={formData.method} onChange={handleChange}>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </>
          )}

          
          {formData.type !== "transfer" && (
            <div className="form-row">
              <div className="form-group flex-1">
                <label className="form-label">Category</label>
                <input className="form-input" name="category" value={formData.category} onChange={handleChange} required />
              </div>
              <div className="form-group flex-1">
                <label className="form-label">Division</label>
                <input className="form-input" name="division" value={formData.division} onChange={handleChange} required />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input form-textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="2"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;