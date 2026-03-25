import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const navigate = useNavigate();

  // Update form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit signup form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Signup API
      await axios.post("https://student-management-multiplier-ai.onrender.com/signup", form);

      alert("Signup successful! Please login.");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Signup</h2>
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
      <select name="role" value={form.role} onChange={handleChange} style={styles.input}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" style={styles.button}>Signup</button>
    </form>
  );
};

const styles = {
  form: { display: "flex", flexDirection: "column", width: "300px", margin: "50px auto" },
  input: { margin: "10px 0", padding: "8px", fontSize: "16px" },
  button: { padding: "10px", backgroundColor: "#4f46e5", color: "#fff", border: "none", cursor: "pointer" }
};

export default Signup;