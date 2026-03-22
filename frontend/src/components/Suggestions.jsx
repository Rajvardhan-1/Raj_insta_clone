import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';

const Suggestions = () => {
  const { user } = useAuth();

  const dummySuggestions = [
    { id: 1, username: 'SHAKTI', fullname: 'Followed by _amogh_shukla_', img: 'https://i.pravatar.cc/150?img=1', verified: false },
    { id: 2, username: 'Roopam Tiwari', fullname: 'Followed by i_am_yash_seng...', img: 'https://i.pravatar.cc/150?img=5', verified: false },
    { id: 3, username: 'anushka 🤍', fullname: 'Followed by threadwith love', img: 'https://i.pravatar.cc/150?img=9', verified: false },
    { id: 4, username: 'Paresh Pahuja', fullname: 'Followed by athena_h77 + 3...', img: 'https://i.pravatar.cc/150?img=12', verified: true },
    { id: 5, username: 'Mahi Sachan', fullname: 'Followed by reshu8737 + 4...', img: 'https://i.pravatar.cc/150?img=16', verified: false },
  ];

  return (
    <div className="suggestions-sidebar">
      <div className="user-profile-summary">
        <div className="user-info">
          <div className="avatar" style={{ width: 44, height: 44, background: 'none', border: 'none', boxShadow: 'none', margin: 0 }}>
            {/* Adding a default dummy image for the user since user.profileImg might not exist */}
            <img src="https://i.pravatar.cc/150?img=11" alt="profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          </div>
          <div className="details" style={{ marginLeft: '12px' }}>
            <span className="username" style={{ fontSize: '14px', fontWeight: '700' }}>{user?.username || 'raaz.v.singh'}</span>
            <span className="fullname" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{user?.fullName || 'Raj Vardhan...'}</span>
          </div>
        </div>
        <span className="switch-link" style={{ color: 'rgb(0, 149, 246)', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Switch</span>
      </div>

      <div className="suggestions-header" style={{ marginTop: '12px', marginBottom: '16px' }}>
        <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>Suggested for you</span>
        <span className="see-all" style={{ fontSize: '12px', fontWeight: '600', color: 'white', cursor: 'pointer' }}>See all</span>
      </div>

      <div className="suggestions-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {dummySuggestions.map((s) => (
          <div key={s.id} className="suggestion-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="user-info" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="avatar" style={{ width: 44, height: 44, background: 'none', border: 'none', boxShadow: 'none', margin: 0 }}>
                <img src={s.img} alt={s.username} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <div className="details" style={{ marginLeft: '12px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="username" style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>{s.username}</span>
                  {s.verified && (
                    <svg aria-label="Verified" color="rgb(0, 149, 246)" fill="currentColor" height="12" role="img" viewBox="0 0 40 40" width="12">
                      <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"></path>
                    </svg>
                  )}
                </div>
                <span className="fullname" style={{ fontSize: '12px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{s.fullname}</span>
              </div>
            </div>
            <span className="follow-link" style={{ color: 'rgb(0, 149, 246)', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Follow</span>
          </div>
        ))}
      </div>

      <div className="footer" style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '40px', lineHeight: '1.5' }}>
        <p>About · Help · Press · API · Jobs · Privacy · Terms ·<br />Locations · Language · Meta Verified</p>
        <p style={{ marginTop: '20px' }}>© 2026 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
};

export default Suggestions;
