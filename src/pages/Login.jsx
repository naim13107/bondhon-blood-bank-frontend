import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // Updated import
import useAuthContext from "../hooks/useAuthContext";
import ErroAlert from "../components/ErroAlert";
import { useState } from "react";
import { Droplets } from "lucide-react"; // Blood Bank theme

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { errorMsg, loginUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await loginUser(data);
      navigate("/requests"); // Redirecting donors directly to the requests page
    } catch (error) {
      console.log("Login Failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12 bg-gray-50">
      <div className="card w-full max-w-md bg-white shadow-xl border border-gray-100">
        <div className="card-body">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Droplets className="text-red-600 w-8 h-8" />
            </div>
          </div>
          
          <h2 className="card-title text-2xl font-bold justify-center text-gray-900">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-4">Sign in to save lives today</p>
          
          {errorMsg && <ErroAlert error={errorMsg} />}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label" htmlFor="email"><span className="label-text font-bold">Email</span></label>
              <input
                id="email" type="email" placeholder="name@example.com"
                className={`input input-bordered focus:border-red-500 w-full ${errors.email ? "input-error" : ""}`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span className="label-text-alt text-red-500 mt-1">{errors.email.message}</span>}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password"><span className="label-text font-bold">Password</span></label>
              <input
                id="password" type="password" placeholder="••••••••"
                className={`input input-bordered focus:border-red-500 w-full ${errors.password ? "input-error" : ""}`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <span className="label-text-alt text-red-500 mt-1">{errors.password.message}</span>}
            </div>

            <button type="submit" className="btn bg-red-600 hover:bg-red-700 text-white border-none w-full mt-6" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Login"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account? <Link to="/register" className="text-red-600 font-bold hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;