import React from 'react';
import ReactDOM from 'react-dom/client'; 
// import { Router } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import './index.css';
import App from './App';


// const history = createBrowserHistory({ basename: '/bank' });

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <Router history={history}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  // </Router>
);
