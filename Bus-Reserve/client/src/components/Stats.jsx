import { Bus, Users, MapPinned, Headphones } from "lucide-react";

function Stats() {
  const stats = [
    {
      icon: <Bus size={35} />,
      number: "2000+",
      title: "Daily Trips",
    },
    {
      icon: <MapPinned size={35} />,
      number: "500+",
      title: "Routes",
    },
    {
      icon: <Users size={35} />,
      number: "1M+",
      title: "Happy Customers",
    },
    {
      icon: <Headphones size={35} />,
      number: "24/7",
      title: "Support",
    },
  ];

  return (
    <section className="pt-40 pb-20 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 px-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-[var(--color-paper)] rounded-2xl p-8 text-center hover:-translate-y-1 hover:shadow-lg transition duration-300"
          >
            <div className="text-[var(--color-accent)] flex justify-center mb-4">
              {item.icon}
            </div>

            <h2 className="text-4xl font-[var(--font-display)] font-bold text-[var(--color-navy)]">
              {item.number}
            </h2>

            <p className="mt-2 text-[var(--color-slate)]">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;