import logoImage from "./logo/logo.png";
import { Route, Routes } from "react-router-dom";
import './Home.css';

function Home() {
  return (

    <div class="justify-content-center">


      <main class="px-3">


        <h1>Usersnacc - Pizzas are made here</h1>

        <div className="spinning-pizza">
        <img className="rotate-image" src={logoImage} alt="Logo" />
        </div>

        <p class="justify-content-center">disclaimer: no pizza is guaranteed to be delivered</p>
      </main>

      <footer class="mt-auto text-white-50">
      </footer>
    </div>


  );
}

export default Home;
