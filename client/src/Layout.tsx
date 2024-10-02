import ActionComponent from "./components/ActionComponent";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1  bg-gray-50">
        <Navbar />
        <div className="w-4/6 p-5 ">{children}</div>
        <ActionComponent />
      </div>
    </div>
  );
};

export default Layout;
