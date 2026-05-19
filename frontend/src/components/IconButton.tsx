import type { ReactElement } from "react";

interface IconButtonProps {
  icon: ReactElement;
  onClick?: () => void;
  label?: string;
}

export function IconButton(props: IconButtonProps) {
  return (
    <button
      aria-label={props.label}
      title={props.label}
      onClick={props.onClick}
      className="
        inline-flex h-8 w-8 items-center justify-center
        rounded-md text-gray-400
        hover:bg-gray-100 hover:text-gray-700
        transition-colors cursor-pointer
      "
    >
      {props.icon}
    </button>
  );
}
