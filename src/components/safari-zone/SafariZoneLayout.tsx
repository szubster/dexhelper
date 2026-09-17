import type React from 'react';
import { TacticalPanel } from '../TacticalPanel';

interface SafariZoneLayoutProps {
  children: React.ReactNode;
  sidePanel: React.ReactNode;
}

export function SafariZoneLayout({ children, sidePanel }: SafariZoneLayoutProps) {
  return (
    <div className="flex h-full flex-col gap-4 lg:flex-row lg:items-stretch">
      <div className="flex-1 overflow-y-auto">
        <TacticalPanel className="h-full p-4">{children}</TacticalPanel>
      </div>
      <div className="w-full flex-shrink-0 lg:w-96">{sidePanel}</div>
    </div>
  );
}
