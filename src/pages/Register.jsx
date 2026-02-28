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
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-gray-50">
      <div className="card w-full max-w-lg bg-white shadow-xl border border-gray-100">
        <div className="card-body">
          <div className="flex justify-center mb-2">
            <div className="bg-red-100 p-3 rounded-full">
              <Droplets className="text-red-600 w-8 h-8" />
            </div>
          </div>
          
          <h2 className="card-title text-2xl font-bold justify-center">Become a Donor</h2>
          <p className="text-center text-gray-500 mb-4">Join our community and help save lives.</p>

          {errorMsg && <ErroAlert error={errorMsg} />}
          {successMsg && (
            <div role="alert" className="alert alert-success text-white mb-4">
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label" htmlFor="first_name"><span className="label-text font-bold">First Name</span></label>
                <input id="first_name" type="text" className="input input-bordered focus:border-red-500 w-full"
                  {...register("first_name", { required: "First Name is Required" })} />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="last_name"><span className="label-text font-bold">Last Name</span></label>
                <input id="last_name" type="text" className="input input-bordered focus:border-red-500 w-full"
                  {...register("last_name", { required: "Last Name is Required" })} />
              </div>
            </div>

            <div className="form-control">
              <label className="label" htmlFor="email"><span className="label-text font-bold">Email</span></label>
              <input id="email" type="email" className="input input-bordered focus:border-red-500 w-full"
                {...register("email", { required: "Email is Required" })} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label" htmlFor="password"><span className="label-text font-bold">Password</span></label>
                <input id="password" type="password" className="input input-bordered focus:border-red-500 w-full"
                  {...register("password", { required: "Required", minLength: { value: 8, message: "Min 8 chars" } })} />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="confirmPassword"><span className="label-text font-bold">Confirm</span></label>
                <input id="confirmPassword" type="password" className="input input-bordered focus:border-red-500 w-full"
                  {...register("confirm_password", { required: "Required", validate: (val) => val === watch("password") || "Don't match" })} />
              </div>
            </div>

            <button type="submit" className="btn bg-red-600 hover:bg-red-700 text-white border-none w-full mt-4">
              Create Account
            </button>
          </form>

          <div className="text-center mt-4 text-gray-600">
            Already have an account? <Link to="/login" className="text-red-600 font-bold hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;