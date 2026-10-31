import { TacticalBadge } from '@dexhelper/ui';
import type React from 'react';

export interface Gen3EventFlagsProps {
  eonTicket?: boolean;
  mysticTicket?: boolean;
  auroraTicket?: boolean;
  oldSeaMap?: boolean;
  className?: string;
}

export const Gen3EventFlags: React.FC<Gen3EventFlagsProps> = ({
  eonTicket = false,
  mysticTicket = false,
  auroraTicket = false,
  oldSeaMap = false,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <TacticalBadge variant={eonTicket ? 'primary' : 'zinc'} dot={eonTicket}>
        EON TICKET
      </TacticalBadge>
      <TacticalBadge variant={mysticTicket ? 'primary' : 'zinc'} dot={mysticTicket}>
        MYSTIC TICKET
      </TacticalBadge>
      <TacticalBadge variant={auroraTicket ? 'primary' : 'zinc'} dot={auroraTicket}>
        AURORA TICKET
      </TacticalBadge>
      <TacticalBadge variant={oldSeaMap ? 'primary' : 'zinc'} dot={oldSeaMap}>
        OLD SEA MAP
      </TacticalBadge>
    </div>
  );
};
