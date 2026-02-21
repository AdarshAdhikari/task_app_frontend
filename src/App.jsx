import Projects from "./pages/Projects";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgetpassword from "./pages/ForgetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Tasks from "./pages/Tasks";
import AssignTask from "./pages/AssignTask";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<Forgetpassword />} />

        {/* Protected routes with Layout */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/assign-task" element={<AssignTask />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;