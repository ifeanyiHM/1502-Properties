import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import useBlog from "../context/useBlog";
import { deleteBlog } from "../services/apiAdmin"; // assumed: add this if it doesn't exist
import TextEditor from "../ui/TextEditor";
import { Spinner } from "../Utilities/Spinner";

export default function ListBlogs() {
  const { allBlogs, loadingBlogs, fetchBlogs } = useBlog(); // fetchBlogs: assumed name
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      setDeletingId(id);
      await deleteBlog(id);
      toast.success("Blog deleted.");
      fetchBlogs();
    } catch (err: unknown) {
      toast.error(
        err instanceof Error
          ? "Failed to delete blog: " + err.message
          : "An unknown error occurred.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loadingBlogs) return <Spinner />;

  return (
    <>
      <ToastContainer />
      <div className="approve-properties">
        <h1>All Blogs</h1>
        <p>
          {allBlogs.length} {allBlogs.length === 1 ? "blog" : "blogs"}{" "}
          published.
        </p>

        {allBlogs.length === 0 ? (
          <p className="empty">No blogs yet.</p>
        ) : (
          <ul className="property-list">
            {allBlogs.map((post) => (
              <li key={post.id}>
                <div className="property-item">
                  <div className="details">
                    <h2>{post.title}</h2>
                  </div>
                  <div style={{ margin: 0 }}>
                    <button
                      className="reject-btn"
                      style={{ backgroundColor: "#333333" }}
                      onClick={() =>
                        setEditingId((prev) =>
                          prev === post.id ? null : post.id,
                        )
                      }
                    >
                      {editingId === post.id ? "Close" : "Edit"}
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleDelete(post.id)}
                      disabled={deletingId === post.id}
                    >
                      {deletingId === post.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>

                {editingId === post.id && (
                  <TextEditor
                    blogToEdit={post} // needs support in TextEditor, see below
                    onDone={() => {
                      setEditingId(null);
                      fetchBlogs();
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
