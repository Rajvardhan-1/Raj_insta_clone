import React, { useState, useEffect, useRef } from 'react';
import { Send, User } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Messages.css';

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.username);
      const interval = setInterval(() => fetchMessages(selectedUser.username), 3000);
      return () => clearInterval(interval);
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const res = await api.get('/messages/conversations');
      setConversations(res.data);
    } catch (err) {
      console.error('Error fetching conversations:', err);
    }
  };

  const fetchMessages = async (username) => {
    try {
      const res = await api.get(`/messages/${username}`);
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    try {
      await api.post('/messages', {
        receiverUsername: selectedUser.username,
        content: newMessage
      });
      setNewMessage('');
      fetchMessages(selectedUser.username);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const [showNewChat, setShowNewChat] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStartChat = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    try {
      // Find user and fetch chat history
      const res = await api.get(`/messages/${searchTerm}`);
      setSelectedUser({ username: searchTerm });
      setMessages(res.data);
      setShowNewChat(false);
      setSearchTerm('');
      fetchConversations();
    } catch (err) {
      alert('User not found or error occurred');
    }
  };

  return (
    <div className="messages-container">
      <div className="messages-sidebar">
        <div className="sidebar-header">
          <h3>{user.username}</h3>
          <button className="new-msg-btn" onClick={() => setShowNewChat(!showNewChat)}>
            {showNewChat ? 'Cancel' : 'New'}
          </button>
        </div>
        {showNewChat && (
          <div className="new-chat-search">
            <form onSubmit={handleStartChat}>
              <input 
                type="text" 
                placeholder="Search username..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </form>
          </div>
        )}
        <div className="conversations-list">
          {conversations.length === 0 ? (
            <div className="no-conversations">No conversations yet</div>
          ) : (
            conversations.map((conv) => (
              <div 
                key={conv.id} 
                className={`conversation-item ${selectedUser?.id === conv.id ? 'active' : ''}`}
                onClick={() => setSelectedUser(conv)}
              >
                <div className="avatar">
                  {conv.profilePicture ? (
                    <img src={conv.profilePicture} alt={conv.username} />
                  ) : (
                    <User />
                  )}
                </div>
                <div className="conv-info">
                  <span className="username">{conv.username}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="chat-window">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <div className="avatar small">
                {selectedUser.profilePicture ? (
                  <img src={selectedUser.profilePicture} alt={selectedUser.username} />
                ) : (
                  <User size={20} />
                )}
              </div>
              <span className="username">{selectedUser.username}</span>
            </div>
            <div className="messages-list">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`message-item ${msg.sender.id === user.id ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form className="message-input" onSubmit={handleSendMessage}>
              <input 
                type="text" 
                placeholder="Message..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" disabled={!newMessage.trim()}>
                <Send size={20} />
              </button>
            </form>
          </>
        ) : (
          <div className="select-chat-placeholder">
            <div className="placeholder-icon">
              <Send size={48} />
            </div>
            <h2>Your Messages</h2>
            <p>Send private photos and messages to a friend.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
