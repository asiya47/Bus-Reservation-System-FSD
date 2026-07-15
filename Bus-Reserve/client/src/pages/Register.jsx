import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { Bus, User, Mail, Phone, Lock } from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/register", {
        name,
        email,
        phone,
        password,
      });

      toast.success(response.data.message);

      navigate("/login");

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[var(--color-navy)] px-6 py-16">

      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 text-[var(--color-navy)] font-[var(--font-display)] font-bold text-2xl">
            <Bus className="text-[var(--color-marigold)]" size={28} />
            Smart<span className="text-[var(--color-marigold)]">Bus</span>
          </div>
          <p className="text-[var(--color-slate)] text-sm mt-2">Create your account</p>
        </div>

        <div className="flex items-center border border-slate-200 rounded-xl px-4 mb-4 focus-within:border-[var(--color-teal)] focus-within:ring-2 focus-within:ring-[var(--color-teal)]/20 transition">
          <User size={18} className="text-[var(--color-teal)] shrink-0" />
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center border border-slate-200 rounded-xl px-4 mb-4 focus-within:border-[var(--color-teal)] focus-within:ring-2 focus-within:ring-[var(--color-teal)]/20 transition">
          <Mail size={18} className="text-[var(--color-teal)] shrink-0" />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center border border-slate-200 rounded-xl px-4 mb-4 focus-within:border-[var(--color-teal)] focus-within:ring-2 focus-within:ring-[var(--color-teal)]/20 transition">
          <Phone size={18} className="text-[var(--color-teal)] shrink-0" />
          <input
            type="text"
            placeholder="Enter Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-3 outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center border border-slate-200 rounded-xl px-4 mb-6 focus-within:border-[var(--color-teal)] focus-within:ring-2 focus-within:ring-[var(--color-teal)]/20 transition">
          <Lock size={18} className="text-[var(--color-teal)] shrink-0" />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 outline-none placeholder:text-slate-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl text-white font-bold transition bg-[var(--color-teal)] hover:bg-[var(--color-teal-dark)] disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-[var(--color-slate)] text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--color-teal)] font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
