import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import { store } from './Redux toolkit/reducers';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>

    <BrowserRouter>

      <Provider store={store}>

        <App />
        <ToastContainer autoClose={1000}/>

      </Provider>

    </BrowserRouter>

  </React.StrictMode>
);

reportWebVitals();
