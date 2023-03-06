import React from 'react';
import ReactDOM from 'react-dom/client'
import "./index.css";
import App from './App';
import 'antd/dist/reset.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import { AuthProvider } from './contex/auth';
import { CartProvider } from './contex/cart';
import { SearchProvider } from './contex/search';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>


<AuthProvider>
    <SearchProvider>
      <CartProvider>
      <App />  
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
  
  </React.StrictMode>
);


