import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import ErroAlert from "../components/ErroAlert";
import { useState } from "react";
import { Droplets } from "lucide-react";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { errorMsg, loginUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await loginUser(data);
      navigate("/requests");
    } catch (error) {
      console.log("Login Failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <div className="flex justify-center mb-4">
            <div className="bg-error/10 p-3 rounded-full">
              <Droplets className="text-error w-8 h-8" />
            </div>
          </div>
          
          <h2 className="card-title text-2xl font-bold justify-center text-base-content">Welcome Back</h2>
          <p className="text-center text-base-content/60 mb-4">Sign in to save lives today</p>
          
          {errorMsg && <ErroAlert error={errorMsg} />}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text font-bold text-base-content">Email</span>
              </label>
              <input
                id="email" 
                type="email" 
                placeholder="name@example.com"
                className={`input input-bordered focus:border-error w-full bg-base-200 text-base-content ${errors.email ? "input-error" : ""}`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span className="label-text-alt text-error mt-1">{errors.email.message}</span>}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text font-bold text-base-content">Password</span>
              </label>
              <input
                id="password" 
                type="password" 
                placeholder="••••••••"
                className={`input input-bordered focus:border-error w-full bg-base-200 text-base-content ${errors.password ? "input-error" : ""}`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <span className="label-text-alt text-error mt-1">{errors.password.message}</span>}
            </div>

            <button 
              type="submit" 
              className="btn bg-red-600 hover:bg-red-700 text-white border-none w-full mt-6" 
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : "Login"}
            </button>
          </form>

          <div className="text-center mt-4">
             <Link to="/forgot-password" size="sm" className="text-sm text-base-content/60 hover:text-error hover:underline transition-colors">
               Forgot password?
             </Link>
          </div>

          <div className="text-center mt-6">
            <p className="text-base-content/70">
              Don't have an account? <Link to="/register" className="text-error font-bold hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;