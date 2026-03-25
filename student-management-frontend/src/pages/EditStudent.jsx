import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const EditStudent = () => {
  const { id } = useParams(); // get student ID from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", age: "", grade: "" });

  // Fetch student data on mount
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await API.get(`/students/${id}`);
        setForm({
          name: res.data.student.name,
          age: res.data.student.age,
          grade: res.data.student.grade || res.data.student.course
        });
      } catch (err) {
        alert("Failed to fetch student");
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/students/${id}`, form);
      navigate("/dashboard"); // go back to dashboard after update
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to update student");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleUpdate} style={styles.form}>
        <h2>Edit Student</h2>
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
        <button type="submit" style={styles.button}>Update</button>
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

export default EditStudent;