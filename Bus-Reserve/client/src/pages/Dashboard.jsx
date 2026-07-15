import { useNavigate } from "react-router-dom";
import {
  Search,
  Ticket,
  LogOut,
  User,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">

      {/* Header */}

      <div className="bg-[var(--color-navy)] text-white py-10 pt-32 shadow-lg">

        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-4xl font-[var(--font-display)] font-bold">
            Passenger Dashboard
          </h1>

          <p className="mt-2 text-slate-300">
            Welcome back,
            {" "}
            <span className="font-semibold text-[var(--color-marigold)]">
              {user?.name || "Passenger"}
            </span>
            {" "}👋
          </p>

        </div>

      </div>

      {/* Cards */}

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Profile */}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            <User
              size={45}
              className="text-[var(--color-teal)]"
            />

            <h2 className="text-xl font-[var(--font-display)] font-bold mt-4 text-[var(--color-navy)]">
              My Profile
            </h2>

            <p className="text-[var(--color-slate)] mt-2">
              {user?.email}
            </p>

          </div>

          {/* Search */}

          <div
            onClick={() => navigate("/search")}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition"
          >

            <Search
              size={45}
              className="text-[var(--color-teal)]"
            />

            <h2 className="text-xl font-[var(--font-display)] font-bold mt-4 text-[var(--color-navy)]">
              Search Buses
            </h2>

            <p className="text-[var(--color-slate)] mt-2">
              Find available buses
            </p>

          </div>

          {/* My Bookings */}

          <div
            onClick={() => navigate("/my-bookings")}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition"
          >

            <Ticket
              size={45}
              className="text-[var(--color-marigold)]"
            />

            <h2 className="text-xl font-[var(--font-display)] font-bold mt-4 text-[var(--color-navy)]">
              My Bookings
            </h2>

            <p className="text-[var(--color-slate)] mt-2">
              View booked tickets
            </p>

          </div>

          {/* Logout */}

          <div
            onClick={logout}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition"
          >

            <LogOut
              size={45}
              className="text-[var(--color-rust)]"
            />

            <h2 className="text-xl font-[var(--font-display)] font-bold mt-4 text-[var(--color-navy)]">
              Logout
            </h2>

            <p className="text-[var(--color-slate)] mt-2">
              Sign out safely
            </p>

          </div>

        </div>

        {/* Journey Card */}

        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

          <h2 className="text-2xl font-[var(--font-display)] font-bold mb-4 text-[var(--color-navy)]">
            Ready for your next trip? 🚌
          </h2>

          <p className="text-[var(--color-slate)] mb-6">
            Search for buses, book your seats, and download your tickets instantly.
          </p>

          <button
            onClick={() => navigate("/search")}
            className="bg-[var(--color-teal)] hover:bg-[var(--color-teal-dark)] text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Search Buses
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
