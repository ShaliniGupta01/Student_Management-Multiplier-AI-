import { useState, useEffect, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data.students);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = (id) => navigate(`/students/edit/${id}`);

  return (
    <div style={styles.container}>
      <h2>Welcome, {user.username} ({user.role})</h2>

      {user.role === "admin" && (
        <button style={styles.addButton} onClick={() => navigate("/students/create")}>
          Add Student
        </button>
      )}

      <div style={styles.cardsContainer}>
        {students.map((s) => (
          <div key={s.id} style={styles.card}>
            <p><strong>Name:</strong> {s.name}</p>
            <p><strong>Age:</strong> {s.age}</p>
            <p><strong>Grade:</strong> {s.grade || s.course}</p>
            {user.role === "admin" && (
              <button style={styles.editButton} onClick={() => handleEdit(s.id)}>Edit</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px"
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px"
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    width: "200px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
  },
  editButton: {
    marginTop: "10px",
    padding: "6px 12px",
    backgroundColor: "#f59e0b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Dashboard;