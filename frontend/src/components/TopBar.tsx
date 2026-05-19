import { Plus, Share2 } from "lucide-react";
import { Button } from "./Button";

interface TopBarProps {
  title: string;
  onShare?: () => void;
  onAddContent?: () => void;
}

export function TopBar(props: TopBarProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-gray-900">{props.title}</h1>

      {(props.onShare || props.onAddContent) && (
        <div className="flex items-center gap-3">
          {props.onShare && (
            <Button
              variant="secondary"
              size="md"
              text="Share Brain"
              startIcon={<Share2 size={18} />}
              onclick={props.onShare}
            />
          )}

          {props.onAddContent && (
            <Button
              variant="primary"
              size="md"
              text="Add Content"
              startIcon={<Plus size={18} />}
              onclick={props.onAddContent}
            />
          )}
        </div>
      )}
    </div>
  );
}
