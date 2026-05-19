import { Brain } from "lucide-react";

interface LogoProps {
  title?: string;
}

export function Logo(props: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <Brain size={24} className="text-purple-600" />
      <span className="text-xl font-bold text-gray-900">
        {props.title || "Second Brain"}
      </span>
    </div>
  );
}
