import type {ReactNode} from "react"
export interface ButtonProps{
     variant : "primary" | "secondary" ;
     size : "sm" | "md" | "lg" ;
     text : string ;
     startIcon ?: ReactNode;
     endIcon ?: ReactNode;
     onclick : ()=> void ;
}

const variantClasses = {
  primary: "bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-sm",
  secondary: "bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#E0E7FF]",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm",
};

export function Button(props : ButtonProps){
    return(
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
            {props.startIcon && <span className="flex items-center">{props.startIcon}</span>}
            <span>{props.text}</span>
            {props.endIcon && <span className="flex items-center">{props.endIcon}</span>}
        </button>
    ) 
}