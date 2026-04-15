import { Link } from "@tanstack/react-router";

interface CampaignCardProps {
  icon: string;
  title: string;
  goal: string;
  raised: string;
  percent: number;
  index: number;
}

export default function CampaignCard({
  icon,
  title,
  goal,
  raised,
  percent,
  index,
}: CampaignCardProps) {
  return (
    <div
      className="bg-card rounded-card shadow-card card-hover p-6 flex flex-col"
      data-ocid={`campaign_card.item.${index}`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-heading text-xl font-semibold text-forest-green-800 mb-2">
        {title}
      </h3>
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>
          Raised:{" "}
          <span className="text-forest-green-700 font-semibold">{raised}</span>
        </span>
        <span>Goal: {goal}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5 mb-3 overflow-hidden">
        <div
          className="bg-forest-green-600 h-2.5 rounded-full transition-all duration-1000"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-forest-green-700 font-medium mb-4">
        {percent}% of goal reached
      </p>
      <Link
        to="/donate"
        className="mt-auto bg-forest-green-800 text-white text-center py-2.5 rounded-lg text-sm font-semibold hover:bg-forest-green-900 hover:scale-105 transition-all duration-200"
        data-ocid={`campaign_card.donate_button.${index}`}
      >
        Donate to This
      </Link>
    </div>
  );
}
