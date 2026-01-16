import React, { useState, useRef } from 'react'; 
import './App.css';
import ModelController from './components/ModelController';
import ProgramCard from './components/ProgramCard';

const programs = [
  {
    id: 'CS',
    title: 'CS',
    subtext: 'For future software engineers and problem solvers',
    icon: '/images/CS.png',
  },
  {
    id: 'IT',
    title: 'IT',
    subtext: 'Where networks, security, and systems come alive',
    icon: '/images/IT.png',
  },
  {
    id: 'EMC',
    title: 'EMC',
    subtext: 'Design, video, games, and digital storytelling',
    icon: '/images/EMC.png',
  },
];

const faqData = [
  { question: "What is BSIT?", answer: "BSIT stands for Bachelor of Science in Information Technology. It focuses on IT infrastructure, support, and systems." },
  { question: "What is BSCS?", answer: "BSCS stands for Bachelor of Science in Computer Science. It focuses on programming, data structures, and algorithm design." },
  { question: "What is EMC?", answer: "EMC stands for Entertainment and Multimedia Computing. It focuses on game development, interactive media, and digital design." },
  { question: "What are the requirements for admission?", answer: "The basic requirements include Form 138, birth certificate, and a completed application form." },
  { question: "What’s the difference between IT and CS?", answer: "IT focuses on practical tech like networks and support, while CS dives deep into programming and computing theory." },
  { question: "Tell me about EMC.", answer: "EMC combines computing and multimedia to develop interactive applications and games." },
  { question: "Do IT and CS share subjects?", answer: "Yes, all three programs share foundational courses like programming and IT basics, but diverge into specializations." },
  { question: "Which course is better for me?", answer: "It depends: IT for practical systems work, CS for coding and theory, EMC for creative media and games." },
  { question: "What jobs can I get with an IT degree?", answer: "IT graduates can work as support specialists, network admins, developers, system analysts, or project managers." },
  { question: "What jobs can I get with a CS degree?", answer: "CS graduates become developers, data scientists, AI engineers, or software architects." },
  { question: "What jobs can I get with an EMC degree?", answer: "EMC graduates often become game developers, animators, AR/VR specialists, or multimedia designers." },
  { question: "How long is the CS program?", answer: "CS, IT, and EMC programs typically take 4 years including an internship or OJT." },
  { question: "Examples of subjects in IT, CS, and EMC?", answer: "IT: Networking, Security. CS: Algorithms, AI. EMC: Game Design, Multimedia Systems." },
  { question: "Are these programs accredited?", answer: "Yes, IT, CS, and EMC are CHED-recognized and may also be accredited by PAASCU or AACCUP." },
];

function App() {
  const defaultSpeech = (
    <>
      <strong>Hello, My name is Orbit!</strong>
      <br />
      Do you have any questions about CCIT?
    </>
  );

  const [orbitSpeech, setOrbitSpeech] = useState(defaultSpeech);
  const [modelState, setModelState] = useState('idle');
  
  const timerRef = useRef(null);

  const handleBotResponse = (text, duration = 20000) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setOrbitSpeech(text);
    setModelState('bobbing');

    timerRef.current = setTimeout(() => {
      setOrbitSpeech(defaultSpeech);
      setModelState('idle');
      timerRef.current = null;
    }, duration);
  };

  const handleFaqSelect = (e) => {
    const selectedAnswer = e.target.value;
    if (selectedAnswer) {
      // Using the specific duration you requested
      handleBotResponse(selectedAnswer, 9166.66);
      e.target.value = ""; 
    }
  };

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
          <div className='cta-content'>
            <div className="speech-bubble">
              {orbitSpeech}
            </div>
            
              <div className="mascot-container">
                <ModelController modelState={modelState} />
              </div>
              
          </div>
              <select 
                className="faq-dropdown" 
                onChange={handleFaqSelect}
                defaultValue=""
              >
                <option value="" disabled>Ask Orbit a question...</option>
                {faqData.map((faq, index) => (
                  <option key={index} value={faq.answer}>
                    {faq.question}
                  </option>
                ))}
              </select>
        </div>
      </main>
      {/* <footer>
        Design: Xandra Yvonne Galicia |
        Web Development: Vince Paulo Calanog |
        3D Model: Elijah Japeth Ramos |
        Animation: John Benedict Palomeno
      </footer> */}
    </div>
  );
}

export default App;