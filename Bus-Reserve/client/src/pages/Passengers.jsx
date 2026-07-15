import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function Passengers() {
  const { id } = useParams();

  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const loadPassengers = async () => {
      try {
        const res = await API.get(`/bus/${id}/passengers`);
        setPassengers(res.data.passengers);
      } catch (err) {
        console.log(err);
        alert("Unable to load passengers");
      }
    };

    loadPassengers();
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          👥 Passenger List
        </h1>

        <Link
          to="/admin/all-buses"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Back
        </Link>

      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-4">Seat</th>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
            </tr>

          </thead>

          <tbody>

            {passengers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-8">
                  No Passengers
                </td>
              </tr>
            ) : (
              passengers.map((p, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">{p.seatNumber}</td>
                  <td>{p.passengerName}</td>
                  <td>{p.passengerAge}</td>
                  <td>{p.phone || "-"}</td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Passengers;