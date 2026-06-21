import React, { useEffect, useState } from "react"; // useState এবং useEffect নেওয়া হয়েছে
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";
// import { useLoaderData } from "react-router"; // ❌ এই লাইনটি কেটে দাও
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      region: "",
      district: "",
    },
  });

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  // 📄useLoaderData বদলে useState ব্যবহার করো
  const [serviceCenters, setServiceCenters] = useState([]);

  // 📄 পেজ লোড হলেই পাবলিক ফোল্ডার থেকে ডাটা নিয়ে আসবে
  useEffect(() => {
    fetch("/servicecenter.json") // একদম শুরুতে '/' দিতে ভুলো না
      .then((res) => res.json())
      .then((data) => setServiceCenters(data))
      .catch((err) => console.error("JSON লোড করতে সমস্যা হয়েছে:", err));
  }, []);

  // Unique regions
  const regions = [...new Set(serviceCenters.map((c) => c.region))];

  // watch region
  const selectedRegion = useWatch({ control, name: "region" });

  // reset district when region changes
  useEffect(() => {
    resetField("district");
  }, [selectedRegion, resetField]);

  // district filter
  const districtsByRegion = (region) => {
    if (!region) return [];
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    return [...new Set(regionDistricts.map((d) => d.district))];
  };

  // submit handler
  const handleRiderApplication = async (data) => {
    const riderData = {
      ...data,
      name: user?.displayName,
      email: user?.email,
    };

    try {
      const res = await axiosSecure.post("/riders", riderData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your rider application has been sent successfully.",
          confirmButtonColor: "#16a34a",
        });
        reset(); 
      } else if (res.data.message === "already applied") {
        Swal.fire({
          icon: "warning",
          title: "Already Applied!",
          text: "You have already submitted a rider application.",
          confirmButtonColor: "#eab308",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mt-6">Rider Application</h2>

      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="mt-10 p-6 bg-base-100 shadow-xl rounded-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT SIDE */}
          <fieldset>
            <h4 className="text-xl font-semibold mb-4">Personal Details</h4>

            {/* Name */}
            <label>Name</label>
            <input
              {...register("name", { required: true })}
              defaultValue={user?.displayName}
              className="input w-full border p-2 rounded mt-1"
            />
            {errors.name && <p className="text-red-500">Name is required</p>}

            {/* Email */}
            <label className="mt-3 block">Email</label>
            <input
              {...register("email", { required: true })}
              defaultValue={user?.email}
              className="input w-full border p-2 rounded mt-1"
              readOnly
            />

            {/* Region */}
            <label className="mt-3 block">Region</label>
            <select
              {...register("region", { required: true })}
              className="select w-full border p-2 rounded mt-1"
            >
              <option value="">Select Region</option>
              {regions.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>

            {/* District */}
            <label className="mt-3 block">District</label>
            <select
              {...register("district", { required: true })}
              className="select w-full border p-2 rounded mt-1"
            >
              <option value="">Select District</option>
              {districtsByRegion(selectedRegion).map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {/* Address */}
            <label className="mt-3 block">Address</label>
            <input
              {...register("address", { required: true })}
              className="input w-full border p-2 rounded mt-1"
              placeholder="Your Address"
            />
          </fieldset>

          {/* RIGHT SIDE */}
          <fieldset>
            <h4 className="text-xl font-semibold mb-4">Professional Info</h4>

            {/* License */}
            <label>Driving License</label>
            <input
              {...register("license", { required: true })}
              className="input w-full border p-2 rounded mt-1"
            />

            {/* NID */}
            <label className="mt-3 block">NID</label>
            <input
              {...register("nid", { required: true })}
              className="input w-full border p-2 rounded mt-1"
            />

            {/* Bike */}
            <label className="mt-3 block">Bike Info</label>
            <input
              {...register("bike", { required: true })}
              className="input w-full border p-2 rounded mt-1"
            />

            {/* Phone */}
            <label className="mt-3 block">Phone Number</label>
            <input
              type="tel"
              {...register("phone", {
                required: true,
                pattern: /^(01[3-9]\d{8})$/,
              })}
              className="input w-full border p-2 rounded mt-1"
              placeholder="01XXXXXXXXX"
            />
            {errors.phone && (
              <p className="text-red-500">Invalid phone number</p>
            )}
          </fieldset>
        </div>

        {/* Submit */}
        <div className="text-center mt-8">
          <button className="btn btn-primary px-10 text-white bg-blue-600 p-3 rounded font-bold">
            Apply as Rider
          </button>
        </div>
      </form>
    </div>
  );
};

export default Rider;