import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from 'history';

import axios from 'axios';

import Header from './components/Header';
import ChartsAndFilters from './components/ChartsAndFilters';
import Body from './components/Body';
import Footer from './components/Footer';

const customHistory = createBrowserHistory({ basename: '/bank' });


const theme = createTheme({
  palette: {
    primary: {
      main: '#f5f5ff'
    },
    secondary: {
      main: '#878787'
    }
  },
});

function RealApp() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <ChartsAndFilters />
        <Body />
        <Footer />
      </ThemeProvider>
    </div>
  );
};


export default function App() {
  axios.get('/bank/bank-statement/test').then(resp => {
    console.log(resp.data);
  });
  return (
    // <BrowserRouter basename="/db">
    <RealApp />
    // </BrowserRouter>
    // <h1>BANK</h1>
  )
}