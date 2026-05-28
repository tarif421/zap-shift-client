import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSendParcel = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h2 className="text-5xl font-bold">Send a Parcel</h2>
      {/* form */}
      <form onSubmit={handleSubmit(handleSendParcel)} className="mt-12 p-4">
        {/* document / non document */}
        <div>
          <label className="label mr-6">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />
            Document
          </label>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
            />
            Non-Document
          </label>
        </div>
        {/* parcel info: name, wight */}
        <div></div>
        {/* two colum */}
        <div>
          {/* sender info */}
          <div></div>
          {/* receiver info */}
          <div></div>
        </div>
        {/* button */}
        <input
          type="submit"
          value="Send Parcel"
          className="btn btn-primary text-black"
        />
      </form>
    </div>
  );
};
export default SendParcel;
