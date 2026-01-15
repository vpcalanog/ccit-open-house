import React from 'react';
import './App.css';

const programs = [
  {
    id: 'CS',
    title: 'CS',
    subtext: 'For future software engineers and problem solvers',
    achievement: '2nd Place World Hackathon',
    icon: (
      <svg className="program-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ), // Clock/Gear placeholder
    images: ["https://placehold.co/400x250/800000/FFF?text=Hackathon+Team"]
  },
  {
    id: 'IT',
    title: 'IT',
    subtext: 'Where networks, security, and systems come alive',
    achievement: 'Champion Hac4Gov',
    icon: (
      <svg className="program-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ), // Network placeholder
    images: ["https://placehold.co/400x250/800000/FFF?text=IT+Students"]
  },
  {
    id: 'EMC',
    title: 'EMC',
    subtext: 'Design, video, games, and digital storytelling',
    achievement: 'Game Pitching Competition',
    icon: (
      <svg className="program-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 12h4m-2-2v4" />
        <circle cx="17" cy="11" r="1" />
        <circle cx="15" cy="13" r="1" />
      </svg>
    ), // Gamepad placeholder
    images: ["https://placehold.co/400x250/800000/FFF?text=Game+Dev+Team"]
  }
];

function App() {
  return (
    <div className="app-container">
      <header className="main-header">
        <h1>BUILD. CREATE. INNOVATE. YOUR FUTURE STARTS AT CCIT.</h1>
      </header>

      <main className="content-grid">
        {/* Render Program Cards */}
        {programs.map((program) => (
          <div key={program.id} className="program-card">
            <div className="card-decoration-icon">{program.icon}</div>
            
            {/* Image Slider Simulation */}
            <div className="image-carousel">
              <button className="nav-btn prev">❮</button>
              <img src={program.images[0]} alt={`${program.title} event`} />
              <button className="nav-btn next">❯</button>
            </div>
            
            <div className="achievement-badge">
              <p>{program.achievement}</p>
            </div>

            <div className="card-content">
              <h2 className="program-title">{program.title}</h2>
              <p className="program-desc">{program.subtext}</p>
            </div>
          </div>
        ))}

        {/* Render CTA Section */}
        <div className="cta-section">
          <div className="mascot-container">
             {/* Simple SVG representation of the robot head */}
             <svg className="mascot-svg" viewBox="0 0 100 100">
               <polygon points="20,20 80,20 90,50 50,90 10,50" fill="#fff" stroke="#333" strokeWidth="2"/>
               <circle cx="35" cy="45" r="5" fill="#c0392b"/>
               <circle cx="65" cy="45" r="5" fill="#c0392b"/>
               <polygon points="45,60 55,60 50,70" fill="#333"/>
             </svg>
          </div>
          
          <div className="cta-content">
            <div className="speech-bubble">
              <strong>10+ hackathons joined, 9 wins!</strong>
              <br />
              Wanna be part of our next team?
            </div>
            
            <button className="cta-button">
              ASK US ABOUT OUR <br/> PROGRAMS TODAY!
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;