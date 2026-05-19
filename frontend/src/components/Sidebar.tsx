import type { ReactElement } from "react";

interface SidebarItem {
  title: string;
  icon: ReactElement;
  onClick?: () => void;
}

interface SidebarProp {
  items: SidebarItem[];
}

export function Sidebar(props: SidebarProp) {
  return (
    <aside className="h-screen w-72 bg-white border-r border-gray-200 px-6 py-6">
      <div className="text-2xl font-bold text-gray-900 mb-8">
        Second Brain
      </div>

      <div className="flex flex-col gap-2">
        {props.items.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-all"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-md font-medium">{item.title}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}