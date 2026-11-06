import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CartProvider from "./context/CartContext";
import PizzaProvider from "./context/PizzaContext";
import UserProvider, { UserContext } from "./context/UserContext";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

const AppRoutes = () => {
  const { token } = useContext(UserContext);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={token ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<Pizza />} />
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <PizzaProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </PizzaProvider>
    </UserProvider>
  );
};

export default App;
