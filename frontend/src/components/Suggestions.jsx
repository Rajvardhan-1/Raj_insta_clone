import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';

const Suggestions = () => {
  const { user } = useAuth();

  const dummySuggestions = [
    { id: 1, username: 'Rehshath Safanaaz...', fullname: 'Suggested for you' },
    { id: 2, username: 'anushka 🤍', fullname: 'Followed by threadw thilova...' },
    { id: 3, username: 'Vidisha Rai', fullname: 'Followed by shwari9305' },
    { id: 4, username: 'Ayushi Thakur', fullname: 'Suggested for you' },
    { id: 5, username: 'Roopam Tiwari', fullname: 'Followed by i_am_yash_seng...' },
  ];

  return (
    <div className="suggestions-sidebar">
      <div className="user-profile-summary">
        <div className="user-info">
          <div className="avatar" style={{ width: 44, height: 44 }}>
            <User size={24} />
          </div>
          <div className="details">
            <span className="username">{user?.username}</span>
            <span className="fullname">{user?.fullName || 'Instagram User'}</span>
          </div>
        </div>
        <span className="switch-link">Switch</span>
      </div>

      <div className="suggestions-header">
        <span>Suggested for you</span>
        <span className="see-all" style={{ cursor: 'pointer' }}>See All</span>
      </div>

      <div className="suggestions-list">
        {dummySuggestions.map((s) => (
          <div key={s.id} className="suggestion-item">
            <div className="user-info">
              <div className="avatar" style={{ width: 32, height: 32 }}>
                <User size={18} />
              </div>
              <div className="details">
                <span className="username">{s.username}</span>
                <span className="fullname" style={{ fontSize: '12px' }}>{s.fullname}</span>
              </div>
            </div>
            <span className="follow-link">Follow</span>
          </div>
        ))}
      </div>

      <div className="footer" style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '20px' }}>
        <p>About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
        <p style={{ marginTop: '15px' }}>© 2026 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
};

export default Suggestions;
