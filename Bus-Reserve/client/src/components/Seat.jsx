function Seat({
  number,
  booked,
  selected,
  onClick,
}) {
  let colorClasses = "bg-[var(--color-teal)] hover:bg-[var(--color-teal-dark)] text-white";

  if (booked) {
    colorClasses = "bg-[var(--color-rust)] text-white";
  }

  if (selected) {
    colorClasses = "bg-[var(--color-marigold)] text-[var(--color-navy)]";
  }

  return (
    <button
      disabled={booked}
      onClick={onClick}
      className={`
        ${colorClasses}
        w-14 h-14
        rounded-xl
        font-bold
        shadow-md
        transition-all
        duration-200
        hover:scale-105
        disabled:cursor-not-allowed
      `}
    >
      {number}
    </button>
  );
}

export default Seat;