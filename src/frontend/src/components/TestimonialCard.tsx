interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  initials: string;
  index: number;
}

export default function TestimonialCard({
  quote,
  name,
  location,
  initials,
  index,
}: TestimonialCardProps) {
  return (
    <div
      className="bg-card rounded-card shadow-card p-6 flex-shrink-0 w-80 md:w-96 snap-start"
      data-ocid={`testimonial.item.${index}`}
    >
      <div className="flex gap-1 mb-4" aria-label="5 stars">
        {["s1", "s2", "s3", "s4", "s5"].map((k) => (
          <span key={k} className="text-yellow-400 text-lg" aria-hidden="true">
            ★
          </span>
        ))}
      </div>
      <p className="text-foreground/80 text-sm leading-relaxed italic mb-6">
        "{quote}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-forest-green-100 flex items-center justify-center font-heading font-bold text-forest-green-800 text-sm">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-sm text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{location}</p>
        </div>
      </div>
    </div>
  );
}
