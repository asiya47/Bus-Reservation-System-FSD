import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

import {
  Bus,
  Users,
  Ticket,
  IndianRupee,
  PlusCircle,
  List,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalBuses: 0,
    totalBookings: 0,
    totalPassengers: 0,
    revenue: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await API.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-blue-700 text-white p-8">

        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

      </div>

      <div className="max-w-7xl mx-auto py-10 px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl shadow p-6">

            <Bus size={40} className="text-blue-600"/>

            <h2 className="text-gray-500 mt-4">
              Total Buses
            </h2>

            <h1 className="text-4xl font-bold">
              {stats.totalBuses}
            </h1>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <Ticket size={40} className="text-green-600"/>

            <h2 className="text-gray-500 mt-4">
              Total Bookings
            </h2>

            <h1 className="text-4xl font-bold">
              {stats.totalBookings}
            </h1>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <Users size={40} className="text-orange-600"/>

            <h2 className="text-gray-500 mt-4">
              Passengers
            </h2>

            <h1 className="text-4xl font-bold">
              {stats.totalPassengers}
            </h1>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <IndianRupee size={40} className="text-red-600"/>

            <h2 className="text-gray-500 mt-4">
              Revenue
            </h2>

            <h1 className="text-4xl font-bold">
              ₹ {stats.revenue}
            </h1>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <button
            onClick={() => navigate("/admin/add-bus")}
            className="bg-blue-600 text-white rounded-xl p-8 hover:bg-blue-700"
          >
            <PlusCircle size={40} className="mx-auto"/>

            <h2 className="text-2xl font-bold mt-4">
              Add New Bus
            </h2>

          </button>

          <button
            onClick={() => navigate("/admin/all-buses")}
            className="bg-green-600 text-white rounded-xl p-8 hover:bg-green-700"
          >
            <List size={40} className="mx-auto"/>

            <h2 className="text-2xl font-bold mt-4">
              Manage Buses
            </h2>

          </button>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;