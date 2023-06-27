import { Link } from 'react-router-dom';

function Navbar() {
  return (

      <header class="d-flex justify-content-center py-3 gy-5">
        <ul class="nav nav-pills gap-3">
          <button type="button" class="btn btn-outline-primary"><Link to="/" class="text-body-emphasis">Home</Link></button>
          <button type="button" class="btn btn-outline-primary"><Link to="/pizzas" class="text-body-emphasis">Pizzas</Link></button>
          <button type="button" class="btn btn-outline-primary"><Link to="/orders" class="text-body-emphasis">Orders</Link></button>
        </ul>
      </header>


  );
}

export default Navbar;
