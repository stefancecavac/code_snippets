import ActionComponent from "./components/ActionComponent";
import Navbar from "./components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <div className="flex flex-1  ">
        <div className="w-56 ">
          <Navbar />
        </div>
        <div className="w-full p-5 flex-1 mx-5  ">{children}</div>
        <div className="w-80">
          <ActionComponent />
        </div>
      </div>
    </div>
  );
};

export default Layout;
