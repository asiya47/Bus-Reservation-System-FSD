import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SearchBus from "./pages/SearchBus";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Ticket from "./pages/Ticket";
import Payment from "./pages/Payment";

import AdminDashboard from "./pages/AdminDashboard";
import AddBus from "./pages/AddBus";
import AllBuses from "./pages/AllBuses";
import EditBus from "./pages/EditBus";
import Passengers from "./pages/Passengers";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<SearchBus />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-bus" element={<AddBus />} />
        <Route path="/admin/all-buses" element={<AllBuses />} />
        <Route path="/admin/edit-bus/:id" element={<EditBus />} />
        <Route path="/admin/passengers/:id" element={<Passengers />} />
      </Routes>
    </>
  );
}

export default App;