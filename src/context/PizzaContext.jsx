import { createContext, useEffect, useState } from "react";

export const PizzaContext = createContext();

const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const consultarPizzas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pizzas");
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error(error);
      }
    };

    consultarPizzas();
  }, []);

  return (
    <PizzaContext.Provider value={{ pizzas }}>
      {children}
    </PizzaContext.Provider>
  );
};

export default PizzaProvider;
