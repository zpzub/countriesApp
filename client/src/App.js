import './App.css';
import {Countries} from './components/countries';
import {Search} from './components/search';
import { AddActivity } from './components/addactivity';
import {Countrypage} from './components/countrypage.js';
import {Landing} from './components/landingpage.js';
import { Mistake } from './components/404';
import {Route, Routes} from 'react-router'

function App() {
  return (
    <div className="App">
      <Search />
      <Routes>
          <Route path='*' element={<Mistake />}>
          </Route>
          <Route path='/home/:name' element={<Countrypage />} > 
          </Route>
          <Route path='/add' element={<AddActivity />}>
          </Route>
          <Route path='/home' element={<Countries />}>
          </Route>
          <Route path='/' element={<Landing />}>
          </Route>
      </Routes>
    
    </div>
  );
}

export default App;
