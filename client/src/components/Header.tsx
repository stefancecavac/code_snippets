import UserComponent from "./UserComponent";

const Header = () => {
  return (
    <div className=" text-white p-3 px-5 bg-sky-950 flex items-center justify-between">
      <h1 className=" text-3xl font-bold flex items-center gap-5 ">
        {"</>"}
        <span className="text-xl"> CodeBlock</span>
      </h1>
      <UserComponent></UserComponent>
    </div>
  );
};

export default Header;
