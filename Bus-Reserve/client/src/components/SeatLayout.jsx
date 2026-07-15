import Seat from "./Seat";
import Driver from "./Driver";
import Legend from "./Legend";

function SeatLayout({
  selectedSeat,
  setSelectedSeat,
  bookedSeats = [],
  totalSeats = 36,
}) {
  const isBooked = (seat) => bookedSeats.includes(seat);

  const rows = [];

  let seatNo = 1;

  while (seatNo <= totalSeats) {
    rows.push([
      seatNo,
      seatNo + 1,
      seatNo + 2,
      seatNo + 3,
    ]);

    seatNo += 4;
  }

  return (
    <div className="mt-8">

      <Legend />

      <Driver />

      <div className="border-4 border-slate-200 rounded-3xl bg-[var(--color-paper)] p-6 max-w-md mx-auto shadow-sm">

        {rows.map((row, index) => (

          <div
            key={index}
            className="flex justify-between items-center mb-5"
          >

            {/* Left */}

            <div className="flex gap-3">

              {row[0] <= totalSeats && (
                <Seat
                  number={row[0]}
                  booked={isBooked(row[0])}
                  selected={selectedSeat === row[0]}
                  onClick={() => setSelectedSeat(row[0])}
                />
              )}

              {row[1] <= totalSeats && (
                <Seat
                  number={row[1]}
                  booked={isBooked(row[1])}
                  selected={selectedSeat === row[1]}
                  onClick={() => setSelectedSeat(row[1])}
                />
              )}

            </div>

            <div className="w-10"></div>

            {/* Right */}

            <div className="flex gap-3">

              {row[2] <= totalSeats && (
                <Seat
                  number={row[2]}
                  booked={isBooked(row[2])}
                  selected={selectedSeat === row[2]}
                  onClick={() => setSelectedSeat(row[2])}
                />
              )}

              {row[3] <= totalSeats && (
                <Seat
                  number={row[3]}
                  booked={isBooked(row[3])}
                  selected={selectedSeat === row[3]}
                  onClick={() => setSelectedSeat(row[3])}
                />
              )}

            </div>

          </div>

        ))}

      </div>

      <h2 className="text-center mt-8 text-xl font-[var(--font-display)] font-bold text-[var(--color-navy)]">
        Selected Seat :
        <span className="text-[var(--color-teal)] ml-2">
          {selectedSeat || "None"}
        </span>
      </h2>

    </div>
  );
}

export default SeatLayout;