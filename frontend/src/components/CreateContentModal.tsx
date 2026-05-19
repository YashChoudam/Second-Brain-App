import { X } from "lucide-react";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { Input } from "./Input";
import { Select } from "./Select";

interface CreateContentModalProps {
  open: boolean;
  title?: string;
  contentType?: string;
  link?: string;
  tags?: string;
  onTitleChange?: (value: string) => void;
  onContentTypeChange?: (value: string) => void;
  onLinkChange?: (value: string) => void;
  onTagsChange?: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function CreateContentModal(props: CreateContentModalProps) {
  if (!props.open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Add Content</h2>
          <IconButton
            label="Close"
            icon={<X size={18} />}
            onClick={props.onClose}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Input
            label="Title"
            placeholder="Enter title"
            value={props.title}
            onChange={props.onTitleChange}
          />

          <Select
            label="Type"
            value={props.contentType}
            onChange={props.onContentTypeChange}
            options={[
              { label: "Tweet", value: "tweet" },
              { label: "Video", value: "video" },
              { label: "Document", value: "document" },
              { label: "Link", value: "link" },
            ]}
          />

          <Input
            label="Link"
            placeholder="https://example.com"
            value={props.link}
            onChange={props.onLinkChange}
          />

          <Input
            label="Tags"
            placeholder="productivity, learning"
            value={props.tags}
            onChange={props.onTagsChange}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            size="md"
            text="Cancel"
            onclick={props.onClose}
          />
          <Button
            variant="primary"
            size="md"
            text="Add Content"
            onclick={props.onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
