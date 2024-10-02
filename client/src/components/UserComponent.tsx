import { Link } from "react-router-dom";
import { UseAuthContext } from "../context/AuthContext";
import { LogoutIcon, UserIcon } from "./IconTypes";

const UserComponent = () => {
  const { user, logoutUser } = UseAuthContext();

  return user ? (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-2">
        <UserIcon></UserIcon>
        <p>{user.username}</p>
      </div>
      <button
        className="text-white flex items-center gap-2  rounded-lg  px-2 py-1 hover:bg-sky-800"
        onClick={() => logoutUser()}
      >
        <LogoutIcon></LogoutIcon>
        <p>Logout</p>
      </button>
    </div>
  ) : (
    <Link to={"/signup"}>Signup</Link>
  );
};

export default UserComponent;
