import { useNavigate, useLocation } from "react-router-dom";
import {
  FiFolder,
  FiCheckSquare,
  FiPlusCircle,
  FiLogOut,
} from "react-icons/fi";
import "./Layout.css";

function Sidebar({ onAssignClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div>
        <h2 className="logo">Tasker</h2>
        <p className="subtitle">Task Management SaaS</p>

        <div className="sidebar-nav">
          <p
            className={isActive("/projects") ? "nav-item active" : "nav-item"}
            onClick={() => navigate("/projects")}
          >
            <FiFolder className="icon" /> Projects
          </p>

          <p
            className={isActive("/tasks") ? "nav-item active" : "nav-item"}
            onClick={() => navigate("/tasks")}
          >
            <FiCheckSquare className="icon" /> My Tasks
          </p>

          <p className="nav-item" onClick={onAssignClick}>
            <FiPlusCircle className="icon" /> Assign Task
          </p>
        </div>
      </div>

      <p className="logout" onClick={handleLogout}>
        <FiLogOut className="icon" /> Logout
      </p>
    </div>
  );
}

export default Sidebar;
