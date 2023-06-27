import { useState, useEffect } from "react";
import './Pizzas.css';
import { useNavigate } from "react-router-dom";



function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/get_orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div class="row mb-2 container-fluid row-gap-3" key={order.order_id}>
            <div class="col-md-12">
              <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                  <h3 class="mb-0">{order.customer_name}</h3>
                  <div class="mb-1 text-body-secondary">Pizza: {order.pizza_name}</div>
                  <p class="card-text mb-auto">Extras: {order.extra_ingredients}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No orders available 😔</div>
      )}
    </div>
  );
}

export default Orders;
