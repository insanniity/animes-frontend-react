import AuthProvider from 'contexts/AuthContext';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="colored"
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>      
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
