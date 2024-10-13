import { Link } from "react-router-dom";
import { UseAuthContext } from "../context/AuthContext";
import { FollowerIcon, LogoutIcon, ReputationIcon } from "./IconTypes";

const UserComponent = () => {
  const { user, logoutUser } = UseAuthContext();

  return user ? (
    <div className="w-full  bg-white text-sky-950 shadow-xl rounded-lg border border-sky-100 overflow-hidden">
      <div className=" flex gap-3 p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 relative">
        <div className="w-20 h-20  rounded-full overflow-hidden mb-2 border-4 bg-gray-300 border-white shadow-lg">
          <img src="/placeholder.jpeg" alt={user.username} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-1">{user.username}</h2>

          <p className="text-emerald-200">senior developer</p>
          <span className="text-blue-800 text-sm">{user.email}</span>
        </div>
      </div>
      <div className="space-y-2 pt-3  px-4">
        <div className="bg-sky-100 rounded-lg p-4 flex flex-col gap-2 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FollowerIcon></FollowerIcon>
              <span className="font-semibold text-sky-950">Followers</span>
            </div>
            <span className=" font-bold text-emerald-600 flex items-center gap-2">234</span>
          </div>
        </div>
        <div className=" bg-sky-100 rounded-lg p-4 flex flex-col gap-2 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ReputationIcon></ReputationIcon>
              <span className="font-semibold text-sky-950">Reputation</span>
            </div>
            <span className=" font-bold text-emerald-600 flex items-center gap-2">{user.reputation}</span>
          </div>
        </div>
      </div>
      <div className="pt-4 gap-2 flex items-center justify-center px-4 pb-6">
        <Link
          className=" bg-gray-100 flex items-center gap-2 rounded-lg px-4 justify-center  hover:bg-gray-200 text-gray-600 font-semibold py-2  transition-colors duration-300"
          to={"/profile"}
        >
          My Profile
        </Link>
        <button
          className=" bg-sky-950 flex items-center gap-2 rounded-lg px-4 justify-center  hover:bg-sky-900 text-white font-semibold py-2  transition-colors duration-300"
          onClick={logoutUser}
        >
          <LogoutIcon />
          Logout
        </button>
      </div>
    </div>
  ) : (
    <Link to={"/signup"}>Signup</Link>
  );
};

export default UserComponent;
