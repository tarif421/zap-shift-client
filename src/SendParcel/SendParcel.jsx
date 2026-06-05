import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hook/useAxiosSecure";
import useAuth from "../Hook/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

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
    const isDocument = data.parcelType === "document";
    //  price calculation
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight) || 0;

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;

        const perKgExtraCharge = isSameDistrict ? 40 : 60;
        const extraCharge = extraWeight * perKgExtraCharge;

        cost = minCharge + extraCharge;
      }
    }
    //  sending cost to database
    data.cost = cost;

    // console.log("Calculated Cost:", cost);
    // return cost;
    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Agree!",
    }).then((result) => {
      if (result.isConfirmed)
        // save the parcel info to the database
        axiosSecure.post("/parcel", data).then((res) => {
          // console.log("after saving parcel", res.data);
          if (res.data.insertedId) {
            navigate('/dashboard/my-parcels')
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Parcel has created . Please Pay",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });

      // Swal.fire({
      //   title: "Parcel placed!",
      //   icon: "success",
      // });
    });
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
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Sender Name"
            />
            {/* sender email */}
            <label className="label">Sender Email</label>
            <input
              type="text"
              {...register("senderEmail")}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="Sender Email"
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
            {/* sender email */}
            <label className="label">Receiver Email</label>
            <input
              type="text"
              {...register("receiverEmail")}
              className="input w-full"
              placeholder="Receiver Email"
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
