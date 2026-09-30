import { Download } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import type { SaveData } from '../../../engine/saveParser/parsers/common';
import { renderCertificate } from '../../../utils/hof/render';
import { TacticalButton } from '../../TacticalButton';
import { TacticalChecklistItem } from '../../TacticalChecklistItem';
import { TacticalHeaderDivider } from '../../TacticalHeaderDivider';
import { TacticalPanel } from '../../TacticalPanel';

interface Props {
  saveData: SaveData;
}

export const HallOfFameDashboard: React.FC<Props> = ({ saveData }) => {
  const [isExporting, setIsExporting] = useState(false);

  if (!saveData.hallOfFameRecords || saveData.hallOfFameRecords.length === 0) {
    return null;
  }

  const latestRecord = saveData.hallOfFameRecords[0];

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const element = document.getElementById('hof-certificate-hidden-container');
      if (!element) {
        throw new Error('Certificate container not found');
      }

      const blob = await renderCertificate(element);
      if (!blob) {
        throw new Error('Failed to generate image blob');
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `hall_of_fame_${latestRecord?.playerName}_${saveData.gameVersion}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export certificate:', error);
      // We could add a toast notification here if one exists
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <TacticalPanel className="p-5">
      <TacticalHeaderDivider className="mb-4 border-zinc-700">
        <h2 className="font-bold font-mono text-sm text-zinc-400 tracking-widest">HALL OF FAME RECORDS</h2>
        <span className="font-mono text-xs text-zinc-500">TOTAL ENTRIES: {saveData.hallOfFameRecords.length}</span>
      </TacticalHeaderDivider>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <TacticalChecklistItem
            label={`LATEST TEAM: ${latestRecord?.playerName}`}
            subtitle={`${latestRecord?.pokemon.length} POKÉMON`}
            acquired={true}
            strikethroughWhenAcquired={false}
          />
        </div>
        <div className="flex justify-end border-zinc-800 border-t border-dashed pt-2">
          <TacticalButton
            onClick={() => void handleExport()}
            disabled={isExporting}
            variant="primary"
            size="sm"
            hasCrosshairs
          >
            <Download className="mr-2 h-4 w-4" />
            {isExporting ? 'GENERATING...' : 'EXPORT CERTIFICATE'}
          </TacticalButton>
        </div>
      </div>
    </TacticalPanel>
  );
};
