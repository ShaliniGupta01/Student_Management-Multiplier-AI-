import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={styles.container}>
      <h1>Welcome to Student Management System</h1>
      <p>Manage and view student records easily.</p>
      {user && <p>Logged in as: {user.username} ({user.role})</p>}
    </div>
  );
};

const styles = {
  container: { 
    textAlign: "center", 
    marginTop: "100px",
    padding: "20px",
    fontFamily: "Arial, sans-serif"
  },
};

export default Home;