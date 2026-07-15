import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, CalendarDays, ShieldCheck, Clock, Headset } from "lucide-react";

function Hero() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    if (!from || !to || !date) {
      alert("Please fill all fields.");
      return;
    }

    navigate(
      `/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(
        to
      )}&date=${date}`
    );
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <section className="bg-[var(--color-navy)] pt-32 pb-28">

      <div className="max-w-5xl mx-auto px-6 text-center">

        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Book Your Bus Across India
        </h1>

        <p className="mt-4 text-lg text-slate-300">
          Reliable schedules, transparent pricing, and instant e-tickets —
          all in one place.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-8 text-slate-300 text-sm">

          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-[var(--color-accent)]" />
            Verified operators
          </div>

          <div className="flex items-center gap-2">
            <Clock size={18} className="text-[var(--color-accent)]" />
            2000+ daily trips
          </div>

          <div className="flex items-center gap-2">
            <Headset size={18} className="text-[var(--color-accent)]" />
            24/7 support
          </div>

        </div>

      </div>

      {/* Floating search card */}
      <div className="max-w-5xl mx-auto px-6 -mb-24 mt-12">

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">

          <div className="grid md:grid-cols-4 gap-4">

            <div className="flex items-center border border-slate-200 rounded-lg px-4 focus-within:border-[var(--color-accent)] focus-within:ring-2 focus-within:ring-[var(--color-accent)]/15 transition">
              <MapPin size={18} className="text-[var(--color-accent)] shrink-0" />
              <input
                type="text"
                placeholder="From"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="p-3 w-full outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center border border-slate-200 rounded-lg px-4 focus-within:border-[var(--color-accent)] focus-within:ring-2 focus-within:ring-[var(--color-accent)]/15 transition">
              <MapPin size={18} className="text-[var(--color-accent)] shrink-0" />
              <input
                type="text"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="p-3 w-full outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center border border-slate-200 rounded-lg px-4 focus-within:border-[var(--color-accent)] focus-within:ring-2 focus-within:ring-[var(--color-accent)]/15 transition">
              <CalendarDays size={18} className="text-[var(--color-accent)] shrink-0" />
              <input
                type="date"
                min={todayStr}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-3 w-full outline-none text-slate-600"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-lg flex justify-center items-center gap-2 font-semibold transition py-3"
            >
              <Search size={18} />
              Search Buses
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
