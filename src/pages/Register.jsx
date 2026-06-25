import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="logo-container">
          <div className="logo-placeholder">
            <FaBook />
          </div>
        </div>

        <h2>Create Account</h2>
        <p className="subtitle">Start organizing your studies.</p>

        <form className="auth-form">
          <input type="text" placeholder="Full Name" />

          <input type="email" placeholder="Email" />

          <input type="password" placeholder="Password" />

          <input type="password" placeholder="Confirm Password" />

          <button type="submit">Sign Up</button>
        </form>

        <p className="switch-auth">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
