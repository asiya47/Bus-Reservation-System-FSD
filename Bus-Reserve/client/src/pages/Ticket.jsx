import { useLocation } from "react-router-dom";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import QRCode from "react-qr-code";
import { CalendarDays } from "lucide-react";

function Ticket() {
  const location = useLocation();
  const booking = location.state;

  const ticketRef = useRef(null);

  if (!booking || !booking.bus) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-[var(--font-display)] font-bold text-[var(--color-navy)]">
          Ticket Not Found
        </h1>
      </div>
    );
  }

  const downloadPDF = async () => {
    const canvas = await html2canvas(ticketRef.current, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.setFillColor(18, 25, 58);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");

    pdf.addImage(
      imgData,
      "PNG",
      10,
      10,
      imgWidth,
      imgHeight
    );

    pdf.save(
      `Ticket_${booking.passengerName}_${booking.seatNumber}.pdf`
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)] flex flex-col justify-center items-center p-6 pt-28">

      <div
        ref={ticketRef}
        className="bg-white rounded-3xl shadow-xl max-w-lg w-full overflow-hidden border border-slate-200"
      >

        {/* Header */}

        <div className="bg-[var(--color-navy)] text-white p-6">

          <h1 className="text-3xl font-[var(--font-display)] font-bold text-center">
            🚌 SMART<span className="text-[var(--color-marigold)]">BUS</span>
          </h1>

          <p className="text-center mt-2 text-lg text-slate-300">
            Electronic Bus Ticket
          </p>

        </div>

        {/* Body */}

        <div className="p-8 space-y-4">

          <h2 className="text-2xl font-[var(--font-display)] font-bold text-center text-[var(--color-navy)]">
            {booking.bus.busName}
          </h2>

          <hr className="border-slate-200" />

          <div className="flex justify-between">
            <span className="font-semibold text-[var(--color-slate)]">
              Passenger
            </span>

            <span className="text-[var(--color-navy)]">
              {booking.passengerName}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-[var(--color-slate)]">
              Age
            </span>

            <span className="text-[var(--color-navy)]">
              {booking.passengerAge}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-[var(--color-slate)]">
              Bus Number
            </span>

            <span className="text-[var(--color-navy)] font-ticket text-sm">
              {booking.bus.busNumber}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-[var(--color-slate)]">
              Route
            </span>

            <span className="text-[var(--color-navy)]">
              {booking.bus.from} → {booking.bus.to}
            </span>
          </div>

          {booking.journeyDate && (
            <div className="flex justify-between">
              <span className="font-semibold text-[var(--color-slate)] flex items-center gap-2">
                <CalendarDays size={16} />
                Journey Date
              </span>

              <span className="text-[var(--color-navy)]">
                {new Date(booking.journeyDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="font-semibold text-[var(--color-slate)]">
              Seat Number
            </span>

            <span className="font-bold text-[var(--color-teal)]">
              {booking.seatNumber}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-[var(--color-slate)]">
              Departure
            </span>

            <span className="text-[var(--color-navy)]">
              {booking.bus.departureTime}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-[var(--color-slate)]">
              Arrival
            </span>

            <span className="text-[var(--color-navy)]">
              {booking.bus.arrivalTime}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-[var(--color-slate)]">
              Total Seats
            </span>

            <span className="text-[var(--color-navy)]">
              {booking.bus.totalSeats}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-[var(--color-slate)]">
              Fare
            </span>

            <span className="font-bold text-[var(--color-teal)]">
              ₹ {booking.bus.price}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-[var(--color-slate)]">
              Ticket Status
            </span>

            <span className="text-[var(--color-teal)] font-bold">
              Confirmed
            </span>
          </div>

          <div className="flex justify-between items-start">
            <span className="font-semibold text-[var(--color-slate)]">
              Booking ID
            </span>

            <span className="text-xs break-all text-right text-[var(--color-navy)] font-ticket">
              {booking._id}
            </span>
          </div>

          <hr className="border-slate-200" />

          {/* QR */}

          <div className="flex flex-col items-center">

            <QRCode
              size={130}
              value={JSON.stringify({
                bookingId: booking._id,
                passenger: booking.passengerName,
                age: booking.passengerAge,
                seat: booking.seatNumber,
                bus: booking.bus.busName,
                busNumber: booking.bus.busNumber,
                route: `${booking.bus.from} - ${booking.bus.to}`,
                journeyDate: booking.journeyDate || null,
                fare: booking.bus.price,
              })}
            />

            <p className="text-[var(--color-slate)] text-sm mt-3">
              Scan to verify ticket
            </p>

          </div>

          <div className="text-center">

            <h2 className="text-3xl font-[var(--font-display)] font-bold text-[var(--color-teal)]">
              ✅ CONFIRMED
            </h2>

          </div>

        </div>

      </div>

      <button
        onClick={downloadPDF}
        className="mt-8 bg-[var(--color-marigold)] hover:bg-[var(--color-marigold-light)] text-[var(--color-navy)] px-8 py-3 rounded-xl font-bold transition"
      >
        📄 Download Ticket PDF
      </button>

    </div>
  );
}

export default Ticket;
