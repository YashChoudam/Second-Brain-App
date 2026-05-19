import type { ReactNode } from "react";

interface DashboardLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {props.sidebar}

      <main className="flex-1 px-8 py-6">{props.children}</main>
    </div>
  );
}
