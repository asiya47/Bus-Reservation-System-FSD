import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { CalendarDays } from "lucide-react";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const { booking, bus, journeyDate } = location.state || {};

  const [method, setMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  if (!booking || !bus) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-[var(--font-display)] font-bold text-[var(--color-navy)]">
          Payment Details Not Found
        </h1>
      </div>
    );
  }

  const tripDate = journeyDate || booking.journeyDate;

  const payNow = () => {
    setLoading(true);

    setTimeout(() => {
      toast.success("Payment Successful");

      navigate("/ticket", {
        state: {
          ...booking,
          bus,
          journeyDate: tripDate,
        },
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)] flex justify-center items-center p-6 pt-28">

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 w-full max-w-xl p-8">

        <h1 className="text-3xl font-[var(--font-display)] font-bold text-center mb-8 text-[var(--color-navy)]">
          💳 Payment
        </h1>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span className="text-[var(--color-slate)]">Passenger</span>
            <span className="text-[var(--color-navy)] font-medium">{booking.passengerName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[var(--color-slate)]">Bus</span>
            <span className="text-[var(--color-navy)] font-medium">{bus.busName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[var(--color-slate)]">Seat</span>
            <span className="text-[var(--color-navy)] font-medium">{booking.seatNumber}</span>
          </div>

          {tripDate && (
            <div className="flex justify-between">
              <span className="text-[var(--color-slate)] flex items-center gap-2">
                <CalendarDays size={16} />
                Journey Date
              </span>
              <span className="text-[var(--color-navy)] font-medium">
                {new Date(tripDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          )}

          <div className="flex justify-between text-2xl font-[var(--font-display)] font-bold">
            <span className="text-[var(--color-navy)]">Total</span>
            <span className="text-[var(--color-teal)]">
              ₹ {bus.price}
            </span>
          </div>

        </div>

        <hr className="my-8 border-slate-200" />

        <h2 className="font-[var(--font-display)] font-bold text-xl mb-4 text-[var(--color-navy)]">
          Select Payment Method
        </h2>

        <div className="space-y-4">

          <label className="flex items-center gap-3 text-slate-700">
            <input
              type="radio"
              checked={method === "UPI"}
              onChange={() => setMethod("UPI")}
              className="accent-[var(--color-teal)]"
            />
            UPI
          </label>

          <label className="flex items-center gap-3 text-slate-700">
            <input
              type="radio"
              checked={method === "Debit Card"}
              onChange={() => setMethod("Debit Card")}
              className="accent-[var(--color-teal)]"
            />
            Debit Card
          </label>

          <label className="flex items-center gap-3 text-slate-700">
            <input
              type="radio"
              checked={method === "Credit Card"}
              onChange={() => setMethod("Credit Card")}
              className="accent-[var(--color-teal)]"
            />
            Credit Card
          </label>

          <label className="flex items-center gap-3 text-slate-700">
            <input
              type="radio"
              checked={method === "Net Banking"}
              onChange={() => setMethod("Net Banking")}
              className="accent-[var(--color-teal)]"
            />
            Net Banking
          </label>

        </div>

        <button
          onClick={payNow}
          disabled={loading}
          className="mt-10 w-full bg-[var(--color-marigold)] hover:bg-[var(--color-marigold-light)] disabled:opacity-70 text-[var(--color-navy)] py-4 rounded-xl text-xl font-bold transition"
        >
          {loading ? "Processing Payment..." : "Pay Now"}
        </button>

      </div>

    </div>
  );
}

export default Payment;
