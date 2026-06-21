import React from 'react';
import { TOTAL_STICKERS } from '../data/stickers';
import { BackupManager } from './BackupManager';

interface StatsHeaderProps {
  ownedCount: number;
  onImport: (data: any) => void;
  currentData: {
    owned: Record<string, boolean>;
    repeated: Record<string, number>;
  };
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({ ownedCount, onImport, currentData }) => {
  const percentage = Math.round((ownedCount / TOTAL_STICKERS) * 100);

  return (
    <header className="stats-header">
      <div className="header-top">
        <h1>Mi Álbum Mundial</h1>
        <BackupManager onImport={onImport} currentData={currentData} />
      </div>
      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-label">Obtenidas</span>
          <span className="stat-value">{ownedCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Restantes</span>
          <span className="stat-value">{TOTAL_STICKERS - ownedCount}</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${percentage}%` }}
          >
            <span className="progress-text">{percentage}%</span>
          </div>
        </div>
      </div>
    </header>
  );
};
