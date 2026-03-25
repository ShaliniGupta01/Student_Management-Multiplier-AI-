import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const CreateStudent = () => {
  const [form, setForm] = useState({ name: "", age: "", grade: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/students", form);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to create student");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Create Student</h2>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="age"
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="grade"
          placeholder="Grade"
          value={form.grade}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Create</button>
      </form>
    </div>
  );
};

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", marginTop: "50px" },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9"
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    marginTop: "10px",
    fontSize: "16px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default CreateStudent;