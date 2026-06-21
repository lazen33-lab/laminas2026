import React, { useMemo } from 'react';
import { ALL_TEAMS, TOTAL_STICKERS } from './data/stickers';
import { StatsHeader } from './components/StatsHeader';
import { TeamSection } from './components/TeamSection';
import { RepeatedSection } from './components/RepeatedSection';
import { useLocalStorage } from './hooks/useLocalStorage';
import './styles/App.css';

const App: React.FC = () => {
  const [ownedStickers, setOwnedStickers] = useLocalStorage<Record<string, boolean>>('stickers-owned', {});
  const [repeatedStickers, setRepeatedStickers] = useLocalStorage<Record<string, number>>('stickers-repeated', {});
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterMissing, setFilterMissing] = React.useState(false);
  const [currentView, setCurrentView] = React.useState<'album' | 'exchange'>('album');
  const [activeGroup, setActiveGroup] = React.useState('TODOS');

  const handleImport = (data: any) => {
    if (data.owned) setOwnedStickers(data.owned);
    if (data.repeated) setRepeatedStickers(data.repeated);
  };

  const groups = [
    'TODOS', 'FWC', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'
  ];

  const getTeamGroup = (teamId: string) => {
    if (teamId === 'FWC') return 'FWC';
    const index = ALL_TEAMS.findIndex(t => t.id === teamId);
    if (index === 0) return 'FWC';
    const groupIndex = Math.floor((index - 1) / 4);
    return groups[groupIndex + 2];
  };

  const toggleSticker = (id: string) => {
    setOwnedStickers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const addRepeated = (id: string) => {
    setRepeatedStickers(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const removeRepeated = (id: string) => {
    setRepeatedStickers(prev => {
      const newCount = (prev[id] || 0) - 1;
      const newState = { ...prev };
      if (newCount <= 0) {
        delete newState[id];
      } else {
        newState[id] = newCount;
      }
      return newState;
    });
  };

  const ownedCount = useMemo(() => {
    return Object.values(ownedStickers).filter(Boolean).length;
  }, [ownedStickers]);

  const filteredTeams = useMemo(() => {
    return ALL_TEAMS.filter(team => {
      const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           team.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;
      
      if (activeGroup !== 'TODOS') {
        const teamGroup = getTeamGroup(team.id);
        if (teamGroup !== activeGroup) return false;
      }
      
      if (filterMissing) {
        return team.stickers.some(s => !ownedStickers[s.id]);
      }
      
      return true;
    });
  }, [searchTerm, filterMissing, activeGroup, ownedStickers]);

  const generateShareText = () => {
    let text = currentView === 'album' 
      ? "🏆 *MI PROGRESO - ÁLBUM MUNDIAL 2026* 🏆\n"
      : "🔄 *LISTA DE INTERCAMBIO - MUNDIAL 2026* 🔄\n";
    text += "───────────────────────\n\n";
    
    // Repetidas
    const repeated = Object.entries(repeatedStickers).filter(([_, count]) => count > 0);
    if (repeated.length > 0) {
      text += "🔄 *MIS REPETIDAS* 🔄\n";
      const grouped: Record<string, string[]> = {};
      repeated.forEach(([id, count]) => {
        const [code, num] = id.split('_');
        const team = ALL_TEAMS.find(t => t.id === code);
        if (!grouped[code]) grouped[code] = [];
        grouped[code].push(`${num}${count > 1 ? ` (x${count})` : ''}`);
      });
      
      Object.entries(grouped).forEach(([code, nums]) => {
        const team = ALL_TEAMS.find(t => t.id === code);
        text += `${team?.flag || ''} *${code}:* ${nums.join(', ')}\n`;
      });
      text += "\n";
    }

    if (currentView === 'album' || currentView === 'exchange') {
      // Faltantes
      text += "📍 *LO QUE ME FALTA* 📍\n";
      ALL_TEAMS.forEach(team => {
        const missing = team.stickers.filter(s => !ownedStickers[s.id]).map(s => s.number);
        if (missing.length > 0) {
          text += `${team.flag} *${team.id}:* ${missing.join(', ')}\n`;
        }
      });
    }

    text += `\n📊 *Resumen:* ${ownedCount} obtenidas de ${TOTAL_STICKERS}\n`;
    text += `🚀 *¡Ayúdame a completarlo!*`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="app-container">
      <StatsHeader 
        ownedCount={ownedCount} 
        onImport={handleImport}
        currentData={{ owned: ownedStickers, repeated: repeatedStickers }}
      />

      <div className="view-toggle-bar">
        <button 
          className={`view-btn ${currentView === 'album' ? 'active' : ''}`}
          onClick={() => setCurrentView('album')}
        >
          Álbum
        </button>

        <button 
          className={`view-btn ${currentView === 'exchange' ? 'active' : ''}`}
          onClick={() => setCurrentView('exchange')}
        >
          🔄 Intercambio
        </button>
      </div>

      <div className="controls-bar">
        {currentView === 'album' ? (
          <>
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Buscar selección..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-actions">
              <button 
                className={`filter-btn ${filterMissing ? 'active' : ''}`}
                onClick={() => setFilterMissing(!filterMissing)}
              >
                {filterMissing ? 'Mostrando Faltantes' : 'Filtrar Faltantes'}
              </button>
              <button className="share-btn" onClick={generateShareText}>
                📤 Compartir
              </button>
            </div>
          </>
        ) : (
          <button className="share-btn" style={{ width: '100%' }} onClick={generateShareText}>
            📤 Compartir Lista de Intercambio
          </button>
        )}
      </div>

      {currentView === 'album' && !searchTerm && (
        <div className="group-nav">
          {groups.map(group => (
            <div 
              key={group} 
              className={`group-nav-item ${activeGroup === group ? 'active' : ''}`}
              onClick={() => setActiveGroup(group)}
            >
              {group === 'TODOS' ? '🏠 Inicio' : `Grupo ${group}`}
            </div>
          ))}
        </div>
      )}

      <main className="teams-list">
        {currentView === 'album' ? (
          <>
            {filteredTeams.length > 0 ? (
              filteredTeams.map(team => (
                <TeamSection
                  key={team.id}
                  team={team}
                  ownedStickers={ownedStickers}
                  toggleSticker={toggleSticker}
                  addRepeated={addRepeated}
                />
              ))
            ) : (
              <div className="no-results">No se encontraron selecciones.</div>
            )}
            
            {!searchTerm && !filterMissing && activeGroup === 'TODOS' && (
              <RepeatedSection 
                repeatedStickers={repeatedStickers}
                addRepeated={addRepeated}
                removeRepeated={removeRepeated}
              />
            )}
          </>
        ) : (
          <div className="exchange-view">
            <div className="exchange-card">
              <h3>🔄 MIS REPETIDAS (PARA DAR)</h3>
              <div className="exchange-list">
                {Object.entries(repeatedStickers).filter(([_, count]) => count > 0).length > 0 ? (
                  Object.entries(repeatedStickers)
                    .filter(([_, count]) => count > 0)
                    .map(([id, count]) => (
                      <span key={id} className="exchange-sticker repeated">
                        {id.replace('_', ' ')} {count > 1 ? `(x${count})` : ''}
                      </span>
                    ))
                ) : (
                  <p className="exchange-empty">No tienes repetidas aún.</p>
                )}
              </div>
            </div>

            <div className="exchange-card">
              <h3>📍 LO QUE ME FALTA (BUSCO)</h3>
              <div className="exchange-list">
                {ALL_TEAMS.some(t => t.stickers.some(s => !ownedStickers[s.id])) ? (
                  ALL_TEAMS.map(team => {
                    const missing = team.stickers.filter(s => !ownedStickers[s.id]);
                    if (missing.length === 0) return null;
                    return (
                      <div key={team.id} style={{ width: '100%', marginBottom: '15px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--primary)' }}>
                          {team.flag} {team.name}
                        </div>
                        <div className="exchange-list">
                          {missing.map(s => (
                            <span key={s.id} className="exchange-sticker">
                              {s.number}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="exchange-empty">¡Felicidades! Completaste el álbum.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="app-footer">
        <p>Álbum Virtual Mundial 2026 🇨🇦 🇲🇽 🇺🇸</p>
        <p className="instagram-handle">Desarrollado por @Rodrigolazen</p>
      </footer>
    </div>
  );
};

export default App;
