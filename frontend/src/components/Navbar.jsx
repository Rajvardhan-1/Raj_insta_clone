import { Link, useNavigate } from 'react-router-dom';
import { Home, PlusSquare, User, LogOut, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 className="logo" style={{ fontSize: '1.8rem', marginBottom: 0 }}>Instagram</h1>
        </Link>
        <div className="nav-links">
          <Link to="/"><Home className="nav-icon" /></Link>
          <Link to="/messages"><MessageCircle className="nav-icon" /></Link>
          <PlusSquare className="nav-icon" onClick={() => window.dispatchEvent(new CustomEvent('open-create-post'))} />
          <Link to={`/profile/${user.username}`}><User className="nav-icon" /></Link>
          <LogOut className="nav-icon" onClick={handleLogout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
