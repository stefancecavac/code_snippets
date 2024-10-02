import { NavLink } from "react-router-dom";
import { MenuIcon } from "./IconTypes";

const Navbar = () => {
  return (
    <div className="text-gray-700 flex w-1/6 flex-col border-r-2  border-gray-200 ">
      <div className="flex flex-col ml-10 mt-5 gap-1 ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive ? "border-r-4 border-emerald-500 text-emerald-500" : ""
            } px-1 py-2 flex gap-3  items-center  transition-all hover:border-r-4 hover:border-emerald-500`
          }
        >
          <MenuIcon></MenuIcon>
          <p>My Feed</p>
        </NavLink>
        <NavLink
          to="/my-snippets"
          className={({ isActive }) =>
            `${
              isActive ? "border-r-4 border-emerald-500 text-emerald-500" : ""
            } px-1 py-2 flex gap-3  items-center  transition-all hover:border-r-4 hover:border-emerald-500`
          }
        >
          <MenuIcon></MenuIcon>
          <p>My Snippets</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
