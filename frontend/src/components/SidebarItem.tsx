import type { ReactElement } from "react";

interface SidebarItemProps {
  title: string;
  icon: ReactElement;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem(props: SidebarItemProps) {
  return (
    <button
      onClick={props.onClick}
      className={`
        flex w-full items-center gap-4 px-4 py-3 rounded-lg
        text-sm font-medium transition-colors cursor-pointer
        ${
          props.active
            ? "bg-purple-100 text-purple-700"
            : "text-gray-700 hover:bg-purple-100 hover:text-purple-700"
        }
      `}
    >
      <span className="flex items-center">{props.icon}</span>
      <span>{props.title}</span>
    </button>
  );
}
