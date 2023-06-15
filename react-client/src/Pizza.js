import './Pizza.css';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Pizza() {
  const { pizza_id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [extraIngredients, setExtraIngredients] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  // for message alert
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);


  useEffect(() => {
    fetchPizza();
    fetchExtraIngredients();
  }, []);

  // Use pizza_id to fetch data from the Flask API
  const fetchPizza = async () => {
    try {
      const response = await fetch(`http://localhost:5000/pizza/${pizza_id}`);
      const data = await response.json();
      setPizza(data); // Update the pizza state with the fetched data
    } catch (error) {
      console.log(error);
    }
  };

  // Gets all extra ingredients available
  const fetchExtraIngredients = async () => {
    try {
      const response = await fetch('http://localhost:5000/get_extra_ingredients');
      const data = await response.json();
      setExtraIngredients(data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitOrder = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        pizza_id: pizza.id,
        customer_name: e.target.customerName.value,
        address: e.target.address.value,
        extra_ids: selectedExtras.join(","),
      };

      const response = await axios.post(
        "http://localhost:5000/create_order",
        JSON.stringify(orderData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data); // You can handle the response as needed

      // Show the alert message
      if (response.status === 200) {
      // Show the success alert message
      setAlertMessage("Order placed successfully!");
      setShowAlert(true);

      // Reset the form and selected extras
      e.target.reset();
      setSelectedExtras([]);
    } else {
      // Show the error alert message
      setAlertMessage("Error placing the order. Please try again.");
      setShowAlert(true);
    }

      // Reset the form and selected extras
      e.target.reset();
      setSelectedExtras([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {pizza ? (
        <div className="container col-xxl-8 px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img src={`/img/${pizza.image}`} className="d-block mx-lg-auto img-fluid" alt="Pizza" loading="lazy" width="400" height="300" />
            </div>
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">{pizza.name}</h1>
              <p className="lead">Ingredients: {pizza.ingredients.join(", ")}</p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <p className="lead">Price: €{pizza.price}0</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading pizza data...</p>
      )}

      <div className="my-4"></div>

      {showAlert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {alertMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowAlert(false)}></button>
        </div>
      )}

      <div className="container col-xxl-8 px-4 py-5">
        <div className="row">
          <div className="col-lg-6">
            <h4 className="mb-3">Pick any extra Ingredients</h4>
            <div className="list-group">
              {extraIngredients.map((ingredient) => (
                <label className="list-group-item d-flex gap-2" key={ingredient.extra_id}>
                  <input
                    className="form-check-input flex-shrink-0"
                    type="checkbox"
                    value={ingredient.extra_id}
                    onChange={(e) => {
                      const extraId = e.target.value;
                      if (e.target.checked) {
                        setSelectedExtras((prevExtras) => [...prevExtras, extraId]);
                      } else {
                        setSelectedExtras((prevExtras) =>
                          prevExtras.filter((id) => id !== extraId)
                        );
                      }
                    }}
                  />
                  <span>{ingredient.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation" noValidate onSubmit={submitOrder}>
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Cornelius Corneliussen" name="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                    <div className="invalid-feedback">
                      Valid name is required.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="1234 Main St" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    <div className="invalid-feedback">
                      Please enter your address.
                    </div>
                  </div>
                </div>

                <hr className="my-4"></hr>

                <button className="w-100 btn btn-primary btn-lg" type="submit">Create Order</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pizza;
