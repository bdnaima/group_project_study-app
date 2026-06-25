import { Link } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import "./Auth.css";

const Login = () => {
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

        <form className="auth-form">
          <input type="email" placeholder="Email" />

          <input type="password" placeholder="Password" />

          <div className="auth-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="/">Forgot password?</a>
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="switch-auth">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
