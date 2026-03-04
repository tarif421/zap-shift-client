import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = watch('senderRegion');

const districtsByRegion = (region) => {
  if (!region) return [];

  return serviceCenters
    .filter((c) => c.region === region)
    .flatMap((c) => c.district);   // 🔥 important
};
  console.log(regions);

  const handleSendParcel = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2 className="text-5xl font-bold">Send A Parcel</h2>
      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="mt-12 p-4 text-black"
      >
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="parcel name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (kg)</label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="parcel name"
            />
          </fieldset>
        </div>
        {/* two column  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* sender info */}

          <fieldset className="fieldset">
            <h4 className="text-xl font-semibold">Sender Details</h4>
            {/* sender name */}
            <label className="label">Sender Name</label>
            <input
              type="text"
              {...register("senderName")}
              className="input w-full"
              placeholder="sender name"
            />
            {/* sender email */}
            <label className="label">Sender Email</label>
            <input
              type="email"
              {...register("senderEmail")}
              className="input w-full"
              placeholder="sender email"
            />
            {/* sender address */}
            <label className="label mt-4">Address</label>
            <input
              type="text"
              {...register("senderAddress")}
              className="input w-full"
              placeholder="sender address"
            />
            {/*  sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Regions</legend>
              <select
                {...register("senderRegion")}
                defaultValue="Pick a region"
                className="select"
              >
                <option disabled={true}>Pick a region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>
            {/* sender districts */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend ">Sender Districts</legend>
<select
  {...register("senderDistrict")}
  defaultValue=""
  className="select"
>
  <option value="" disabled>
    Pick a district
  </option>

  {districtsByRegion(senderRegion).map((district, i) => (
    <option key={i} value={district}>
      {district}
    </option>
  ))}
</select>
            </fieldset>

            {/* text box */}
            <label className="label mt-4">Pickup  Instruction</label>
            <input
              type="text"
              {...register("pickupInstructions")}
              className="input w-full"
              placeholder="pickup instructions"
            />
          </fieldset>
          {/* Receiver info */}
          <fieldset className="fieldset">
            <h4 className="text-xl font-semibold">Sender Details</h4>
            {/* receiver name */}
            <label className="label">Sender Name</label>
            <input
              type="text"
              {...register("receiverName")}
              className="input w-full"
              placeholder="receiver name"
            />
            {/* receiver email */}
            <label className="label">Receiver Email</label>
            <input
              type="email"
              {...register("receiverEmail")}
              className="input w-full"
              placeholder="Receiver email"
            />
            {/* receiver address */}
            <label className="label mt-4">Address</label>
            <input
              type="text"
              {...register("receiverAddress")}
              className="input w-full"
              placeholder="receiver address"
            />
            {/* receiver districts */}
            <label className="label mt-4">Districts</label>
            <input
              type="text"
              {...register("receiverDistricts")}
              className="input w-full"
              placeholder="Districts"
            />
            {/* text box */}
            <label className="label mt-4">Pikup Instruction</label>
            <input
              type="text"
              {...register("pickupInstructions")}
              className="input w-full"
              placeholder="pickup instructions"
            />
          </fieldset>
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
