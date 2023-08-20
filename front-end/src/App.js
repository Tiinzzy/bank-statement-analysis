import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createBrowserHistory } from 'history';

import Header from './components/Header';
import ChartsAndFilters from './components/ChartsAndFilters';
import Body from './components/Body';
import Footer from './components/Footer';


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

export default function App() {
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
