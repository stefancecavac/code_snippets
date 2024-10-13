import { NavLink } from "react-router-dom";
import { MenuIcon } from "./IconTypes";

const Navbar = () => {
  return (
    <div className="text-white w-56 fixed h-full flex  flex-col bg-gradient-to-br from-sky-950 to-sky-900   ">
      <h1 className=" text-3xl font-bold flex items-center gap-5 p-3">
        {"</>"}
        <span className="text-xl"> CodeBlock</span>
      </h1>

      <div className="flex flex-col  m-3 mr-0 gap-1 mt-10 ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive ? "  text-emerald-500 border-r-4 rounded-l-lg bg-[#0a2639] border-emerald-500 " : ""
            } px-1 py-2 flex gap-3 text-sm  items-center  transition-all hover:border-r-4 hover:border-emerald-500`
          }
        >
          <MenuIcon></MenuIcon>
          <p>My Feed</p>
        </NavLink>
        <NavLink
          to="/my-snippets"
          className={({ isActive }) =>
            `${
              isActive ? "  text-emerald-500 border-r-4 rounded-l-lg bg-[#0a2639] border-emerald-500 " : ""
            } px-1 py-2 flex gap-3 text-sm  items-center  transition-all hover:border-r-4 hover:border-emerald-500`
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
