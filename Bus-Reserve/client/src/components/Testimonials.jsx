import { Star } from "lucide-react";

function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      city: "Hyderabad",
      review:
        "Booking was extremely easy and the bus arrived exactly on time. Highly recommended!",
    },
    {
      name: "Priya Verma",
      city: "Bangalore",
      review:
        "Very clean buses and comfortable seats. The booking experience was smooth.",
    },
    {
      name: "Arjun Reddy",
      city: "Chennai",
      review:
        "One of the best bus booking platforms I've used. Fast and secure.",
    },
  ];

  return (
    <section className="bg-[var(--color-paper)] py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-[var(--font-display)] font-bold text-center text-[var(--color-navy)]">
          What Our Customers Say
        </h2>

        <p className="text-center text-[var(--color-slate)] mt-4 mb-14">
          Trusted by thousands of travellers across India.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-lg transition"
            >

              <div className="flex mb-4">
                <Star className="text-[var(--color-gold)] fill-[var(--color-gold)]" />
                <Star className="text-[var(--color-gold)] fill-[var(--color-gold)]" />
                <Star className="text-[var(--color-gold)] fill-[var(--color-gold)]" />
                <Star className="text-[var(--color-gold)] fill-[var(--color-gold)]" />
                <Star className="text-[var(--color-gold)] fill-[var(--color-gold)]" />
              </div>

              <p className="text-[var(--color-slate)] leading-7">
                "{item.review}"
              </p>

              <div className="mt-6">
                <h3 className="font-[var(--font-display)] font-bold text-[var(--color-navy)]">{item.name}</h3>
                <p className="text-sm text-[var(--color-slate)]">{item.city}</p>
              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;