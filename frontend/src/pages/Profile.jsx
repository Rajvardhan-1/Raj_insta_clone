import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  
  return (
    <div className="profile-container">
      <div className="card" style={{ display: 'flex', gap: '40px', padding: '40px', background: 'var(--glass-bg)', backdropFilter: 'blur(12px)', border: '1px solid var(--glass-border)' }}>
        <div className="avatar" style={{ width: '150px', height: '150px', border: '3px solid rgba(255, 255, 255, 0.2)' }}></div>
        <div>
          <h2 style={{ marginBottom: '20px', color: 'white' }}>{user.username}</h2>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', color: 'rgba(255, 255, 255, 0.9)' }}>
            <span><strong>0</strong> posts</span>
            <span><strong>0</strong> followers</span>
            <span><strong>0</strong> following</span>
          </div>
          <p style={{ color: 'white' }}><strong>{user.username}</strong></p>
          <p style={{ color: 'var(--text-secondary)' }}>This is your bio</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '40px', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
        <h3 style={{ textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px', color: 'rgba(255, 255, 255, 0.6)' }}>Posts</h3>
        <p style={{ padding: '40px', color: 'var(--text-secondary)' }}>No posts yet.</p>
      </div>
    </div>
  );
};

export default Profile;
