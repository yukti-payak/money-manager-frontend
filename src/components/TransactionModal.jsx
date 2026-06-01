import React, { useState, useEffect } from "react";
import { addTransaction, updateTransaction, transferFunds } from '../services/api'; 

const TransactionModal = ({ onClose, onRefresh, editData }) => {

  const [isSubmitting, setIsSubmitting] = useState(false);

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
        toAccount: editData.toAccount || "", 
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
    
    setIsSubmitting(true);
    
    try {
      let response;
      
      if (isTransfer) {
        response = await transferFunds(formData);
      } else if (editData) {
        response = await updateTransaction(editData._id, formData);
      } else {
        response = await addTransaction(formData);
      }

      if (response.data && response.data.success) {
        onRefresh();
        onClose();
      }
    } catch (error) {
      console.error("Submission error:", error);
      const message = error.response?.data?.message || "Server is waking up";
      alert(message);
    } finally {

      setIsSubmitting(false);
    }
  };
  
  const inputClass = "w-full mt-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800 disabled:bg-slate-50 disabled:text-slate-400";
  const labelClass = "text-sm font-semibold text-slate-600 ml-1";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800">
            {editData ? "Edit" : "Add"} {formData.type === "transfer" ? "Transfer" : "Transaction"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-3xl font-light leading-none">&times;</button>
        </div>

        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Type</label>
              <select className={inputClass} name="type" value={formData.type} onChange={handleChange} disabled={isSubmitting}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Amount</label>
              <input className={inputClass} type="number" name="amount" value={formData.amount} onChange={handleChange} required disabled={isSubmitting} />
            </div>
          </div>

          

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-5 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            
         
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`px-8 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center gap-2
                ${isSubmitting ? 'opacity-70 cursor-not-allowed bg-blue-500' : 'hover:bg-blue-700 shadow-blue-200 active:scale-95'}`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Saving...
                </>
              ) : (
                `Save ${formData.type}`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
