// src/pages/AdminPanel.tsx
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const AdminPanel: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: Timestamp.now(),
      });
      setTitle("");
      setContent("");
      alert("Post created!");
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", paddingTop: 30 }}>
      <h2>Create a Post</h2>
      <form onSubmit={handlePost}>
        <input type="text" placeholder="Title" value={title}
          onChange={(e) => setTitle(e.target.value)} required />
        <br />
        <textarea placeholder="Content (Markdown supported)" value={content}
          onChange={(e) => setContent(e.target.value)} rows={10} required />
        <br />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default AdminPanel;
