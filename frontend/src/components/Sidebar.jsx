import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, User, Menu, Instagram } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { icon: <Home />, label: 'Home', path: '/' },
    { icon: <Search />, label: 'Search', path: '#' },
    { icon: <Compass />, label: 'Explore', path: '#' },
    { icon: <Film />, label: 'Reels', path: '#' },
    { icon: <MessageCircle />, label: 'Messages', path: '/messages' },
    { icon: <Heart />, label: 'Notifications', path: '#' },
    { icon: <PlusSquare />, label: 'Create', path: '#', onClick: () => window.dispatchEvent(new CustomEvent('open-create-post')) },
    { icon: <div className="avatar small" style={{ margin: 0, width: 24, height: 24 }}><User size={18} /></div>, label: 'Profile', path: `/profile/${user?.username}` },
  ];

  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-logo">
        <Instagram size={28} color="white" className="nav-icon" />
      </Link>

      <div className="sidebar-links">
        {navItems.map((item) => (
          <Link 
            key={item.label} 
            to={item.path} 
            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            onClick={item.onClick}
            title={item.label}
          >
            <div style={{ position: 'relative' }}>
              {item.icon}
              {item.label === 'Messages' && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#ff3040',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  border: '2px solid var(--bg)'
                }}>1</span>
              )}
            </div>
            {/* labels are completely omitted for slim design */}
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div className="sidebar-link" style={{ cursor: 'pointer' }} title="More">
          <Menu size={24} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
