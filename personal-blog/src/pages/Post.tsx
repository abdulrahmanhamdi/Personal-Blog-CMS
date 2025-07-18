// src/pages/Post.tsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: any; // يمكن تحسينه باستخدام Timestamp
}

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as Post);
        } else {
          console.error('No such post!');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  return (
    <div className="admin-container">
      <div className="card">
        {isLoading ? (
          <div className="loading-spinner">
            <span className="spinner-border" role="status" aria-hidden="true"></span>
          </div>
        ) : post ? (
          <>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>Posted on: {new Date(post.createdAt.seconds * 1000).toLocaleString()}</small>
            <div className="mt-3">
              <Link to="/" className="link">Back to Home</Link>
            </div>
          </>
        ) : (
          <p className="text-center">Post not found.</p>
        )}
      </div>
    </div>
  );
};

export default Post;