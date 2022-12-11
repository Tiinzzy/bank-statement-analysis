import './App.css';

import Header from './components/Header';
import ChartsAndFilters from './components/ChartsAndFilters';
import Body from './components/Body';

function App() {
  return (
    <div className="App">
      <Header />
      <ChartsAndFilters />
      <Body />
    </div>
  );
}

export default App;
