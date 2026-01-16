import React, { useState, useEffect } from 'react';
import achievementsData from '../achievements.json';

const getAchievementsForProgram = (programId) => {
  const allAchievements = achievementsData.records.achievements;

  return allAchievements.filter((item) => {
    const courses = item.course.toUpperCase();

    if (courses.includes('CCIT')) return true;

    if (programId === 'CS' && courses.includes('BSCS')) return true;
    if (programId === 'IT' && courses.includes('BSIT')) return true;
    if (programId === 'EMC' && courses.includes('BSEMC')) return true;

    return false;
  });
};

const ProgramCard = ({ program }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null); // State for the modal

  const programAchievements = getAchievementsForProgram(program.id);
  const len = programAchievements.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === len - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? len - 1 : prev - 1));
  };

  useEffect(() => {
    if (len <= 1 || modalImage) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex, len, modalImage]);

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  if (len === 0) {
    return (
      <div className="program-card">
        <div className="card-decoration-icon">
          <img src={program.icon} alt={`${program.title} icon`} />
        </div>

        <div
          className="image-carousel"
          style={{ background: 'rgba(0,0,0,0.2)' }}
        >
          <p>No achievements yet.</p>
        </div>

        <div className="card-content">
          <h2 className="program-title">{program.title}</h2>
          <p className="program-desc">{program.subtext}</p>
        </div>
      </div>
    );
  }

  const prevIndex = (currentIndex - 1 + len) % len;
  const nextIndex = (currentIndex + 1) % len;

  const currentAchievement = programAchievements[currentIndex];
  const prevAchievement = programAchievements[prevIndex];
  const nextAchievement = programAchievements[nextIndex];

  return (
    <>
      <div className="program-card">
        <div className="card-decoration-icon">
          <img src={program.icon} alt={`${program.title} icon`} />
        </div>

        <div className="image-carousel">
          {len > 1 && (
            <button className="nav-btn prev" onClick={prevSlide}>
              ❮
            </button>
          )}

          {len > 1 && (
            <div
              className="carousel-slide slide-prev"
              style={{ backgroundImage: `url(${prevAchievement.image})` }}
              onClick={prevSlide}
            />
          )}

          <div
            className="carousel-slide slide-active"
            style={{ backgroundImage: `url(${currentAchievement.image})` }}
            onClick={() => openModal(currentAchievement.image)}
          />

          {len > 1 && (
            <div
              className="carousel-slide slide-next"
              style={{ backgroundImage: `url(${nextAchievement.image})` }}
              onClick={nextSlide}
            />
          )}

          {len > 1 && (
            <button className="nav-btn next" onClick={nextSlide}>
              ❯
            </button>
          )}
        </div>

        <div className="achievement-badge">
          <strong>{currentAchievement.title}</strong>
          <p>{currentAchievement.description}</p>
        </div>

        <div className="card-content">
          <h2 className="program-title">{program.title}</h2>
          <p className="program-desc">{program.subtext}</p>
        </div>
      </div>

      {modalImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <button className="modal-close-btn" onClick={closeModal}>X</button>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Full Screen Showcase" />
          </div>
        </div>
      )}
    </>
  );
};

export default ProgramCard;