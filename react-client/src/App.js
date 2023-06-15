import './App.css';
import { Route, Routes } from "react-router-dom";

import Navbar from './Navbar';
import Pizzas from './Pizzas';
import Pizza from './Pizza';
import Home from './Home';
import Orders from './Orders';

function App() {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pizzas" element={<Pizzas />} />
          <Route path="/pizza" element={<Pizza />} />
          <Route path="/pizza/:pizza_id" element={<Pizza />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>

      </div>

    </>
  );
}

export default App;
