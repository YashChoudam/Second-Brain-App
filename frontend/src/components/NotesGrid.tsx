import type { ReactNode } from "react";

interface NotesGridProps {
  children: ReactNode;
}

export function NotesGrid(props: NotesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {props.children}
    </div>
  );
}
