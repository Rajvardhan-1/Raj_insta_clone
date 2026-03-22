import { useState, useEffect } from 'react';
import api from '../services/api';
import { Heart, MessageCircle, Send, MoreHorizontal, Bookmark } from 'lucide-react';
import Stories from '../components/Stories';
import Suggestions from '../components/Suggestions';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newPost, setNewPost] = useState({ caption: '', imageBase64: '' });
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchPosts();
    const handleOpenCreate = () => setShowCreate(true);
    window.addEventListener('open-create-post', handleOpenCreate);
    return () => window.removeEventListener('open-create-post', handleOpenCreate);
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPost({ ...newPost, imageBase64: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.imageBase64) {
      alert('Please select an image first');
      return;
    }
    try {
      await api.post('/posts', newPost);
      setNewPost({ caption: '', imageBase64: '' });
      setShowCreate(false);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async (postId) => {
    try {
      await api.post(`/posts/${postId}/like`);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main-content">
      <div className="feed-container">
        <Stories />
        
        {showCreate && (
          <div className="card create-post-card">
            <h3>Create New Post</h3>
            <input type="file" accept="image/*" onChange={handleImageChange} required />
            {newPost.imageBase64 && <img src={newPost.imageBase64} className="image-preview" alt="preview" />}
            <textarea
              className="input-field"
              placeholder="Write a caption..."
              value={newPost.caption}
              onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-primary" onClick={handleCreatePost}>Share</button>
              <button className="btn-primary" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }} onClick={() => setShowCreate(false)}>Cancel</button>
            </div>
          </div>
        )}

        {posts.map((post) => (
          <div key={post.id} className="card post-card">
            <div className="post-header">
              <div className="post-user-info">
                <div className="avatar" style={{ width: 32, height: 32 }}>
                  <img src="https://i.pravatar.cc/150?img=53" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt="user" />
                </div>
                <div className="user-details" style={{ marginLeft: '12px', display: 'flex', flexDirection: 'column' }}>
                  <div className="post-meta" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontWeight: '700', color: 'white', fontSize: '14px' }}>{post.user.username}</span>
                    <svg aria-label="Verified" color="rgb(0, 149, 246)" fill="currentColor" height="12" role="img" viewBox="0 0 40 40" width="12" style={{ marginLeft: '2px' }}>
                      <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"></path>
                    </svg>
                    <span className="post-dot" style={{ margin: '0 4px', fontSize: '12px', color: 'var(--text-secondary)' }}>•</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>1h</span>
                  </div>
                  {/* Keeping empty details div just in case it's needed for alignment, but real IG often hides 'Original audio' in simple posts */}
                </div>
              </div>
              <MoreHorizontal size={20} className="post-options" />
            </div>

            <img src={post.imageBase64} className="post-image" alt="post" />

            <div className="post-actions">
              <div style={{ display: 'flex', gap: '16px' }}>
                <Heart 
                  className="nav-icon" 
                  size={24}
                  fill={post.likes.some(u => u.username === username) ? 'red' : 'none'} 
                  color={post.likes.some(u => u.username === username) ? 'red' : 'white'}
                  onClick={() => handleLike(post.id)} 
                />
                <MessageCircle className="nav-icon" size={24} />
                <Send className="nav-icon" size={24} />
              </div>
              <Bookmark className="nav-icon" size={24} style={{ marginLeft: 'auto' }} />
            </div>

            <div className="post-likes-count">{post.likes.length} likes</div>
            <div className="post-caption">
              <span>{post.user.username}</span> {post.caption}
            </div>
          </div>
        ))}
      </div>

      <Suggestions />
    </div>
  );
};

export default Home;
