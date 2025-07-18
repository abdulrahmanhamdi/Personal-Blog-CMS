// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: any; // يمكن تحسينه باستخدام Timestamp إذا لزم الأمر
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        ) : posts.length === 0 ? (
          <p className="text-center">No posts available.</p>
        ) : (
          <div className="post-list">
            {posts.map(post => (
              <div key={post.id} className="post-item">
                <h5>{post.title}</h5>
                <p>{post.content.substring(0, 100)}...</p>
                <small>Posted on: {new Date(post.createdAt.seconds * 1000).toLocaleString()}</small>
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