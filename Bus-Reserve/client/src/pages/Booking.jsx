import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

import SeatLayout from "../components/SeatLayout";
import BookingSummary from "../components/BookingSummary";

import toast from "react-hot-toast";
import {
  Bus,
  MapPin,
  Clock,
  Phone,
  CalendarDays,
} from "lucide-react";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const bus = location.state?.bus;

  const [passengerName, setPassengerName] = useState("");
  const [passengerAge, setPassengerAge] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [journeyDate, setJourneyDate] = useState(
    location.state?.journeyDate || ""
  );

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [seatsLoading, setSeatsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please Login First");
      navigate("/login");
    }
  }, [navigate]);

  // Seat availability is date-specific — fetch which seats are
  // already booked on this bus for the currently selected date.
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!bus?._id || !journeyDate) {
        if (!cancelled) {
          setBookedSeats([]);
          setSelectedSeat(null);
        }
        return;
      }

      try {
        setSeatsLoading(true);
        setSelectedSeat(null);

        const res = await API.get(
          `/bus/${bus._id}/seats?date=${encodeURIComponent(journeyDate)}`
        );

        if (!cancelled) {
          setBookedSeats(res.data?.bookedSeats || []);
        }
      } catch (err) {
        console.log(err);
        if (!cancelled) setBookedSeats([]);
      } finally {
        if (!cancelled) setSeatsLoading(false);
      }
    };

    // Defer to a microtask so none of the setState calls above run
    // synchronously within the effect body itself.
    Promise.resolve().then(run);

    return () => {
      cancelled = true;
    };
  }, [bus?._id, journeyDate]);

  if (!bus) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl font-[var(--font-display)] font-bold text-[var(--color-rust)]">
          No Bus Selected
        </h1>
      </div>
    );
  }

  const todayStr = new Date().toISOString().split("T")[0];

  const bookTicket = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (
      !passengerName ||
      !passengerAge ||
      !passengerPhone ||
      !journeyDate ||
      !selectedSeat
    ) {
      toast.error("Please fill all details.");
      return;
    }

    try {
      const response = await API.post(
        "/booking/book",
        {
          userId,
          busId: bus._id,
          passengerName,
          passengerAge,
          phone: passengerPhone,
          seatNumber: selectedSeat,
          journeyDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      navigate("/payment", {
        state: {
          booking: response.data.booking,
          bus,
          journeyDate,
        },
      });
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
        "Booking Failed"
      );
    }
  };
  return (
  <div className="min-h-screen bg-[var(--color-paper)] pt-28 pb-10 px-5">

    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

      {/* LEFT */}

      <div className="lg:col-span-2">

        {/* Bus Card */}

        <div className="bg-[var(--color-navy)] text-white rounded-3xl shadow-xl p-8">

          <div className="flex justify-between items-start">

            <div>

              <h1 className="text-3xl font-[var(--font-display)] font-bold flex items-center gap-2">
                <Bus />
                {bus.busName}
              </h1>

              <p className="mt-2 text-slate-300 font-ticket text-sm">
                Bus No : {bus.busNumber}
              </p>

            </div>

            <div className="text-right">

              <h2 className="text-3xl font-[var(--font-display)] font-bold text-[var(--color-marigold)]">
                ₹ {bus.price}
              </h2>

              <p className="text-slate-300">
                Per Seat
              </p>

            </div>

          </div>

          <hr className="my-6 border-white/15"/>

          <div className="grid md:grid-cols-3 gap-5">

            <div>

              <p className="flex items-center gap-2 mb-3">
                <MapPin size={18} className="text-[var(--color-marigold)]"/>
                <strong>From :</strong>
                {bus.from}
              </p>

              <p className="flex items-center gap-2">
                <Clock size={18} className="text-[var(--color-marigold)]"/>
                <strong>Departure :</strong>
                {bus.departureTime}
              </p>

            </div>

            <div>

              <p className="flex items-center gap-2 mb-3">
                <MapPin size={18} className="text-[var(--color-marigold)]"/>
                <strong>To :</strong>
                {bus.to}
              </p>

              <p className="flex items-center gap-2">
                <Clock size={18} className="text-[var(--color-marigold)]"/>
                <strong>Arrival :</strong>
                {bus.arrivalTime}
              </p>

            </div>

            <div>

              <p className="flex items-center gap-2 mb-3">
                <CalendarDays size={18} className="text-[var(--color-marigold)]"/>
                <strong>Date :</strong>
                {journeyDate
                  ? new Date(journeyDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Not selected"}
              </p>

            </div>

          </div>

        </div>

        {/* Passenger Card */}

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mt-8">

          <h2 className="text-2xl font-[var(--font-display)] font-bold mb-6 text-[var(--color-navy)]">
            Passenger Details
          </h2>

          <input
            type="text"
            placeholder="Passenger Name"
            value={passengerName}
            onChange={(e)=>setPassengerName(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-4 mb-5 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)]"
          />

          <div className="grid md:grid-cols-2 gap-5 mb-5">

            <input
              type="number"
              placeholder="Passenger Age"
              value={passengerAge}
              onChange={(e)=>setPassengerAge(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)]"
            />

            <div className="relative">

              <CalendarDays
                className="absolute left-4 top-4 text-slate-400"
                size={20}
              />

              <input
                type="date"
                min={todayStr}
                value={journeyDate}
                onChange={(e)=>setJourneyDate(e.target.value)}
                className="w-full border border-slate-200 rounded-xl pl-12 p-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)] text-slate-600"
              />

            </div>

          </div>

          <div className="relative">

            <Phone
              className="absolute left-4 top-4 text-slate-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={passengerPhone}
              onChange={(e)=>setPassengerPhone(e.target.value)}
              className="w-full border border-slate-200 rounded-xl pl-12 p-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)]"
            />

          </div>

        </div>

        {/* Seat Section */}

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mt-8">

          <h2 className="text-2xl font-[var(--font-display)] font-bold mb-6 text-[var(--color-navy)]">
            Select Your Seat
          </h2>

          {!journeyDate ? (

            <p className="text-center text-[var(--color-slate)] py-10">
              Please choose a journey date above to view seat availability.
            </p>

          ) : seatsLoading ? (

            <p className="text-center text-[var(--color-slate)] py-10">
              Checking seat availability for{" "}
              {new Date(journeyDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
              ...
            </p>

          ) : (

            <SeatLayout
              totalSeats={bus.totalSeats}
              selectedSeat={selectedSeat}
              setSelectedSeat={setSelectedSeat}
              bookedSeats={bookedSeats}
            />

          )}

        </div>

      </div>

      {/* RIGHT */}

      <div>

       <BookingSummary
          bus={bus}
          selectedSeat={selectedSeat}
          passengerName={passengerName}
          journeyDate={journeyDate}
          onConfirm={bookTicket}
        />

      </div>

    </div>

  </div>
);
}

export default Booking;
