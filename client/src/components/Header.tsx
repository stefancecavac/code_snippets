import UserComponent from "./UserComponent";

const Header = () => {
  return (
    <div className=" bg-gradient-to-r from-sky-950 to-emerald-500 text-white p-3 px-5  flex items-center justify-between">
      <h1 className=" text-3xl font-bold flex items-center gap-5 ">
        {"</>"}
        <span className="text-xl"> CodeBlock</span>
      </h1>
      <UserComponent></UserComponent>
    </div>
  );
};

export default Header;
