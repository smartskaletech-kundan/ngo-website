import { useEffect, useRef, useState } from "react";

interface CounterItemProps {
  icon: string;
  value: string;
  label: string;
}

function CounterItem({ icon, value, label }: CounterItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center px-4 transition-all duration-700 ${
        visible ? "animate-fade-in-up opacity-100" : "opacity-0"
      }`}
    >
      <span className="text-4xl mb-2">{icon}</span>
      <span className="font-heading text-3xl md:text-4xl font-bold text-white mb-1">
        {value}
      </span>
      <span className="text-light-green text-sm md:text-base font-medium">
        {label}
      </span>
    </div>
  );
}

export default function ImpactCounter() {
  const items = [
    { icon: "🌳", value: "5,686+", label: "Trees Planted" },
    { icon: "♻️", value: "1,875 Kg", label: "Waste Recycled" },
    { icon: "👥", value: "1,183+", label: "Families Impacted" },
    { icon: "🌾", value: "167+ Acres", label: "Soil Conserved" },
  ];

  return (
    <section
      className="bg-dark-green py-14 md:py-20"
      data-ocid="impact_counter.section"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {items.map((item) => (
            <CounterItem key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
