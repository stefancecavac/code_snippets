import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UseAuthContext } from "../context/AuthContext";
import { loginData, loginSchema } from "../types";

const LoginComponent = ({
  setLoginView,
}: {
  setLoginView: (value: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    resolver: zodResolver(loginSchema),
  });

  const { loginUser } = UseAuthContext();

  const submitForm = (data: loginData) => {
    loginUser(data);
  };

  console.log(errors);

  return (
    <>
      <h1 className="text-2xl font-bold text-center  mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="mb-4">
          <label className="block text-sm font-medium ">
            Email:
            <input
              {...register("email")}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
            {errors.email?.message && (
              <p className="text-red-500 text-xs  border border-red-500 bg-red-200 rounded-sm  my-2 p-1">
                {errors.email.message}
              </p>
            )}
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium ">
            Password
            <input
              {...register("password")}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
            {errors.password?.message && (
              <p className="text-red-500 text-xs  border border-red-500 bg-red-200 rounded-sm  my-2 p-1">
                {errors.password.message}
              </p>
            )}
          </label>
        </div>

        <div className="flex">
          <button
            type="submit"
            className="bg-emerald-500 text-white w-full px-4 py-2 rounded-md hover:bg-slate-600 hover:text-gray-500 transition-all"
          >
            Login
          </button>
        </div>

        <p className="text-center my-3">Or</p>
        <p className="text-center ">
          Dont have an Account?
          <button
            type="button"
            onClick={() => setLoginView(false)}
            className="text-slate-800 font-bold"
          >
            Register for free
          </button>
        </p>
      </form>
    </>
  );
};

export default LoginComponent;
