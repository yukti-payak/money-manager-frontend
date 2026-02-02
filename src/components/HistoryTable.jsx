
import React from 'react';
import moment from "moment";

const HistoryTable = ({ transactions, onDelete, onEdit, searchTerm, setSearchTerm }) => {
  return (
    <div className="space-y-0">
      
      <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50/30">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Transaction History</h3>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
            {transactions.length} Total Records
          </p>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-8 py-4 text-[11px] font-bold uppercase text-slate-400 tracking-widest">Date & Time</th>
              <th className="px-8 py-4 text-[11px] font-bold uppercase text-slate-400 tracking-widest">Transaction Info</th>
              <th className="px-8 py-4 text-[11px] font-bold uppercase text-slate-400 tracking-widest">Amount</th>
              <th className="px-8 py-4 text-[11px] font-bold uppercase text-slate-400 tracking-widest">Division</th>
              <th className="px-8 py-4 text-[11px] font-bold uppercase text-slate-400 tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {transactions.length > 0 ? (
              transactions.map(t => (
                <tr key={t._id} className="group hover:bg-blue-50/30 transition-all duration-200">
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                    {moment(t.date).format('lll')}
                  </td>
                  
                  
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-slate-900 capitalize leading-none">
                        {t.category}
                      </span>
                      <span className="text-[12px] text-slate-400 font-medium line-clamp-1 max-w-[250px]" title={t.description}>
                        {t.description || "No notes provided"}
                      </span>
                    </div>
                  </td>

                  <td className={`px-8 py-5 text-sm font-black ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    <span className="flex items-center gap-1">
                      {t.type === 'income' ? '↑' : '↓'}
                      ${t.amount.toLocaleString()}
                    </span>
                  </td>

                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border ${
                      t.division === 'office' 
                        ? 'bg-blue-50 text-blue-600 border-blue-100' 
                        : 'bg-purple-50 text-purple-600 border-purple-100'
                    }`}>
                      {t.division}
                    </span>
                  </td>

                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onEdit(t)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => {
                          if(window.confirm('Permanent delete?')) onDelete(t._id);
                        }}
                        className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-24 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl mb-4">📂</div>
                    <p className="text-slate-500 font-bold">No transactions match your search</p>
                    <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or search terms.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;