import logoImage from "./logo/logo.png";
import { Route, Routes } from "react-router-dom";
import './Home.css';

function Home() {
  return (
    <div class="container">
      <div class="p-5 text-center  rounded-3">

        <div className="spinning-pizza">
          <img className="rotate-image" src={logoImage} alt="Logo" />
        </div>

        <h1 class="text-body-emphasis">Usersnacc - Pizzas are made here</h1>
        <p class="col-lg-8 mx-auto fs-5 text-muted">disclaimer: no pizza is guaranteed to be delivered</p>

      </div>
    </div>


  );
}

export default Home;
