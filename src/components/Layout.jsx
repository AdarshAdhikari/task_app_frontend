import Sidebar from "./sidebar";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">{children}</div>
    </div>
  );
}

export default Layout;
