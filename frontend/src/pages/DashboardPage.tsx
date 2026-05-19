import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Hash,
  Link,
  MessageCircle,
  Share2,
  Trash2,
  Video,
} from "lucide-react";
import {
  type Content,
  createContent,
  deleteContent,
  getContent,
  shareBrain,
} from "../api";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
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

export function DashboardPage() {
  const navigate = useNavigate();
  const [contents, setContents] = useState<Content[]>([]);
  const [selectedType, setSelectedType] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState("tweet");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  async function loadContent() {
    try {
      const data = await getContent();
      setContents(data.content);
    } catch (err) {
      if (err instanceof Error && err.message.includes("Token")) {
        navigate("/login");
        return;
      }
      setError(err instanceof Error ? err.message : "Could not load content");
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    loadContent();
  }, []);

  const filteredContent = useMemo(() => {
    if (selectedType === "all") {
      return contents;
    }
    return contents.filter((content) => content.type === selectedType);
  }, [contents, selectedType]);

  async function handleCreateContent() {
    setError("");

    try {
      const data = await createContent({
        title,
        type: contentType,
        link,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      setContents((current) => [data.content, ...current]);
      setTitle("");
      setContentType("tweet");
      setLink("");
      setTags("");
      setIsModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add content");
    }
  }

  async function handleDeleteContent(contentId: string) {
    await deleteContent(contentId);
    setContents((current) =>
      current.filter((content) => content._id !== contentId),
    );
  }

  async function handleShareBrain() {
    const data = await shareBrain();
    const fullUrl = `${window.location.origin}${data.shareUrl.replace(
      "/api/v1/user/brain",
      "/brain",
    )}`;
    await navigator.clipboard.writeText(fullUrl);
    alert("Share link copied to clipboard");
  }

  return (
    <DashboardLayout
      sidebar={
        <Sidebar
          items={[
            {
              title: "Tweets",
              icon: <MessageCircle size={20} />,
              onClick: () => setSelectedType("tweet"),
            },
            {
              title: "Videos",
              icon: <Video size={20} />,
              onClick: () => setSelectedType("video"),
            },
            {
              title: "Documents",
              icon: <FileText size={20} />,
              onClick: () => setSelectedType("document"),
            },
            {
              title: "Links",
              icon: <Link size={20} />,
              onClick: () => setSelectedType("link"),
            },
            {
              title: "Tags",
              icon: <Hash size={20} />,
              onClick: () => setSelectedType("all"),
            },
          ]}
        />
      }
    >
      <TopBar
        title="All Notes"
        onShare={handleShareBrain}
        onAddContent={() => setIsModalOpen(true)}
      />

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <NotesGrid>
        {filteredContent.map((content) => (
          <Card
            key={content._id}
            title={content.title}
            startIcon={getIcon(content.type)}
            shareIcon={<Share2 size={16} />}
            deleteIcon={<Trash2 size={16} />}
            text={content.link}
            tags={content.tags.map((tag) => tag.title)}
            date={new Date(content.createdAt)}
            onShare={() => navigator.clipboard.writeText(content.link)}
            onDelete={() => handleDeleteContent(content._id)}
          />
        ))}
      </NotesGrid>

      <CreateContentModal
        open={isModalOpen}
        title={title}
        contentType={contentType}
        link={link}
        tags={tags}
        onTitleChange={setTitle}
        onContentTypeChange={setContentType}
        onLinkChange={setLink}
        onTagsChange={setTags}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateContent}
      />
    </DashboardLayout>
  );
}
