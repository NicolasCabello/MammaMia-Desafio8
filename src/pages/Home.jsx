import { useContext } from "react";
import CardPizza from "../components/CardPizza";
import Header from "../components/Header";
import { PizzaContext } from "../context/PizzaContext";

const Home = () => {
  const { pizzas } = useContext(PizzaContext);

  return (
    <main className="home">
      <Header />
      <section className="container my-4">
        <div className="row g-4">
          {pizzas.map((pizza) => (
            <div className="col-12 col-md-4" key={pizza.id}>
              <CardPizza
                id={pizza.id}
                name={pizza.name}
                price={pizza.price}
                ingredients={pizza.ingredients}
                img={pizza.img}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
