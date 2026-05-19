interface InputProps {
  label: string;
  placeholder?: string;
  value?: string;
  type?: string;
  onChange?: (value: string) => void;
}

export function Input(props: InputProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-700">{props.label}</span>
      <input
        type={props.type || "text"}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(event) => props.onChange?.(event.target.value)}
        className="
          w-full rounded-md border border-gray-200 bg-white
          px-3 py-2 text-sm text-gray-900
          outline-none transition-colors
          placeholder:text-gray-400
          focus:border-purple-500 focus:ring-2 focus:ring-purple-100
        "
      />
    </label>
  );
}
