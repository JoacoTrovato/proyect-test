<<<<<<< HEAD
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Routes = require('./routes/routes')

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(Routes);

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    });
});

app.listen(3001)
console.log('Server on port 3001');
=======
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>,
  document.getElementById('root') 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
>>>>>>> refs/remotes/origin/main
