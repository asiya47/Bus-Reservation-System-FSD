import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import API from "../services/api";
import toast from "react-hot-toast";
function EditBus() {
  const navigate = useNavigate();
  const location = useLocation();

  const bus = location.state?.bus;

  // Hooks must always be called before any return
  const [formData, setFormData] = useState({
    busName: bus?.busName || "",
    busNumber: bus?.busNumber || "",
    from: bus?.from || "",
    to: bus?.to || "",
    departureTime: bus?.departureTime || "",
    arrivalTime: bus?.arrivalTime || "",
    price: bus?.price || "",
    totalSeats: bus?.totalSeats || "",
  });

  // If no bus was passed
  if (!bus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600">
          Bus Not Found
        </h1>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateBus = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put(`/bus/${bus._id}`, {
        ...formData,
        price: Number(formData.price),
        totalSeats: Number(formData.totalSeats),
      });

      toast.success(res.data.message);

      navigate("/admin/all-buses");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Unable to update bus");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-10">
      <form
        onSubmit={updateBus}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl"
      >
        <h1 className="text-3xl font-bold text-center mb-8">
          Edit Bus
        </h1>

        <input
          type="text"
          name="busName"
          value={formData.busName}
          onChange={handleChange}
          placeholder="Bus Name"
          className="border w-full p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="busNumber"
          value={formData.busNumber}
          onChange={handleChange}
          placeholder="Bus Number"
          className="border w-full p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="from"
          value={formData.from}
          onChange={handleChange}
          placeholder="From"
          className="border w-full p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="to"
          value={formData.to}
          onChange={handleChange}
          placeholder="To"
          className="border w-full p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="departureTime"
          value={formData.departureTime}
          onChange={handleChange}
          placeholder="Departure Time"
          className="border w-full p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          name="arrivalTime"
          value={formData.arrivalTime}
          onChange={handleChange}
          placeholder="Arrival Time"
          className="border w-full p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border w-full p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          name="totalSeats"
          value={formData.totalSeats}
          onChange={handleChange}
          placeholder="Total Seats"
          className="border w-full p-3 rounded-lg mb-6"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
        >
          Update Bus
        </button>
      </form>
    </div>
  );
}

export default EditBus;