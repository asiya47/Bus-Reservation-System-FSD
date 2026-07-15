import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { Bus, Mail, Lock } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      const {
        token,
        user,
        admin,
        role,
        message,
      } = response.data;

      toast.success(message);

      // Save Token
      localStorage.setItem("token", token);

      // Save Role
      localStorage.setItem("role", role);

      if (role === "admin") {
        localStorage.setItem(
          "admin",
          JSON.stringify(admin)
        );

        localStorage.setItem(
          "adminId",
          admin._id
        );

        navigate("/admin");
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        localStorage.setItem(
          "userId",
          user._id
        );

        if (response.data.role === "admin") {
          navigate("/admin");
        }
        else {
          navigate("/dashboard");
        }
      }

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[var(--color-navy)] px-6">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 text-[var(--color-navy)] font-[var(--font-display)] font-bold text-2xl">
            <Bus className="text-[var(--color-marigold)]" size={28} />
            Smart<span className="text-[var(--color-marigold)]">Bus</span>
          </div>
          <p className="text-[var(--color-slate)] text-sm mt-2">Welcome back, log in to continue</p>
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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-[var(--color-slate)] text-sm mt-6">
          New here?{" "}
          <Link to="/register" className="text-[var(--color-teal)] font-semibold">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
