function Legend() {
  return (
    <div className="flex justify-center gap-6 mb-8">

      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-[var(--color-teal)] rounded"></div>
        <span className="text-[var(--color-slate)]">Available</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-[var(--color-marigold)] rounded"></div>
        <span className="text-[var(--color-slate)]">Selected</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-[var(--color-rust)] rounded"></div>
        <span className="text-[var(--color-slate)]">Booked</span>
      </div>

    </div>
  );
}

export default Legend;