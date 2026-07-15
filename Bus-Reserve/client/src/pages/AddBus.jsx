import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
function AddBus() {
  const [formData, setFormData] = useState({
    busName: "",
    busNumber: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    totalSeats: 25,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addBus = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/bus/add", formData);

      toast.success(res.data.message);

      setFormData({
        busName: "",
        busNumber: "",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        price: "",
        totalSeats: 25,
        busType: "AC Sleeper",
        rating: 4.5,
        amenities: "WiFi,Charging Point,Water Bottle",
      });

    } catch (err) {
      console.log(err);
      toast.error(
err.response?.data?.message ||
"Unable to add bus"
);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center py-10">
      <form
        onSubmit={addBus}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          ➕ Add New Bus
        </h1>

        <input
          type="text"
          name="busName"
          placeholder="Bus Name"
          value={formData.busName}
          onChange={handleChange}
          className="border w-full p-3 rounded-lg mb-4"
          required
        />

        <input
          type="text"
          name="busNumber"
          placeholder="Bus Number"
          value={formData.busNumber}
          onChange={handleChange}
          className="border w-full p-3 rounded-lg mb-4"
          required
        />

        <input
          type="text"
          name="from"
          placeholder="From"
          value={formData.from}
          onChange={handleChange}
          className="border w-full p-3 rounded-lg mb-4"
          required
        />

        <input
          type="text"
          name="to"
          placeholder="To"
          value={formData.to}
          onChange={handleChange}
          className="border w-full p-3 rounded-lg mb-4"
          required
        />

        <input
          type="text"
          name="departureTime"
          placeholder="Departure Time (e.g. 09:30 AM)"
          value={formData.departureTime}
          onChange={handleChange}
          className="border w-full p-3 rounded-lg mb-4"
          required
        />

        <input
          type="text"
          name="arrivalTime"
          placeholder="Arrival Time (e.g. 06:00 PM)"
          value={formData.arrivalTime}
          onChange={handleChange}
          className="border w-full p-3 rounded-lg mb-4"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border w-full p-3 rounded-lg mb-4"
          required
        />

        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          value={formData.totalSeats}
          onChange={handleChange}
          className="border w-full p-3 rounded-lg mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold"
        >
          Add Bus
        </button>
        <select
            name="busType"
            value={formData.busType}
            onChange={handleChange}
            className="border w-full p-3 rounded-lg mb-4"
          >
            <option>AC Sleeper</option>
            <option>Non AC</option>
            <option>Volvo</option>
            <option>Express</option>
</select>
      </form>
    </div>
  );
}

export default AddBus;