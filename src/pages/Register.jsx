import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; 
import useAuthContext from "../hooks/useAuthContext";
import ErroAlert from "../components/ErroAlert";
import { useState } from "react";
import { Droplets } from "lucide-react";

const Register = () => {
  const { registerUser, errorMsg } = useAuthContext();
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    delete data.confirm_password;
    try {
      const response = await registerUser(data);
      if (response.success) {
        setSuccessMsg(response.message);
        setTimeout(() => navigate("/login"), 5000); 
      }
    } catch (error) {
      console.log("Registration failed", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <div className="flex justify-center mb-2">
            <div className="bg-error/10 p-3 rounded-full">
              <div className="text-error">
                <Droplets className="w-8 h-8" />
              </div>
            </div>
          </div>
          
          <h2 className="card-title text-2xl font-bold justify-center text-base-content">Become a Donor</h2>
          <p className="text-center text-base-content/60 mb-4">Join our community and help save lives.</p>

          {errorMsg && <ErroAlert error={errorMsg} />}
          {successMsg && (
            <div role="alert" className="alert alert-success text-white mb-4">
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label" htmlFor="first_name">
                  <span className="label-text font-bold text-base-content">First Name</span>
                </label>
                <input 
                  id="first_name" 
                  type="text" 
                  className={`input input-bordered focus:border-error w-full bg-base-200 text-base-content ${errors.first_name ? 'input-error' : ''}`}
                  {...register("first_name", { required: "First Name is Required" })} 
                />
                {errors.first_name && <span className="label-text-alt text-error mt-1">{errors.first_name.message}</span>}
              </div>
              <div className="form-control">
                <label className="label" htmlFor="last_name">
                  <span className="label-text font-bold text-base-content">Last Name</span>
                </label>
                <input 
                  id="last_name" 
                  type="text" 
                  className={`input input-bordered focus:border-error w-full bg-base-200 text-base-content ${errors.last_name ? 'input-error' : ''}`}
                  {...register("last_name", { required: "Last Name is Required" })} 
                />
                {errors.last_name && <span className="label-text-alt text-error mt-1">{errors.last_name.message}</span>}
              </div>
            </div>

            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text font-bold text-base-content">Email</span>
              </label>
              <input 
                id="email" 
                type="email" 
                className={`input input-bordered focus:border-error w-full bg-base-200 text-base-content ${errors.email ? 'input-error' : ''}`}
                {...register("email", { required: "Email is Required" })} 
              />
              {errors.email && <span className="label-text-alt text-error mt-1">{errors.email.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text font-bold text-base-content">Password</span>
                </label>
                <input 
                  id="password" 
                  type="password" 
                  className={`input input-bordered focus:border-error w-full bg-base-200 text-base-content ${errors.password ? 'input-error' : ''}`}
                  {...register("password", { required: "Required", minLength: { value: 8, message: "Min 8 chars" } })} 
                />
                {errors.password && <span className="label-text-alt text-error mt-1">{errors.password.message}</span>}
              </div>
              <div className="form-control">
                <label className="label" htmlFor="confirmPassword">
                  <span className="label-text font-bold text-base-content">Confirm</span>
                </label>
                <input 
                  id="confirmPassword" 
                  type="password" 
                  className={`input input-bordered focus:border-error w-full bg-base-200 text-base-content ${errors.confirm_password ? 'input-error' : ''}`}
                  {...register("confirm_password", { required: "Required", validate: (val) => val === watch("password") || "Don't match" })} 
                />
                {errors.confirm_password && <span className="label-text-alt text-error mt-1">{errors.confirm_password.message}</span>}
              </div>
            </div>

            <button type="submit" className="btn bg-red-600 hover:bg-red-700 text-white border-none w-full mt-4">
              Create Account
            </button>
          </form>

          <div className="text-center mt-4 text-base-content/70">
            Already have an account? <Link to="/login" className="text-error font-bold hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;