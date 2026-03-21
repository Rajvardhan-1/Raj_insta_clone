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
        <h1 className="logo" style={{ fontSize: '2rem', margin: 0, textAlign: 'left' }}>Instagram</h1>
        <Instagram className="nav-icon mobile-only" style={{ display: 'none' }} />
      </Link>

      <div className="sidebar-links">
        {navItems.map((item) => (
          <Link 
            key={item.label} 
            to={item.path} 
            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            onClick={item.onClick}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div className="sidebar-link" style={{ cursor: 'pointer' }}>
          <Menu />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
