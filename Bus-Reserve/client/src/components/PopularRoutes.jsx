import { ArrowRight, Clock3, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PopularRoutes() {
  const navigate = useNavigate();

  const routes = [
    {
      from: "Hyderabad",
      to: "Bangalore",
      price: "₹850",
      time: "8 hrs",
    },
    {
      from: "Hyderabad",
      to: "Chennai",
      price: "₹950",
      time: "10 hrs",
    },
    {
      from: "Chennai",
      to: "Coimbatore",
      price: "₹650",
      time: "8 hrs",
    },
    {
      from: "Mumbai",
      to: "Pune",
      price: "₹400",
      time: "4 hrs",
    },
    {
      from: "Delhi",
      to: "Jaipur",
      price: "₹600",
      time: "6 hrs",
    },
    {
      from: "Bangalore",
      to: "Goa",
      price: "₹1100",
      time: "10 hrs",
    },
    {
      from: "Mumbai",
      to: "Goa",
      price: "₹900",
      time: "12 hrs",
    },
    {
      from: "Delhi",
      to: "Agra",
      price: "₹450",
      time: "5 hrs",
    },
    {
      from: "Kolkata",
      to: "Bhubaneswar",
      price: "₹700",
      time: "8 hrs",
    },
    {
      from: "Bangalore",
      to: "Chennai",
      price: "₹750",
      time: "6 hrs",
    },
    {
      from: "Hyderabad",
      to: "Vijayawada",
      price: "₹500",
      time: "5 hrs",
    },
    {
      from: "Chennai",
      to: "Madurai",
      price: "₹900",
      time: "9 hrs",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-[var(--font-display)] font-bold text-center text-[var(--color-navy)]">
          Popular Routes
        </h2>

        <p className="text-center text-[var(--color-slate)] mt-4 mb-14">
          Discover the most booked journeys across India.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {routes.map((route, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 border border-slate-200 hover:border-[var(--color-accent)]/40 hover:shadow-lg transition duration-300 bg-white"
            >

              <div className="flex justify-between items-center">

                <h3 className="text-xl font-[var(--font-display)] font-bold text-[var(--color-navy)]">
                  {route.from}
                </h3>

                <ArrowRight className="text-[var(--color-accent)]" size={18} />

                <h3 className="text-xl font-[var(--font-display)] font-bold text-[var(--color-navy)]">
                  {route.to}
                </h3>

              </div>

              <div className="flex justify-between mt-8 text-sm">

                <div className="flex items-center gap-2 text-[var(--color-slate)]">
                  <Clock3 size={18} />
                  <span>{route.time}</span>
                </div>

                <div className="flex items-center gap-2 text-[var(--color-accent)] font-semibold">
                  <IndianRupee size={18} />
                  <span>{route.price}</span>
                </div>

              </div>

              <button
                onClick={() =>
                  navigate(
                    `/search?from=${encodeURIComponent(
                      route.from
                    )}&to=${encodeURIComponent(route.to)}`
                  )
                }
                className="mt-8 w-full bg-[var(--color-navy)] hover:bg-[var(--color-navy-light)] text-white py-3 rounded-xl transition font-semibold"
              >
                Book Now
              </button>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default PopularRoutes;