
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative group">
          
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative flex justify-between items-center h-16 px-6 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl">
            
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-black text-xl">$</span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-slate-900 hidden sm:block">
                MoneyManager
              </h2>
            </div>

            
            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100/50 rounded-lg border border-slate-200/50">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Active Session</span>
                </div>
                
                
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className={`w-10 h-10 rounded-full bg-slate-200 border-2 transition-all flex items-center justify-center text-sm font-bold text-slate-600 hover:scale-105 active:scale-95 ${isOpen ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-white shadow-sm'}`}
                >
                  JD
                </button>
              </div>

              
              {isOpen && (
                <>
                  
                  <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                  
                  <div className="absolute right-0 mt-3 w-56 origin-top-right bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-20 animate-in fade-in zoom-in duration-150">
                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Account</p>
                      <p className="text-sm font-bold text-slate-800">John Doe</p>
                    </div>
                    
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      View Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Account Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Security & Privacy
                    </button>
                    
                    <div className="my-1 border-t border-slate-50"></div>
                    
                    <button className="w-full text-left px-4 py-2 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors">
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;