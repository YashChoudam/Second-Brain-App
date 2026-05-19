import type { ReactElement } from "react";
interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onclick: () => void;
}

const variantClasses = {
  primary: "bg-purple-600 text-white hover:bg-[#4338CA] shadow-sm",
  secondary: "bg-purple-300 text-[#3e38a7] hover:bg-purple-400",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm",
};

export function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onclick}
      className={`
                ${variantClasses[props.variant]} 
                ${sizeClasses[props.size]} 
                inline-flex items-center justify-center gap-2 
                rounded-md font-medium 
                transition-colors duration-200
                border border-transparent
                cursor-pointer
            `}
    >
      {props.startIcon && (
        <span className="flex items-center">{props.startIcon}</span>
      )}
      <span>{props.text}</span>
      {props.endIcon && (
        <span className="flex items-center">{props.endIcon}</span>
      )}
    </button>
  );
}
