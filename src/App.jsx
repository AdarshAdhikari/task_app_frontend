import Projects from "./pages/Projects";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgetpassword from "./pages/ForgetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-Password" element={<Forgetpassword />} />
        <Route path="/projects" element={
          <ProtectedRoute>
            <Projects />
            </ProtectedRoute>
          } 
          />
        
      </Routes>
    </Router>
  );
}

export default App;
