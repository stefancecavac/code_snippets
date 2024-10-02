import { useState } from "react";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

const SignupPage = () => {
  const [loginView, setLoginView] = useState<boolean>(true);
  return (
    <div className="absolute z-50 flex top-0 left-0 right-0 bottom-0 items-center justify-center text-gray-500 bg-gradient-to-r from-gray-200 to-slate-400">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
      >
        {loginView ? (
          <LoginComponent setLoginView={setLoginView}></LoginComponent>
        ) : (
          <RegisterComponent setLoginView={setLoginView}></RegisterComponent>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
