import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AllBuses() {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  const loadBuses = async () => {
    try {
      const res = await API.get("/bus");
      setBuses(res.data.buses || []);
    } catch (err) {
      console.log(err);
      alert("Unable to load buses");
    }
  };

  useEffect(() => {
  (async () => {
    try {
      const res = await API.get("/bus");
      setBuses(res.data.buses || []);
    } catch (err) {
      console.log(err);
      alert("Unable to load buses");
    }
  })();
}, []);

  const deleteBus = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bus?"
    );

    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/bus/${id}`);

      alert(res.data.message);

      loadBuses();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Unable to delete bus");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        🚌 All Buses
      </h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4">Bus Name</th>
              <th>Bus Number</th>
              <th>Route</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Price</th>
              <th>Seats</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {buses.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-6">
                  No Buses Found
                </td>
              </tr>
            ) : (
              buses.map((bus) => (
                <tr
                  key={bus._id}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="p-4">{bus.busName}</td>

                  <td>{bus.busNumber}</td>

                  <td>
                    {bus.from} → {bus.to}
                  </td>

                  <td>{bus.departureTime}</td>

                  <td>{bus.arrivalTime}</td>

                  <td>₹ {bus.price}</td>

                  <td>
                    {bus.availableSeats}/{bus.totalSeats}
                  </td>

                  <td>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          navigate(`/admin/edit-bus/${bus._id}`, {
                            state: { bus },
                          })
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteBus(bus._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => navigate(`/admin/passengers/${bus._id}`)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                      >
                        Passengers
                      </button>

                      <button
                        onClick={() => navigate(`/admin/passengers/${bus._id}`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                        Passengers
                        </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllBuses;