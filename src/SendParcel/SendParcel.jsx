import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSendParcel = (data) => {
    console.log(data)
  };

  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcel</h2>
      <form onSubmit={handleSubmit(handleSendParcel)} className="mt-12 p-4">
        {/* parcel type */}
        <div>
          <label className="label m-4">
            {" "}
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />{" "}
            Document
          </label>
          <label className="label">
            {" "}
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />{" "}
            Non-Document
          </label>
        </div>
        {/* parcel info */}
        <div>
             <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />
      
        </fieldset>
        </div>
        {/* two colimn  */}
        <div>
          {/* sender info */}
          <div></div>
        </div>
        <input
          type="submit"
          value="send Parcel"
          className="btn btn-primary text-black"
        />
      </form>
    </div>
  );
};

export default SendParcel;
