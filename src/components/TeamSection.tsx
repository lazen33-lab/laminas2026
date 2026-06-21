import React, { useState } from 'react';
import { Team } from '../data/stickers';

interface TeamSectionProps {
  team: Team;
  ownedStickers: Record<string, boolean>;
  toggleSticker: (id: string) => void;
  addRepeated?: (id: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ team, ownedStickers, toggleSticker, addRepeated }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ownedCount = team.stickers.filter(s => ownedStickers[s.id]).length;
  const isComplete = ownedCount === team.stickers.length;

  // Dynamic colors mapping
  const teamColors: Record<string, string> = {
    ARG: 'rgba(116, 172, 223, 0.15)',
    BRA: 'rgba(0, 156, 59, 0.15)',
    MEX: 'rgba(0, 104, 71, 0.15)',
    ESP: 'rgba(198, 11, 30, 0.15)',
    FRA: 'rgba(0, 35, 149, 0.15)',
    GER: 'rgba(0, 0, 0, 0.1)',
    USA: 'rgba(0, 40, 104, 0.15)',
    CAN: 'rgba(255, 0, 0, 0.1)',
    FWC: 'rgba(138, 21, 56, 0.15)',
  };

  const headerStyle = {
    background: teamColors[team.id] 
      ? `linear-gradient(to right, ${teamColors[team.id]}, transparent)` 
      : 'linear-gradient(to right, rgba(0,0,0,0.05), transparent)'
  };

  return (
    <section className={`team-section ${isComplete ? 'complete' : ''}`}>
      <div 
        className="team-header" 
        onClick={() => setIsOpen(!isOpen)}
        style={headerStyle}
      >
        <div className="team-info">
          <div className="team-title">
            <span className="team-flag">{team.flag}</span>
            <span className="team-name">{team.name}</span>
          </div>
          <div className="team-progress-info">
            <span className="team-progress-text">{ownedCount} / {team.stickers.length}</span>
            <div className="team-progress-bar-container">
              <div 
                className="team-progress-bar-fill" 
                style={{ width: `${(ownedCount / team.stickers.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        <span className={`chevron ${isOpen ? 'open' : ''}`}>▼</span>
      </div>
      
      {isOpen && (
        <div className="sticker-grid">
          {team.stickers.map(sticker => {
            const isSpecial = sticker.number.includes('🛡️') || team.id === 'FWC';
            return (
              <div key={sticker.id} className="sticker-container">
                <button
                  className={`sticker-button ${ownedStickers[sticker.id] ? 'owned' : ''} ${isSpecial ? 'glitter' : ''}`}
                  onClick={() => toggleSticker(sticker.id)}
                >
                  {sticker.number}
                </button>
                <button 
                  className="add-repeated-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addRepeated?.(sticker.id);
                  }}
                >
                  +
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

