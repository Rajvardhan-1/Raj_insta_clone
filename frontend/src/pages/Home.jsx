import { useState, useEffect } from 'react';
import api from '../services/api';
import { Heart, MessageCircle, Send } from 'lucide-react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newPost, setNewPost] = useState({ caption: '', imageBase64: '' });

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
    <div className="feed">
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
            <div className="avatar"></div>
            <span style={{ fontWeight: '600', color: 'white' }}>{post.user.username}</span>
          </div>
          <img src={post.imageBase64} className="post-image" alt="post" />
          <div className="post-actions">
            <Heart 
              className="nav-icon" 
              fill={post.likes.some(u => u.username === localStorage.getItem('username')) ? 'red' : 'none'} 
              color={post.likes.some(u => u.username === localStorage.getItem('username')) ? 'red' : 'white'}
              onClick={() => handleLike(post.id)} 
            />
            <MessageCircle className="nav-icon" />
            <Send className="nav-icon" />
          </div>
          <div className="post-likes-count">{post.likes.length} likes</div>
          <div className="post-caption">
            <span>{post.user.username}</span> {post.caption}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
