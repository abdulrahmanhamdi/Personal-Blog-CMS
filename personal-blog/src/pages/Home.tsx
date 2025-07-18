// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        setPosts(postsData);
      } catch (err: any) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="admin-container">
      <div className="card">
        <h2>Blog Posts</h2>
        {isLoading ? (
          <div className="loading-spinner">
            <span className="spinner-border" role="status" aria-hidden="true"></span>
          </div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : posts.length === 0 ? (
          <p className="text-center">No posts available.</p>
        ) : (
          <div className="post-list">
            {posts.map(post => (
              <div key={post.id} className="post-item">
                <h5>{post.title}</h5>
                <p>{post.content.substring(0, 100)}...</p>
                <small>
                  Posted on: {post.createdAt?.seconds
                    ? new Date(post.createdAt.seconds * 1000).toLocaleString()
                    : 'Unknown date'}
                </small>
                <div className="mt-2">
                  <Link to={`/post/${post.id}`} className="link">Read More</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;