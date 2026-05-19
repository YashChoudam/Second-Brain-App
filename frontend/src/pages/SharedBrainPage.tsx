import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FileText, Link, MessageCircle, Video } from "lucide-react";
import { type Content, getSharedBrain } from "../api";
import { Card } from "../components/Card";
import { DashboardLayout } from "../components/DashboardLayout";
import { NotesGrid } from "../components/NotesGrid";
import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";

function getIcon(type: Content["type"]) {
  if (type === "video") {
    return <Video size={18} />;
  }
  if (type === "tweet") {
    return <MessageCircle size={18} />;
  }
  if (type === "link" || type === "article") {
    return <Link size={18} />;
  }
  return <FileText size={18} />;
}

export function SharedBrainPage() {
  const { hash } = useParams();
  const [contents, setContents] = useState<Content[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSharedBrain() {
      if (!hash) {
        return;
      }

      try {
        const data = await getSharedBrain(hash);
        setContents(data.content);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load brain");
      }
    }

    loadSharedBrain();
  }, [hash]);

  return (
    <DashboardLayout
      sidebar={
        <Sidebar
          items={[
            { title: "Shared Brain", icon: <FileText size={20} /> },
          ]}
        />
      }
    >
      <TopBar title="Shared Brain" />

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <NotesGrid>
        {contents.map((content) => (
          <Card
            key={content._id}
            title={content.title}
            startIcon={getIcon(content.type)}
            text={content.link}
            tags={content.tags.map((tag) => tag.title)}
            date={new Date(content.createdAt)}
          />
        ))}
      </NotesGrid>
    </DashboardLayout>
  );
}
