import { Bus, Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Company */}
        <div>
          <div className="flex items-center gap-2 text-white">
            <Bus size={32} className="text-[var(--color-accent)]" />
            <h2 className="text-2xl font-[var(--font-display)] font-bold">SmartBus</h2>
          </div>

          <p className="mt-5 text-slate-400 leading-7">
            India's trusted online bus reservation platform offering
            comfortable, safe and affordable journeys across the country.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-[var(--font-display)] font-semibold text-white mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li className="hover:text-[var(--color-accent)] cursor-pointer transition">
              Home
            </li>

            <li className="hover:text-[var(--color-accent)] cursor-pointer transition">
              Search Bus
            </li>

            <li className="hover:text-[var(--color-accent)] cursor-pointer transition">
              Dashboard
            </li>

            <li className="hover:text-[var(--color-accent)] cursor-pointer transition">
              My Bookings
            </li>

            <li className="hover:text-[var(--color-accent)] cursor-pointer transition">
              Login
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-[var(--font-display)] font-semibold text-white mb-5">
            Contact Us
          </h3>

          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-[var(--color-accent)]" />
              <span>Hyderabad, Telangana</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={20} className="text-[var(--color-accent)]" />
              <span>+91 9876543210</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={20} className="text-[var(--color-accent)]" />
              <span>support@smartbus.com</span>
            </div>

          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-[var(--font-display)] font-semibold text-white mb-5">
            Follow Us
          </h3>

          <p className="text-slate-400 mb-5">
            Stay connected with us on social media.
          </p>

          <div className="flex gap-5">

            <FaFacebook
              size={28}
              className="cursor-pointer hover:text-[var(--color-accent)] transition duration-300"
            />

            <FaInstagram
              size={28}
              className="cursor-pointer hover:text-[var(--color-accent)] transition duration-300"
            />

            <FaLinkedin
              size={28}
              className="cursor-pointer hover:text-[var(--color-accent)] transition duration-300"
            />

            <FaXTwitter
              size={28}
              className="cursor-pointer hover:text-[var(--color-accent)] transition duration-300"
            />

          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-sm text-slate-400">
            © 2026 <span className="font-semibold text-white">SmartBus</span>.
            All Rights Reserved.
          </p>

          <p className="text-sm text-slate-500 mt-3 md:mt-0">
            Designed & Developed with ❤️ using React + Tailwind CSS
          </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;