import type React from 'react';
import { TacticalCard } from '../TacticalCard';

export interface WonderCardData {
  id: number;
  title: string;
  iconId: number;
  status: number;
}

export interface WonderCardPanelProps {
  cardData: WonderCardData;
}

export const WonderCardPanel: React.FC<WonderCardPanelProps> = ({ cardData }) => {
  return (
    <TacticalCard testId="wonder-card-panel" className="flex flex-col gap-2 p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center border border-zinc-700 border-dashed bg-zinc-900/50">
          <span className="font-mono text-sm text-zinc-400">ID:{cardData.iconId}</span>
        </div>
        <div className="flex flex-col">
          <h3 className="font-mono text-lg text-zinc-100">{cardData.title}</h3>
          <span className="font-mono text-xs text-zinc-500">Card ID: {cardData.id}</span>
        </div>
      </div>
      <div className="mt-2 border-zinc-800 border-t border-dashed pt-2">
        <span className="font-mono text-sm text-zinc-400">
          Status: <span className="text-zinc-200">{cardData.status}</span>
        </span>
      </div>
    </TacticalCard>
  );
};
