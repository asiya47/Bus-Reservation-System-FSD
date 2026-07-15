import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { Bus, MapPin, User, Armchair, IndianRupee, Calendar, CalendarDays } from "lucide-react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await API.get(
        `/booking/my-bookings?userId=${userId}`
      );

      setBookings(res.data.bookings || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Defer to a microtask so the setState call inside fetchBookings
    // doesn't run synchronously within the effect body itself.
    Promise.resolve().then(() => fetchBookings());
  }, []);

  const cancelBooking = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      await API.delete(`/booking/cancel/${id}`);

      toast.success("Booking Cancelled");

      fetchBookings();
    } catch (err) {
      console.log(err);
      toast.error("Unable to cancel booking");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)] py-10 px-6 pt-28">

      <h1 className="text-4xl font-[var(--font-display)] font-bold text-center mb-10 text-[var(--color-navy)]">
        🚌 My Bookings
      </h1>

      <div className="max-w-6xl mx-auto">

        {bookings.length === 0 ? (

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-10 text-center">

            <h2 className="text-2xl font-[var(--font-display)] font-bold text-[var(--color-slate)]">
              No Bookings Found
            </h2>

          </div>

        ) : (

          bookings.map((booking) => {

            const busMissing = !booking.bus;

            return (

            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 hover:shadow-lg transition"
            >

              {/* Bus Name */}

              <div className="flex justify-between items-center mb-6">

                <div>

                  <h2 className="text-3xl font-[var(--font-display)] font-bold text-[var(--color-navy)] flex items-center gap-2">

                    <Bus />

                    {busMissing ? "Bus No Longer Available" : booking.bus?.busName}

                  </h2>

                  <p className="text-[var(--color-slate)] mt-2 font-ticket text-sm">
                    Booking ID : {booking._id}
                  </p>

                </div>

                <span
                  className={
                    busMissing
                      ? "bg-[var(--color-rust)]/10 text-[var(--color-rust)] px-4 py-2 rounded-full font-semibold"
                      : "bg-[var(--color-teal)]/10 text-[var(--color-teal)] px-4 py-2 rounded-full font-semibold"
                  }
                >
                  {busMissing ? "Unavailable" : "Confirmed"}
                </span>

              </div>

              <hr className="mb-6 border-slate-200" />

              {busMissing ? (

                <p className="text-[var(--color-slate)] mb-6">
                  The bus for this booking is no longer in our system
                  (it may have been removed or updated by the operator).
                  You can still cancel this booking below.
                </p>

              ) : (

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <p className="flex items-center gap-2 mb-3">
                    <MapPin className="text-[var(--color-marigold)]" size={20} />
                    <strong>Route:</strong>
                    {booking.bus?.from} → {booking.bus?.to}
                  </p>

                  <p className="flex items-center gap-2 mb-3">
                    <Calendar className="text-[var(--color-teal)]" size={20} />
                    <strong>Departure:</strong>
                    {booking.bus?.departureTime}
                  </p>

                  <p className="flex items-center gap-2 mb-3">
                    <Calendar className="text-[var(--color-teal)]" size={20} />
                    <strong>Arrival:</strong>
                    {booking.bus?.arrivalTime}
                  </p>

                  {booking.journeyDate && (
                    <p className="flex items-center gap-2">
                      <CalendarDays className="text-[var(--color-teal)]" size={20} />
                      <strong>Journey Date:</strong>
                      {new Date(booking.journeyDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}

                </div>

                <div>

                  <p className="flex items-center gap-2 mb-3">
                    <User className="text-[var(--color-teal)]" size={20} />
                    <strong>Passenger:</strong>
                    {booking.passengerName}
                  </p>

                  <p className="flex items-center gap-2 mb-3">
                    <Armchair className="text-[var(--color-marigold)]" size={20} />
                    <strong>Seat:</strong>
                    {booking.seatNumber}
                  </p>

                  <p className="flex items-center gap-2 text-[var(--color-teal)] font-bold">
                    <IndianRupee size={20} />
                    {booking.bus?.price}
                  </p>

                </div>

              </div>

              )}

              <div className="flex gap-4 mt-8">

                {!busMissing && (
                  <button
                    onClick={() =>
                      navigate("/ticket", {
                        state: {
                          ...booking,
                          bus: booking.bus,
                        },
                      })
                    }
                    className="flex-1 bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-white py-3 rounded-xl font-semibold transition"
                  >
                    📄 View / Download Ticket
                  </button>
                )}

                <button
                  onClick={() => cancelBooking(booking._id)}
                  className="flex-1 bg-[var(--color-rust)] hover:opacity-90 text-white py-3 rounded-xl font-semibold transition"
                >
                  ❌ Cancel Booking
                </button>

              </div>

            </div>

            );
          })

        )}

      </div>

    </div>
  );
}

export default MyBookings;
