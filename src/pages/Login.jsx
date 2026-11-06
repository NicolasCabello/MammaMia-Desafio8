import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("All fields are required!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    try {
      const data = await login(email, password);

      if (!data?.token) {
        alert(data?.message || data?.error || "Authentication failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Authentication failed!");
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h1>Login</h1>
        <div className="mb-3">
          <label htmlFor="login-email" className="form-label">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="login-password" className="form-label">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </main>
  );
};

export default Login;
