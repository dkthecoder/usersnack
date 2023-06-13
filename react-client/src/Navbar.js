import { Link } from 'react-router-dom';

function Navbar() {
  return (

    <div>
      <div class="container">
        <header class="d-flex justify-content-center py-3">
          <ul class="nav nav-pills">
            <li class="nav-item"><Link to="/" class="nav-link">Home</Link></li>
            <li class="nav-item"><Link to="/pizzas" class="nav-link">Pizzas</Link></li>
            <li class="nav-item"><Link to="/orders" class="nav-link">Orders</Link></li>
          </ul>
        </header>
      </div>
      <hr class="my-4"></hr>
    </div>

  );
}

export default Navbar;
