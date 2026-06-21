import React from 'react';
import { Download, Upload } from 'lucide-react';

interface BackupManagerProps {
  onImport: (data: any) => void;
  currentData: {
    owned: Record<string, boolean>;
    repeated: Record<string, number>;
  };
}

export const BackupManager: React.FC<BackupManagerProps> = ({ onImport, currentData }) => {
  const exportData = () => {
    const dataStr = JSON.stringify(currentData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `respaldo_laminas_2026_${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = event.target.files;
    if (!files || files.length === 0) return;

    fileReader.onload = (e) => {
      try {
        const content = e.target?.result;
        if (typeof content !== 'string') return;
        
        const importedData = JSON.parse(content);
        
        if (confirm('¿Estás seguro de que quieres importar este respaldo? Esto reemplazará tu progreso actual.')) {
          onImport(importedData);
          alert('✅ Respaldo importado correctamente');
        }
      } catch (error) {
        alert('❌ Error al leer el archivo. Asegúrate de que es un archivo de respaldo válido.');
      }
    };
    
    fileReader.readAsText(files[0]);
    // Reset input so the same file can be selected again
    event.target.value = '';
  };

  return (
    <div className="backup-container">
      <button onClick={exportData} className="btn-backup export" title="Exportar Respaldo">
        <Download size={18} />
        <span>Exportar</span>
      </button>
      
      <label className="btn-backup import" title="Importar Respaldo">
        <Upload size={18} />
        <span>Importar</span>
        <input 
          type="file" 
          accept=".json" 
          onChange={importData} 
          style={{ display: 'none' }} 
        />
      </label>
    </div>
  );
};
