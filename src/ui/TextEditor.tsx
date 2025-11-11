import { useState } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Image as ImageIcon,
  Undo,
  Redo,
  Upload,
  Heading3,
  Heading4,
} from "lucide-react";
import supabase from "../services/supabase";

const MenuBar = ({
  editor,
  handleAddImage,
  handleAddImageUrl,
}: {
  editor: Editor | null;
  handleAddImage: () => void;
  handleAddImageUrl: () => void;
}) => {
  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="menu-bar">
      {/* === TEXT STYLE BUTTONS === */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
        title="Bold"
      >
        <Bold size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
        title="Italic"
      >
        <Italic size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
        title="Underline"
      >
        <UnderlineIcon size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
        title="Strikethrough"
      >
        <Strikethrough size={18} />
      </button>

      <div className="divider" />

      {/* === HEADINGS === */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
        title="Heading 3"
      >
        <Heading3 size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
        title="Heading 4"
      >
        <Heading4 size={18} />
      </button>

      <div className="divider" />

      {/* === LISTS === */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
        title="Bullet List"
      >
        <List size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
        title="Numbered List"
      >
        <ListOrdered size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
        title="Quote"
      >
        <Quote size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
        title="Code Block"
      >
        <Code size={18} />
      </button>

      <div className="divider" />

      {/* === ALIGNMENT === */}
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        title="Align Left"
      >
        <AlignLeft size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
        title="Align Center"
      >
        <AlignCenter size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        title="Align Right"
      >
        <AlignRight size={18} />
      </button>

      <div className="divider" />

      {/* === MEDIA === */}
      <button onClick={setLink} title="Add Link">
        <Link2 size={18} />
      </button>

      <button onClick={handleAddImage} title="Upload Image from Computer">
        <Upload size={18} />
      </button>

      <button onClick={handleAddImageUrl} title="Add Image from URL">
        <ImageIcon size={18} />
      </button>

      <div className="divider" />

      {/* === HISTORY === */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo size={18} />
      </button>
    </div>
  );
};

const TiptapEditor = () => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: "<p>Write your article...</p>",
  });

  // === Handle Upload from Computer ===
  const handleAddImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const filePath = `blogs-${title}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (error) {
        console.error("Upload failed:", error);
        return alert("Image upload failed.");
      }

      const { data: publicUrlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      const url = publicUrlData.publicUrl;
      editor?.chain().focus().setImage({ src: url }).run();
      setImages((prev) => [...prev, url]);
    };
    input.click();
  };

  // === Handle Add Image from URL ===
  const handleAddImageUrl = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
      setImages((prev) => [...prev, url]);
    }
  };

  // === Handle Submit ===
  const handleSubmit = async () => {
    if (!editor || !title.trim()) return alert("Please enter a title");
    if (images.length === 0) return alert("Please add at least one image");

    setLoading(true);
    const html = editor.getHTML();

    const { error } = await supabase.from("blogs").insert([
      {
        title,
        content: html,
        images,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Error saving blog:", error.message);
      alert("Error saving blog. Check console for details.");
    } else {
      alert("Blog saved successfully!");
      editor.commands.clearContent();
      setTitle("");
      setImages([]);
    }
  };

  return (
    <div className="tiptap-wrapper">
      <input
        type="text"
        placeholder="Enter blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />
      <div className="editor-container">
        <MenuBar
          editor={editor}
          handleAddImage={handleAddImage}
          handleAddImageUrl={handleAddImageUrl}
        />

        <EditorContent editor={editor} className="editor-content" />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="submit-button"
      >
        {loading ? "Submitting..." : "Submit Blog"}
      </button>
    </div>
  );
};

export default TiptapEditor;
