import {
  Bus,
  MapPin,
  Armchair,
  IndianRupee,
  User,
  CalendarDays,
} from "lucide-react";

function BookingSummary({
  bus,
  selectedSeat,
  passengerName,
  journeyDate,
  onConfirm,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sticky top-24">

      <h2 className="text-2xl font-[var(--font-display)] font-bold mb-6 text-center text-[var(--color-navy)]">
        📋 Booking Summary
      </h2>

      <div className="space-y-5">

        <div className="flex items-center gap-3">
          <Bus className="text-[var(--color-teal)]" />
          <div>
            <p className="text-[var(--color-slate)] text-sm">Bus</p>
            <h3 className="font-bold text-[var(--color-navy)]">{bus.busName}</h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="text-[var(--color-marigold)]" />
          <div>
            <p className="text-[var(--color-slate)] text-sm">Route</p>
            <h3 className="text-[var(--color-navy)]">
              {bus.from} → {bus.to}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CalendarDays className="text-[var(--color-teal)]" />
          <div>
            <p className="text-[var(--color-slate)] text-sm">Journey Date</p>
            <h3 className="text-[var(--color-navy)]">
              {journeyDate
                ? new Date(journeyDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "--"}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <User className="text-[var(--color-teal)]" />
          <div>
            <p className="text-[var(--color-slate)] text-sm">Passenger</p>
            <h3 className="text-[var(--color-navy)]">{passengerName || "--"}</h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Armchair className="text-[var(--color-marigold)]" />
          <div>
            <p className="text-[var(--color-slate)] text-sm">Seat Number</p>
            <h3 className="text-[var(--color-navy)] font-bold text-xl">
              {selectedSeat || "--"}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <IndianRupee className="text-[var(--color-teal)]" />
          <div>
            <p className="text-[var(--color-slate)] text-sm">Ticket Fare</p>
            <h2 className="text-3xl font-[var(--font-display)] font-bold text-[var(--color-teal)]">
              ₹ {bus.price}
            </h2>
          </div>
        </div>

      </div>

      <button
        onClick={onConfirm}
        className="w-full mt-8 bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-white py-4 rounded-xl text-lg font-bold transition-all duration-300"
      >
        ✅ Confirm Booking
      </button>

    </div>
  );
}

export default BookingSummary;
