import { useState, useEffect } from "react";
import './Pizzas.css';
import { useNavigate } from "react-router-dom";

function Pizzas() {
  const [pizzas, setPizzas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const response = await fetch("http://localhost:5000/pizzas");
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderClick = (pizzaId) => {
    navigate(`/pizza/${pizzaId}`);
  };

  return (
    <div>
      {pizzas.map((pizza) => (
        <div class="row mb-2 container-fluid row-gap-3" key={pizza.id}>
          <div class="col-md-12">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div class="col p-4 d-flex flex-column position-static">
                <h3 class="mb-0">{pizza.name}</h3>
                <div class="mb-1 text-body-secondary">Price: €{pizza.price}0</div>
                <p class="card-text mb-auto">Ingredients: {pizza.ingredients.join(", ")}</p>
                <button type="button" class="btn btn-info" onClick={() => handleOrderClick(pizza.id)}>Order Now</button>
              </div>
              <div class="col-auto d-none d-lg-block">
                <img class="" src={`/img/${pizza.image}`} width="200" height="250" alt="Pizza Thumbnail" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Pizzas;