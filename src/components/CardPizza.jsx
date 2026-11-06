import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

const CardPizza = ({ id, name, price, ingredients, img }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <article className="card card-pizza h-100">
      <img src={img} className="card-img-top" alt={`Pizza ${name}`} />
      <div className="card-body d-flex flex-column p-0">
        <h2 className="card-title h5 px-3 pt-3 mb-2 text-capitalize">
          Pizza {name}
        </h2>
        <hr className="my-0" />
        <div className="text-center px-3 py-3">
          <p className="text-muted mb-2">Ingredientes:</p>
          <ul className="list-unstyled mb-0 ingredients">
            {ingredients.map((ingredient) => (
              <li key={ingredient}>🍕 {ingredient}</li>
            ))}
          </ul>
        </div>
        <hr className="my-0" />
        <p className="text-center fw-bold fs-4 my-3">
          Precio: ${formatPrice(price)}
        </p>
        <div className="d-flex justify-content-between px-3 pb-3 mt-auto">
          <Link to={`/pizza/${id}`} className="btn btn-outline-dark btn-sm">
            Ver Más 👀
          </Link>
          <button
            type="button"
            className="btn btn-dark btn-sm"
            onClick={() => addToCart({ id, name, price, img })}
          >
            Añadir 🛒
          </button>
        </div>
      </div>
    </article>
  );
};

export default CardPizza;
