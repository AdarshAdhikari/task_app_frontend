import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import AssignTaskModal from "./AssignTaskModal";
import AssignTask from "../pages/AssignTask";
import "./Layout.css";

function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setIsModalOpen(false);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="layout">
      <Sidebar onAssignClick={() => setIsModalOpen(true)} />

      <div className="main-content">
        <Outlet context={{ refreshKey }} />
      </div>

      <AssignTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <AssignTask onSuccess={handleSuccess} />
      </AssignTaskModal>
    </div>
  );
}

export default Layout;