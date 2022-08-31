import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// check ip location data

fetch('https://api.bigdatacloud.net/data/ip-geolocation?key='+process.env.REACT_APP_GEO_LOC_KEY).then(res=>res.json()).then(res=>{
    console.log(res);
});


console.log(process.env)

