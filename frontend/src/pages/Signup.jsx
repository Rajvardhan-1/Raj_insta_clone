import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Signup = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    fullName: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/register', formData);
      login(response.data);
      // Small timeout to ensure context state is updated before navigation
      setTimeout(() => navigate('/'), 100);
    } catch (err) {
      console.error('Signup error:', err);
      if (!err.response) {
        setError('Server is unreachable. Please ensure the backend is running.');
      } else {
        setError(err.response.data?.message || 'Error creating account. Try a different username.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h1 className="logo">Instagram</h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '20px', fontWeight: '600' }}>
          Sign up to see photos and videos from your friends.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            className="input-field"
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
          <input
            className="input-field"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button 
            className="btn-primary" 
            style={{ width: '100%' }} 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
      <div className="card auth-card">
        <p>Have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Log in</Link></p>
      </div>
    </div>
  );
};

export default Signup;
