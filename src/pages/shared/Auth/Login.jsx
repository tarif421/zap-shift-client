import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hook/useAuth";
import { Link } from "react-router";
import SocialLogin from "./SocilaLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    console.log("form data", data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl text-center">Welcome back</h1>
          <p className="text-center">Plese Login</p>
          <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              {/* email field */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}
              {/* password field */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  {" "}
                  Password must be 6 character or longer{" "}
                </p>
              )}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
            <p>New to zap Shift? <Link className="text-blue-400 underline" to="/auth/register">Register</Link> </p>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
