import { NavLink } from "react-router-dom";

const DashboardNavLink = ({ to, children }) => (
  <NavLink
    end
    to={to}
    className={({ isActive }) =>
      `block px-4 py-3 rounded-lg transition ${
        isActive
          ? "bg-gray-600 text-white font-semibold shadow-md"
          : "text-gray-300 hover:bg-gray-800"
      }`
    }
  >
    {children}
  </NavLink>
);

export default DashboardNavLink;
