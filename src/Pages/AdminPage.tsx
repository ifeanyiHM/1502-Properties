import { NavLink, Outlet } from "react-router-dom";

function AdminPage() {
  return (
    <div className="admin-page">
      <div className="admin-page-container">
        <h1>Admin Panel</h1>

        <div className="tab-buttons">
          <NavLink
            to="approveproperty"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Approve Properties
          </NavLink>
          <NavLink
            to="deleteproperty"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Delete Properties
          </NavLink>
        </div>
      </div>
      <>
        <Outlet /> {/* this renders the child route */}
      </>
    </div>
  );
}

export default AdminPage;
