import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // region
  const serviceCenters = useLoaderData() || [];
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  const selectedRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  // districts by region
  const districtsByRegion = (region) => {
    if (!region) return [];
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return [...new Set(districts)];
  };

  // submit parcel
  const handleSendParcel = (data) => {
    const sameDistrict = data.senderDistrict === data.receiverDistrict;
    console.log(sameDistrict);
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
        {/* parcel info: name, weight */}
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
        {/* two column */}
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
              <select
                {...register("senderRegion")}
                defaultValue=""
                className="select w-full"
              >
                <option value="" disabled={true}>
                  Pick a region
                </option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender districts */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Sender Districts</legend>
              <select
                {...register("senderDistrict")}
                defaultValue=""
                className="select w-full"
              >
                <option value="" disabled={true}>
                  Pick a district
                </option>
                {districtsByRegion(selectedRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender address */}
            <label className="label mt-4">Sender Address</label>
            <input
              type="text"
              {...register("senderAdress")}
              className="input w-full"
              placeholder="Sender Address"
            />
            {/* sender phone */}
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
            {/* receiver name */}
            <label className="label">Receiver Name</label>
            <input
              type="text"
              {...register("receiverName")}
              className="input w-full"
              placeholder="Receiver Name"
            />
            {/* receiver region */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Receiver Regions</legend>
              <select
                {...register("receiverRegion")}
                defaultValue=""
                className="select w-full"
              >
                <option value="" disabled={true}>
                  Pick a region
                </option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* receiver districts */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Receiver Districts</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue=""
                className="select w-full"
              >
                <option value="" disabled={true}>
                  Pick a district
                </option>
                {districtsByRegion(receiverRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* receiver address */}
            <label className="label mt-4">Receiver Address</label>
            <input
              type="text"
              {...register("receiverAdress")}
              className="input w-full"
              placeholder="Receiver Address"
            />
            {/* receiver phone */}
            <label className="label mt-4">Receiver Phone Number</label>
            <input
              type="number"
              {...register("receiverPhoneNumber")}
              className="input w-full"
              placeholder="Receiver Phone Number"
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
