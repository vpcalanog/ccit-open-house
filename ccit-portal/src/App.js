import React, { useState } from 'react';
import './App.css';
import ModelController from './components/ModelController';
import achievementsData from './achievements.json'; 

// Helper function to filter achievements based on course string
const getAchievementsForProgram = (programId) => {
  const allAchievements = achievementsData.records.achievements;
  
  return allAchievements.filter(item => {
    const courses = item.course.toUpperCase();
    
    // Always include if it is a general CCIT achievement
    if (courses.includes('CCIT')) return true;

    // Filter specific courses
    if (programId === 'CS' && (courses.includes('BSCS'))) return true;
    if (programId === 'IT' && (courses.includes('BSIT'))) return true;
    if (programId === 'EMC' && (courses.includes('BSEMC'))) return true;

    return false;
  });
};

const programs = [
  {
    id: 'CS',
    title: 'CS',
    subtext: 'For future software engineers and problem solvers',
    icon: (
      <svg className="program-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    )
  },
  {
    id: 'IT',
    title: 'IT',
    subtext: 'Where networks, security, and systems come alive',
    icon: (
      <svg className="program-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  },
  {
    id: 'EMC',
    title: 'EMC',
    subtext: 'Design, video, games, and digital storytelling',
    icon: (
      <svg className="program-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 12h4m-2-2v4" />
        <circle cx="17" cy="11" r="1" />
        <circle cx="15" cy="13" r="1" />
      </svg>
    )
  }
];

// Separate component for the card to manage its own carousel state
const ProgramCard = ({ program }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get specific achievements for this card
  const programAchievements = getAchievementsForProgram(program.id);
  const len = programAchievements.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === len - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? len - 1 : prevIndex - 1));
  };

  // Safe check for empty data
  if (len === 0) {
    return (
      <div className="program-card">
        <div className="card-decoration-icon">{program.icon}</div>
        <div className="image-carousel" style={{background: 'rgba(0,0,0,0.2)'}}>
            <p>No achievements yet.</p>
        </div>
        <div className="card-content">
          <h2 className="program-title">{program.title}</h2>
          <p className="program-desc">{program.subtext}</p>
        </div>
      </div>
    );
  }

  // Calculate indices for the "Cover Flow" effect
  // We use modulo arithmetic to wrap around the array
  const prevIndex = (currentIndex - 1 + len) % len;
  const nextIndex = (currentIndex + 1) % len;
  

  const currentAchievement = programAchievements[currentIndex];
  const prevAchievement = programAchievements[prevIndex];
  const nextAchievement = programAchievements[nextIndex];

  return (
    <div className="program-card">
      <div className="card-decoration-icon">{program.icon}</div>
      
      {/* 3D Image Carousel */}
      <div className="image-carousel">
        {len > 1 && <button className="nav-btn prev" onClick={prevSlide}>❮</button>}
        
        {/* Previous Image (Left) - Only render if we have > 1 item */}
        {len > 1 && (
            <div 
                className="carousel-slide slide-prev"
                style={{ backgroundImage: `url(${prevAchievement.image})` }}
                onClick={prevSlide} // Allow clicking side image to navigate
            />
        )}

        {/* Current Image (Center) */}
        <div 
            className="carousel-slide slide-active"
            style={{ backgroundImage: `url(${currentAchievement.image})` }}
        />

        {/* Next Image (Right) - Only render if we have > 1 item */}
        {len > 1 && (
            <div 
                className="carousel-slide slide-next"
                style={{ backgroundImage: `url(${nextAchievement.image})` }}
                onClick={nextSlide} // Allow clicking side image to navigate
            />
        )}

        {len > 1 && <button className="nav-btn next" onClick={nextSlide}>❯</button>}
      </div>
      
      {/* Dynamic Achievement Badge */}
      <div className="achievement-badge">
        <strong>{currentAchievement.title}</strong>
        <p>{currentAchievement.description}</p>
      </div>

      <div className="card-content">
        <h2 className="program-title">{program.title}</h2>
        <p className="program-desc">{program.subtext}</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="app-container">
      <header className="main-header">
        <h1>BUILD. CREATE. INNOVATE. YOUR FUTURE STARTS AT CCIT.</h1>
      </header>

      <main className="content-grid">
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}

        <div className="cta-section">
            <div className="speech-bubble">
              <strong>Hello, My name is Orbit!</strong>
              <br />
              Do you have any questions about CCIT?
            </div>
            <div className="mascot-container">
              <ModelController/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;