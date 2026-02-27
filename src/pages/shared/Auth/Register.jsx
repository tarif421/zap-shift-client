import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "./SocilaLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    console.log("after register", data);
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
      <h1 className="text-3xl text-center">Welcome to zap Shift</h1>
      <p className="text-center">Plese Register</p>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p role="alert" className="text-red-500">
              Email is required
            </p>
          )}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Password must be 6 character</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must have one uppercase, one lowercase and a special
              character
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>
          Already have an account{" "}
          <Link to="/auth/login" className="text-blue-400 underline">
            Login
          </Link>{" "}
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
