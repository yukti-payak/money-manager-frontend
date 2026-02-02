// import axios from 'axios';


// const API = axios.create({ baseURL: 'https://money-manager-backend-cr19.onrender.com/api/transactions' });

// export const fetchTransactions = (params) => API.get('/transactions', { params });
// export const addTransaction = (data) => API.post('/transactions', data);

// export const updateTransaction = (id, data) => API.put(`/transactions/${id}`, data);
// export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);



import axios from 'axios';

const API = axios.create({ 
  baseURL: 'https://money-manager-backend-cr19.onrender.com/api/transactions' 
});


export const fetchTransactions = (params) => API.get('/', { params });
export const addTransaction = (data) => API.post('/', data);


export const updateTransaction = (id, data) => API.put(`/${id}`, data);
export const deleteTransaction = (id) => API.delete(`/${id}`);