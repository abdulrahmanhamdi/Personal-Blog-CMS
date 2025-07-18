// src/pages/AdminPanel.tsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
}

const AdminPanel: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        setPosts(postsData);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        title,
        content,
        createdAt: Timestamp.now(),
      });
      setPosts(prev => [{
        id: docRef.id,
        title,
        content,
        createdAt: Timestamp.now(),
      }, ...prev]);
      setTitle('');
      setContent('');
      alert('Post created!');
    } catch (err) {
      console.error('Error adding post:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="card">
        <h2>Create a Post</h2>
        <div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Content (Markdown supported)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              required
              disabled={isLoading}
            />
          </div>
          <button
            className="btn btn-primary w-100"
            onClick={handlePost}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Publish'
            )}
          </button>
        </div>
      </div>
      <div className="post-list">
        <h3 className="mt-5 mb-3">Posts</h3>
        {posts.length === 0 ? (
          <p className="text-center">No posts available.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="post-item">
              <h5>{post.title}</h5>
              <p>{post.content}</p>
              <small>Posted on: {new Date(post.createdAt.seconds * 1000).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;