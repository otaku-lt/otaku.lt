import { LucideIcon } from "lucide-react";

export type StatItem = {
  icon: LucideIcon;
  value: string;
  label: string;
  iconColor: string;
  bgColor: string;
};

export type AboutSectionProps = {
  className?: string;
  stats?: StatItem[];
  description?: string[];
};
