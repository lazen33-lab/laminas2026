import React from 'react';
import { ALL_TEAMS } from '../data/stickers';

interface RepeatedSectionProps {
  repeatedStickers: Record<string, number>;
  addRepeated: (id: string) => void;
  removeRepeated: (id: string) => void;
}

export const RepeatedSection: React.FC<RepeatedSectionProps> = ({ 
  repeatedStickers, 
  addRepeated, 
  removeRepeated 
}) => {
  const repeatedList = Object.entries(repeatedStickers)
    .filter(([_, count]) => count > 0)
    .map(([id, count]) => {
      const [teamCode, number] = id.split('_');
      const team = ALL_TEAMS.find(t => t.id === teamCode);
      return { id, count, teamCode, number, teamName: team?.name || teamCode, flag: team?.flag || '' };
    });

  const totalRepeated = repeatedList.reduce((acc, curr) => acc + curr.count, 0);

  if (repeatedList.length === 0) {
    return (
      <section className="repeated-section empty">
        <h2>Láminas Repetidas</h2>
        <p>No tienes láminas repetidas aún.</p>
        <p className="hint">Tip: Selecciona una lámina para agregarla aquí.</p>
      </section>
    );
  }

  return (
    <section className="repeated-section">
      <div className="repeated-header">
        <h2>Repetidas ({totalRepeated})</h2>
      </div>
      <div className="repeated-grid">
        {repeatedList.map(item => (
          <div key={item.id} className="repeated-item">
            <div className="repeated-info">
              <span className="repeated-flag">{item.flag}</span>
              <span className="repeated-number">{item.number}</span>
              <span className="repeated-count">x{item.count}</span>
            </div>
            <div className="repeated-controls">
              <button onClick={() => removeRepeated(item.id)} className="control-btn minus">-</button>
              <button onClick={() => addRepeated(item.id)} className="control-btn plus">+</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
