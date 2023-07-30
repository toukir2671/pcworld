import { NavLink, Outlet } from "react-router-dom";
import "./admin.scss";

const Admin = () => {
  const activeStyles = {
    textDecoration: "underline",
    backgroundColor: "hsl(209, 23%, 60%)",
  };

  return (
    <>
      <nav className="adminPanel">
        <NavLink
          to="productUpload"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Product Upload
        </NavLink>
        <NavLink
          to="deals"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Deals
        </NavLink>
        <NavLink
          to="orders"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Orders
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default Admin;
