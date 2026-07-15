import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { Search, MapPin, CalendarDays, Users2 } from "lucide-react";
import toast from "react-hot-toast";

function SearchBus() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");
  const [date, setDate] = useState(searchParams.get("date") || "");
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchBus = async (fromValue = from, toValue = to, dateValue = date) => {
    try {
      const fromStr = String(fromValue ?? "").trim();
      const toStr = String(toValue ?? "").trim();
      const dateStr = String(dateValue ?? "").trim();

      if (!fromStr || !toStr) {
        toast.error("Enter From and To");
        return;
      }

      setLoading(true);
      setHasSearched(true);

      const res = await API.get(
        `/bus/search?from=${encodeURIComponent(
          fromStr
        )}&to=${encodeURIComponent(toStr)}${
          dateStr ? `&date=${encodeURIComponent(dateStr)}` : ""
        }`
      );

      const busData = res.data?.buses || [];

      setBuses(busData);
    } catch (err) {
      console.error("Search Error:", err);

      setBuses([]);
      setHasSearched(true);

      toast.error(
        err.response?.data?.message || "Unable to search buses."
      );
    } finally {
      setLoading(false);
    }
  };

  // Auto-run the search if we arrived here with from/to already
  // filled in (e.g. from the Popular Routes "Book Now" button),
  // instead of showing "No buses found" until Search is clicked again.
  useEffect(() => {
    const urlFrom = searchParams.get("from");
    const urlTo = searchParams.get("to");
    const urlDate = searchParams.get("date");

    if (urlFrom && urlTo) {
      // Defer to a microtask so the setState calls inside searchBus
      // don't run synchronously within the effect body itself.
      Promise.resolve().then(() => searchBus(urlFrom, urlTo, urlDate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-[var(--color-paper)] pt-28 pb-16 px-6">

      <h1 className="text-4xl font-[var(--font-display)] font-bold text-center text-[var(--color-navy)]">
        Search Buses
      </h1>

      <p className="text-center text-[var(--color-slate)] mt-3 mb-10">
        Find the best bus for your journey.
      </p>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-200">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="flex items-center border border-slate-200 rounded-lg px-3 focus-within:border-[var(--color-teal)] focus-within:ring-2 focus-within:ring-[var(--color-teal)]/20 transition">
            <MapPin size={18} className="text-[var(--color-teal)] shrink-0" />
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="From"
              className="p-3 w-full outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center border border-slate-200 rounded-lg px-3 focus-within:border-[var(--color-teal)] focus-within:ring-2 focus-within:ring-[var(--color-teal)]/20 transition">
            <MapPin size={18} className="text-[var(--color-teal)] shrink-0" />
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="To"
              className="p-3 w-full outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center border border-slate-200 rounded-lg px-3 focus-within:border-[var(--color-teal)] focus-within:ring-2 focus-within:ring-[var(--color-teal)]/20 transition">
            <CalendarDays size={18} className="text-[var(--color-teal)] shrink-0" />
            <input
              type="date"
              min={todayStr}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-3 w-full outline-none text-slate-600"
            />
          </div>

          <button
            onClick={() => searchBus()}
            className="bg-[var(--color-teal)] hover:bg-[var(--color-teal-dark)] text-white rounded-lg flex justify-center items-center gap-2 font-semibold transition"
          >
            <Search size={18} />
            Search
          </button>

        </div>

      </div>

      {loading && (
        <div className="text-center mt-8 text-xl font-semibold text-[var(--color-slate)]">
          Searching buses...
        </div>
      )}

      {!loading && buses.length > 0 && (
        <h2 className="text-center text-[var(--color-teal)] font-[var(--font-display)] font-bold text-xl mt-10">
          {buses.length} Bus(es) Found
          {date && (
            <span className="block text-sm font-[var(--font-body)] font-normal text-[var(--color-slate)] mt-1">
              for {new Date(date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        </h2>
      )}

      {!loading && hasSearched && buses.length === 0 && (
        <h2 className="text-center text-[var(--color-rust)] font-semibold text-xl mt-10">
          No buses found
        </h2>
      )}

      <div className="max-w-5xl mx-auto mt-8">

        {buses.map((bus) => (
          <div
            key={bus._id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 mb-6 border border-slate-200"
          >
            <div className="flex justify-between items-start">

              {/* Left Section */}

              <div className="w-2/3">

                <div className="flex items-center gap-3">

                  <h2 className="text-2xl font-[var(--font-display)] font-bold text-[var(--color-navy)]">
                    🚌 {bus.busName}
                  </h2>

                  <span className="bg-[var(--color-teal)]/10 text-[var(--color-teal)] px-3 py-1 rounded-full text-sm font-semibold">
                    {bus.busType}
                  </span>

                </div>

                <p className="text-[var(--color-slate)] mt-2 font-ticket text-sm">
                  Bus No : {bus.busNumber}
                </p>

                <div className="mt-4 flex items-center gap-10">

                  <div>

                    <h3 className="text-2xl font-[var(--font-display)] font-bold text-[var(--color-navy)]">
                      {bus.departureTime}
                    </h3>

                    <p className="text-[var(--color-slate)]">
                      {bus.from}
                    </p>

                  </div>

                  <div className="text-[var(--color-marigold)] text-xl">
                    ➜
                  </div>

                  <div>

                    <h3 className="text-2xl font-[var(--font-display)] font-bold text-[var(--color-navy)]">
                      {bus.arrivalTime}
                    </h3>

                    <p className="text-[var(--color-slate)]">
                      {bus.to}
                    </p>

                  </div>

                </div>

                {/* Rating */}

                <div className="mt-5 flex items-center gap-2">

                  <span className="bg-[var(--color-teal)] text-white px-3 py-1 rounded-lg font-bold text-sm">
                    ⭐ {bus.rating}
                  </span>

                  <span className="text-[var(--color-slate)]">
                    Excellent
                  </span>

                </div>

                {/* Amenities */}

                <div className="mt-5 flex flex-wrap gap-2">

                  {bus.amenities?.map((item, index) => (

                    <span
                      key={index}
                      className="bg-[var(--color-paper)] text-[var(--color-slate)] px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                    </span>

                  ))}

                </div>

              </div>

              {/* Right Section */}

              <div className="text-right">

                <p className="text-[var(--color-slate)] flex items-center justify-end gap-1">
                  <Users2 size={16} />
                  Seats Left
                </p>

                <h2 className="text-3xl font-[var(--font-display)] font-bold text-[var(--color-rust)]">
                  {bus.availableSeats}
                </h2>

                <h1 className="text-4xl font-[var(--font-display)] font-bold text-[var(--color-navy)] mt-5">
                  ₹ {bus.price}
                </h1>

                <button
                  onClick={() =>
                    navigate("/booking", {
                      state: { bus, journeyDate: date || null },
                    })
                  }
                  className="mt-6 bg-[var(--color-marigold)] hover:bg-[var(--color-marigold-light)] text-[var(--color-navy)] px-8 py-3 rounded-xl font-bold shadow-md transition"
                >
                  Book Now
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default SearchBus;
