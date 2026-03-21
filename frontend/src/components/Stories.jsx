import { User } from 'lucide-react';

const Stories = () => {
  // Mock stories for UI demonstration
  const dummyStories = [
    { id: 1, username: 'vikantshuh', img: null },
    { id: 2, username: 'yash9w', img: null },
    { id: 3, username: 'saraarjunn', img: null },
    { id: 4, username: 'afsector4g...', img: null },
    { id: 5, username: 'oyemox', img: null },
    { id: 6, username: 'christiarbr...', img: null },
    { id: 7, username: 'raj_v_singh', img: null },
  ];

  return (
    <div className="stories-container">
      {dummyStories.map((story) => (
        <div key={story.id} className="story-item">
          <div className="story-avatar-outer">
            <div className="story-avatar-inner">
              {story.img ? (
                <img src={story.img} alt={story.username} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'white' }}>
                  <User size={30} />
                </div>
              )}
            </div>
          </div>
          <span className="story-username">{story.username}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
