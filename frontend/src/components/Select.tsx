interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
}

export function Select(props: SelectProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-700">{props.label}</span>
      <select
        value={props.value}
        onChange={(event) => props.onChange?.(event.target.value)}
        className="
          w-full rounded-md border border-gray-200 bg-white
          px-3 py-2 text-sm text-gray-900
          outline-none transition-colors
          focus:border-purple-500 focus:ring-2 focus:ring-purple-100
        "
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
