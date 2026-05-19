import { useState } from "react";
import {
  FileText,
  Hash,
  Link,
  MessageCircle,
  Share2,
  Trash2,
  Video,
} from "lucide-react";

// Components Imports
import { Card } from "./components/Card.tsx";
import { CreateContentModal } from "./components/CreateContentModal.tsx";
import { DashboardLayout } from "./components/DashboardLayout.tsx";
import { NotesGrid } from "./components/NotesGrid.tsx";
import { Sidebar } from "./components/Sidebar.tsx";
import { TopBar } from "./components/TopBar.tsx";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout
      sidebar={
      <Sidebar
        items={[
          {
            title: "Tweets",
            icon: <MessageCircle size={20} />,
            onClick: () => console.log("Tweets clicked"),
          },
          {
            title: "Videos",
            icon: <Video size={20} />,
            onClick: () => console.log("Videos clicked"),
          },
          {
            title: "Documents",
            icon: <FileText size={20} />,
            onClick: () => console.log("Documents clicked"),
          },
          {
            title: "Links",
            icon: <Link size={20} />,
            onClick: () => console.log("Links clicked"),
          },
          {
            title: "Tags",
            icon: <Hash size={20} />,
            onClick: () => console.log("Tags clicked"),
          },
        ]}
      />
      }
    >
      <TopBar
        title="All Notes"
        onShare={() => console.log("Share Brain clicked")}
        onAddContent={() => setIsModalOpen(true)}
      />

      <NotesGrid>
        <Card
          title="Project Ideas"
          startIcon={<FileText size={18} />}
          shareIcon={<Share2 size={16} />}
          deleteIcon={<Trash2 size={16} />}
          text={"Future Projects\n• Build a personal knowledge base\n• Create a habit tracker\n• Design a minimalist todo app"}
          tags={["productivity", "ideas"]}
          date={new Date("2024-03-10")}
        />

        <Card
          title="How to Build a Second Brain"
          startIcon={<Video size={18} />}
          shareIcon={<Share2 size={16} />}
          deleteIcon={<Trash2 size={16} />}
          image="/2.jpeg"
          tags={["productivity", "learning"]}
          date={new Date("2024-03-09")}
        />

        <Card
          title="Productivity Tip"
          startIcon={<MessageCircle size={18} />}
          shareIcon={<Share2 size={16} />}
          deleteIcon={<Trash2 size={16} />}
          text="The best way to learn is to build in public. Share your progress, get feedback, and help others along the way."
          tags={["productivity", "learning"]}
          date={new Date("2024-03-08")}
        />
      </NotesGrid>

      <CreateContentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {
          console.log("Add content submitted");
          setIsModalOpen(false);
        }}
      />
    </DashboardLayout>
  );
}

export default App;
