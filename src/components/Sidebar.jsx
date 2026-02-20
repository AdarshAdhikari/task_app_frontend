import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <h2 className="logo">Tasker</h2>

      <nav className="sidebar-nav">
        <p
          onClick={() => navigate("/projects")}
          style={{
            cursor: "pointer",
            fontWeight: isActive("/projects") ? "bold" : "normal",
          }}
        >
          Projects
        </p>

        <p
          onClick={() => navigate("/tasks")}
          style={{
            cursor: "pointer",
            fontWeight: isActive("/tasks") ? "bold" : "normal",
          }}
        >
          My Tasks
        </p>

        <p
          onClick={() => navigate("/assign-task")}
          style={{
            cursor: "pointer",
            fontWeight: isActive("/assign-task") ? "bold" : "normal",
          }}
        >
          Assign Task
        </p>

        <p
          onClick={handleLogout}
          style={{ cursor: "pointer", color: "red" }}
        >
          Logout
        </p>
      </nav>
    </div>
  );
}

export default Sidebar;