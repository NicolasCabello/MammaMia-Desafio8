import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { formatPrice } from "../utils/formatPrice";

const Cart = () => {
  const { cart, increase, decrease, total } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const [success, setSuccess] = useState("");

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data?.message || data?.error || "No se pudo realizar la compra.");
        return;
      }

      setSuccess("Compra realizada con éxito.");
    } catch (error) {
      console.error(error);
      alert("No se pudo realizar la compra.");
    }
  };

  return (
    <main className="cart-page">
      <section className="cart">
        <h2>Detalles del pedido:</h2>
        {cart.length === 0 && <p>El carrito está vacío.</p>}
        <ul className="cart-list">
          {cart.map((item) => (
            <li className="cart-item" key={item.id}>
              <span className="cart-thumb">
                <img src={item.img} alt="" />
              </span>
              <span className="cart-name">{item.name}</span>
              <span className="cart-price">${formatPrice(item.price)}</span>
              <div className="cart-qty">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => decrease(item.id)}
                  aria-label={`Quitar una ${item.name}`}
                >
                  −
                </button>
                <span>{item.count}</span>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => increase(item.id)}
                  aria-label={`Agregar una ${item.name}`}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <p className="cart-total">Total: ${formatPrice(total)}</p>
        <button
          type="button"
          className="btn btn-dark cart-pay"
          disabled={!token}
          onClick={handleCheckout}
        >
          Pagar
        </button>
        {success && (
          <p className="alert alert-success mt-3" role="status">
            {success}
          </p>
        )}
      </section>
    </main>
  );
};

export default Cart;
