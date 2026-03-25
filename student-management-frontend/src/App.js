import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home"; 
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateStudent from "./pages/CreateStudent";
import EditStudent from "./pages/EditStudent";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
      <Navbar />
        <Routes>
          {/* Default route */}

          <Route path="/" element={<Home />} />  
          <Route path="/" element={<Navigate to="/login" />} />
          
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={<PrivateRoute><Dashboard /></PrivateRoute>} 
          />
          <Route path="/students/edit/:id" element={<EditStudent />} />
          <Route 
            path="/students/create" 
            element={<PrivateRoute adminOnly={true}><CreateStudent /></PrivateRoute>} 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;