import {
  ShieldCheck,
  Clock3,
  CreditCard,
  MapPinned,
} from "lucide-react";

function Features() {
  const features = [
    {
      icon: <ShieldCheck size={40} />,
      title: "Safe Journey",
      description:
        "Travel with verified operators and enjoy a safe and comfortable ride.",
    },
    {
      icon: <Clock3 size={40} />,
      title: "On Time",
      description:
        "Real-time schedules ensure you never miss your bus.",
    },
    {
      icon: <CreditCard size={40} />,
      title: "Secure Payment",
      description:
        "Fast and secure online payments with multiple payment options.",
    },
    {
      icon: <MapPinned size={40} />,
      title: "Live Tracking",
      description:
        "Track your bus location and estimated arrival in real time.",
    },
  ];

  return (
    <section className="bg-[var(--color-paper)] py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-[var(--font-display)] font-bold text-center text-[var(--color-navy)]">
          Why Choose SmartBus?
        </h2>

        <p className="text-center text-[var(--color-slate)] mt-4 mb-14">
          We make your journey comfortable, secure, and hassle-free.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-[var(--color-accent)] mb-6">
                {feature.icon}
              </div>

              <h3 className="text-xl font-[var(--font-display)] font-bold mb-3 text-[var(--color-navy)]">
                {feature.title}
              </h3>

              <p className="text-[var(--color-slate)] text-sm leading-6">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;