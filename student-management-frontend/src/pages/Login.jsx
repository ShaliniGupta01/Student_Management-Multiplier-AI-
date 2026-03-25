import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // make sure axios is imported
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const { loginUser } = useContext(AuthContext); // function to save user info
  const navigate = useNavigate();

  // Update form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit login form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://student-management-multiplier-ai.onrender.com/login", {
        username: form.username,
        password: form.password,
      });

      // Save user and token in context/localStorage
      loginUser({
        username: response.data.username,
        role: response.data.role,
        token: response.data.access_token,
      });

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.detail || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Login</h2>
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Login</button>
    </form>
  );
};

const styles = {
  form: { display: "flex", flexDirection: "column", width: "300px", margin: "50px auto" },
  input: { margin: "10px 0", padding: "8px", fontSize: "16px" },
  button: { padding: "10px", backgroundColor: "#4f46e5", color: "#fff", border: "none", cursor: "pointer" }
};

export default Login;