import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css';

import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import Reducers from './Redux/Reducers'
import Thunk from 'redux-thunk'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={createStore(Reducers,{},applyMiddleware(Thunk))}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
