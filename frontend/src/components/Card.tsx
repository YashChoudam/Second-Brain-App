import type { ReactElement } from "react";

interface CardProp {
  title: string;
  date: Date;
  text?: string;
  image?: string;
  tags?: string[];
  startIcon?: ReactElement;
  shareIcon?: ReactElement;
  deleteIcon?: ReactElement;
  onShare?: () => void;
  onDelete?: () => void;
}

export function Card(props: CardProp) {
  return (
    <div
      className="
        w-72 min-h-64
        bg-white
        border border-gray-200
        rounded-lg
        shadow-sm
        p-4
        flex flex-col gap-4
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          {props.startIcon && (
            <span className="text-gray-500 mt-1">{props.startIcon}</span>
          )}

          <h2 className="text-base font-semibold text-gray-900 leading-snug">
            {props.title}
          </h2>
        </div>

        <div className="flex items-center gap-3 text-gray-400">
          {props.shareIcon && (
            <button
              onClick={props.onShare}
              className="cursor-pointer hover:text-gray-600"
            >
              {props.shareIcon}
            </button>
          )}

          {props.deleteIcon && (
            <button
              onClick={props.onDelete}
              className="cursor-pointer hover:text-gray-600"
            >
              {props.deleteIcon}
            </button>
          )}
        </div>
      </div>

      {props.image && (
        <img
          src={props.image}
          alt={props.title}
          className="
            w-full h-32
            object-cover
            rounded-md
            bg-gray-200
          "
        />
      )}

      {props.text && (
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line break-words">
          {props.text}
        </p>
      )}

      {props.tags && props.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {props.tags.map((tag) => (
            <span
              key={tag}
              className="
                bg-purple-100
                text-purple-600
                text-xs
                font-medium
                px-2 py-1
                rounded-md
              "
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500 mt-auto">
        Added on{" "}
        {props.date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
