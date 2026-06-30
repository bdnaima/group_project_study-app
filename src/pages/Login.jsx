import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!foundUser) {
      setErrorMsg("Invalid email or password. Please try again.");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    setErrorMsg("");
    navigate("/dashboard");
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");

    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="logo-container">
          <div className="logo-placeholder">
            <FaBook />
          </div>
        </div>

        <h2 className="title">Study Planner</h2>
        <p className="subtitle">Plan your tasks. Achieve your goals.</p>

        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="auth-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>

            <Link to="/forgotPassword">Forgot password?</Link>
          </div>

          <button type="submit">Login</button>
          {errorMsg && <div className="errorMsg">{errorMsg}</div>}
        </form>

        <p className="switch-auth">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
