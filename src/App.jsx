import Projects from "./pages/Projects";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgetpassword from "./pages/ForgetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Tasks from "./pages/Tasks";
import AssignTask from "./pages/AssignTask";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<Forgetpassword />} />
        <Route path="/tasks" element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
          }/>

          <Route path="/assign-task" element ={<ProtectedRoute><AssignTask /></ProtectedRoute>
          }
         />
        
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
