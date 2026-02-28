import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "./SocilaLogin/SocialLogin";
import axios from "axios";
import useAuth from "../../../Hook/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();

  const handleRegistration = (data) => {
    console.log("after register", data.image[0]);
    const profileImg = data.image[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);


        // store the image in form data
        const formData = new FormData();
        formData.append("image", profileImg);

        // sent the photo to store and get the url
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
        axios.post(image_API_URL, formData).then((res) => {
          console.log("after image upload", res.data.data.url);

          // update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          //  send to firebase
          updateUserProfile(userProfile)
          .then(() => {
            console.log('user profile updated')
          })
          .catch(error => console.log(error))
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto shrink-0 shadow-2xl">
      <h1 className="text-3xl text-center">Welcome to zap Shift</h1>
      <p className="text-center">Plese Register</p>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* Name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p role="alert" className="text-red-500">
              Name is required
            </p>
          )}

          {/* pHOTO */}
          <label className="label">Photo</label>

          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input"
            placeholder="Choose a image"
          />
          {errors.image?.type === "required" && (
            <p role="alert" className="text-red-500">
              Image is required
            </p>
          )}

          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.name?.type === "required" && (
            <p role="alert" className="text-red-500">
              Email is required
            </p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
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
            Registrater
          </Link>{" "}
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
