import Projects from "./pages/Projects";
import Login from "./pages/Login";
import Forgetpassword from "./pages/ForgetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forget-Password" element={<Forgetpassword />} />
        <Route path="/projects" element={<Projects />} />
        
      </Routes>
    </Router>
  );
}

export default App;
