import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
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

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  // explore useMemo useCallback
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    console.log("cost", cost);

    Swal.fire({
      title: "Are you agree with the cost ?",
      text: `You wil be charged ${cost} Taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel into the databse
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving parcel", res.data);
        });
      }
    });
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
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="sender name"
            />
            {/* sender email */}
            <label className="label">Sender Email</label>
            <input
              type="email"
              {...register("senderEmail")}
              defaultValue={user?.email}
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
            <label className="label mt-4">Pickup Instruction</label>
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

            {/*  receiver Region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Reciever Region</legend>
              <select
                {...register("receiverRegion")}
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
            {/*  receiver districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Reciever Districts</legend>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a districts"
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtsByRegion(receiverRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* receiver address */}
            <label className="label mt-4">Address</label>
            <input
              type="text"
              {...register("receiverAddress")}
              className="input w-full"
              placeholder="receiver address"
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
          className="btn btn-primary mt-8 text-black"
        />
      </form>
    </div>
  );
};

export default SendParcel;
