import React, { useState } from "react";

interface HamburgerMenuProps {
  onReset: () => void;
  onHowToPlay: () => void;
  isGameStarted: boolean;
  isGameOver: boolean;
  isGameWon: boolean;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  onReset,
  onHowToPlay,
  isGameStarted,
  isGameOver,
  isGameWon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleReset = () => {
    onReset();
    setIsOpen(false);
  };

  const handleHowToPlay = () => {
    onHowToPlay();
    setIsOpen(false);
  };

  return (
    <div className="hamburger-menu">
      <button className="hamburger-button" onClick={toggleMenu}>
        <div className={`hamburger-icon ${isOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {isOpen && (
        <div className="menu-overlay" onClick={() => setIsOpen(false)}>
          <div className="menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="menu-header">
              <h3>Menu</h3>
              <button className="menu-close" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>

            <div className="menu-items">
              <button className="menu-item" onClick={handleHowToPlay}>
                ❓ How to Play
              </button>

              <button className="menu-item" onClick={handleReset}>
                {!isGameStarted
                  ? "↻ Reset Game"
                  : isGameOver
                  ? isGameWon
                    ? "↻ Play Again"
                    : "↻ Try Again"
                  : "↻ Reset Game"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
