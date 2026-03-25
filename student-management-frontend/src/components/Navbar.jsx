import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.brand}>Student Management</h2>
      
      <div style={styles.links}>
        {user ? (
          <>
            <span style={styles.user}>Hello, {user.username} ({user.role})</span>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#4f46e5", // Indigo
    color: "#fff"
  },
  brand: {
    margin: 0,
    fontSize: "1.5rem"
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold"
  },
  logout: {
    backgroundColor: "#ef4444", // Red
    border: "none",
    color: "#fff",
    padding: "5px 10px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  user: {
    marginRight: "10px",
    fontStyle: "italic"
  }
};

export default Navbar;