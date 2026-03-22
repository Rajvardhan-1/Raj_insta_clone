import { User } from 'lucide-react';

const Stories = () => {
  // Enhanced mock stories for UI demonstration
  const dummyStories = [
    { id: 1, username: 'pyaarinam...', img: 'https://i.pravatar.cc/150?img=43' },
    { id: 2, username: 'threadwith...', img: 'https://i.pravatar.cc/150?img=32' },
    { id: 3, username: 'sharnavas...', img: 'https://i.pravatar.cc/150?img=11' },
    { id: 4, username: 'shivam_b...', img: 'https://i.pravatar.cc/150?img=60' },
    { id: 5, username: 'elliavram', img: 'https://i.pravatar.cc/150?img=47' },
    { id: 6, username: 'gcu_confe...', img: 'https://i.pravatar.cc/150?img=3' },
    { id: 7, username: 'raj_v_singh', img: 'https://i.pravatar.cc/150?img=15' },
    { id: 8, username: 'the_tech_guy', img: 'https://i.pravatar.cc/150?img=68' },
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
