import { Bus } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[var(--color-navy)]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-[var(--font-display)] font-bold text-2xl tracking-tight"
        >
          <Bus size={30} className="text-[var(--color-accent)]" />
          SmartBus
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 text-slate-200 font-medium">

          <Link to="/" className="hover:text-[var(--color-accent-light)] transition">
            Home
          </Link>

          <Link to="/search" className="hover:text-[var(--color-accent-light)] transition">
            Search
          </Link>

          <Link to="/dashboard" className="hover:text-[var(--color-accent-light)] transition">
            Dashboard
          </Link>

          <Link to="/my-bookings" className="hover:text-[var(--color-accent-light)] transition">
            My Bookings
          </Link>

        </div>

        {/* Buttons */}
        <div className="flex gap-3">

          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-white/30 text-white hover:border-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-dark)] transition"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;