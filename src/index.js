import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from 'App';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  // Перед тим, як вивантажити свій додаток на гітхаб не забудьте додати basename
  <BrowserRouter 
    // basename='/react-homework-template/'
  >
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
