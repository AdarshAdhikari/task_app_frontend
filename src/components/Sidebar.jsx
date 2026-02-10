import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">Tasker</h2>

      <nav className="sidebar-nav">
        <p onClick={() => navigate("/projects")}>Projects</p>
        <p>My Tasks</p>

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
