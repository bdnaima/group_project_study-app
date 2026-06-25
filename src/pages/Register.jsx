import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const existingUsers = users.find((user) => user.email === email);
    if (existingUsers) {
      alert("Email already exists!");
      return;
    }

    //Create new user
    const newUser = {
      fullName,
      email,
      password,
    };

    // Add to new users array
    users.push(newUser);

    //Save to localstorage
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };
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

        <form className="auth-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

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
