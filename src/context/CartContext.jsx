import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (pizza) => {
    setCart((items) => {
      const exists = items.some((item) => item.id === pizza.id);

      if (exists) {
        return items.map((item) =>
          item.id === pizza.id ? { ...item, count: item.count + 1 } : item
        );
      }

      return [
        ...items,
        {
          id: pizza.id,
          name: pizza.name,
          price: pizza.price,
          img: pizza.img,
          count: 1,
        },
      ];
    });
  };

  const increase = (id) => {
    setCart((items) =>
      items.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decrease = (id) => {
    setCart((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, increase, decrease, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
