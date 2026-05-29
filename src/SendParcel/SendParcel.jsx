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
    <div className="text-black">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (kg)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>
        {/* two colum */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-12">
          {/* sender info */}

          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Sender Details</h4>
            {/* sender name */}
            <label className="label">Sender Name</label>
            <input
              type="text"
              {...register("senderName")}
              className="input w-full"
              placeholder="Sender Name"
            />
            {/* sender region */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select defaultValue="Pick a region" className="select">
                <option disabled={true}>Pick a region</option>
                <option>Chrome</option>
                <option>FireFox</option>
                <option>Safari</option>
              </select>
              <span className="label">Optional</span>
            </fieldset>
            {/* sender districts */}
            <label className="label mt-4">Sender Districts</label>
            <input
              type="text"
              {...register("senderDistricts")}
              className="input w-full"
              placeholder="Sender Districts"
            />
            {/* sender address */}
            <label className="label mt-4">Sender Adress</label>
            <input
              type="text"
              {...register("senderAdress")}
              className="input w-full"
              placeholder="Sender Adress"
            />
            {/*  sender phone */}
            <label className="label mt-4">Sender Phone Number</label>
            <input
              type="number"
              {...register("senderPhoneNumber")}
              className="input w-full"
              placeholder="Sender Phone Number"
            />
          </fieldset>
          {/* receiver info */}

          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Receiver Details</h4>
            {/* reciever name */}
            <label className="label">Reciever Name</label>
            <input
              type="text"
              {...register("receiverName")}
              className="input w-full"
              placeholder="Receiver Name"
            />
            {/* receiver address */}
            <label className="label mt-4">Receiver Adress</label>
            <input
              type="text"
              {...register("receiverAdress")}
              className="input w-full"
              placeholder="Receiver Adress"
            />
            {/*  receiver phone */}
            <label className="label mt-4">Receiver Phone Number</label>
            <input
              type="number"
              {...register("receiverPhoneNumber")}
              className="input w-full"
              placeholder="Receiver Phone Number"
            />
            {/* receiver districts */}
            <label className="label mt-4">Reciever Districts</label>
            <input
              type="text"
              {...register("ReceiverDistricts")}
              className="input w-full"
              placeholder="Receiver Districts"
            />
          </fieldset>
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
