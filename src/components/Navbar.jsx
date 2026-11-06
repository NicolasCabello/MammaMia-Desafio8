import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { formatPrice } from "../utils/formatPrice";

const Navbar = () => {
  const { total } = useContext(CartContext);
  const { token, logout } = useContext(UserContext);
  const { pathname } = useLocation();

  const itemClass = (path) =>
    `btn btn-outline-light btn-sm${pathname === path ? " active" : ""}`;

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid px-3">
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <span className="navbar-brand mb-0 me-1">Pizzería Mamma Mia!</span>
          <Link to="/" className={itemClass("/")}>
            🍕 Home
          </Link>
          {token ? (
            <>
              <Link to="/profile" className={itemClass("/profile")}>
                🔓 Profile
              </Link>
              <button
                type="button"
                className="btn btn-outline-light btn-sm"
                onClick={logout}
              >
                🔒 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={itemClass("/login")}>
                🔐 Login
              </Link>
              <Link to="/register" className={itemClass("/register")}>
                🔐 Register
              </Link>
            </>
          )}
        </div>
        <Link to="/cart" className="btn btn-outline-info btn-sm ms-auto">
          🛒 Total: ${formatPrice(total)}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
