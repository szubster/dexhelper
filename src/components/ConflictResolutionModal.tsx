import { AlertTriangle, Cloud, HardDrive } from 'lucide-react';
import { DataPoint } from './DataPoint';
import { TacticalBlockHeader } from './TacticalBlockHeader';
import { TacticalButton } from './TacticalButton';
import { TacticalModal } from './TacticalModal';
import { TacticalPanel } from './TacticalPanel';

export interface SaveMetadata {
  timestamp: number;
  gameTime?: string;
  // any other relevant data...
}

export interface ConflictResolutionModalProps {
  isOpen: boolean;
  onClose?: () => void;
  localMetadata: SaveMetadata;
  remoteMetadata: SaveMetadata;
  onKeepLocal: () => void;
  onPullRemote: () => void;
}

export function ConflictResolutionModal({
  isOpen,
  onClose,
  localMetadata,
  remoteMetadata,
  onKeepLocal,
  onPullRemote,
}: ConflictResolutionModalProps) {
  return (
    <TacticalModal isOpen={isOpen} {...(onClose ? { onClose } : {})} dialogClassName="max-w-2xl">
      <TacticalPanel variant="amber" className="p-6">
        <TacticalBlockHeader
          variant="amber"
          icon={<AlertTriangle className="h-4 w-4" />}
          trackingLabel="SYNC.CONFLICT"
          title="Save File Conflict"
        />

        <div className="mt-6 mb-8 font-mono text-sm text-zinc-300">
          <p>A conflict has been detected between your local device and the cloud save.</p>
          <p className="mt-2 text-amber-400/80">
            Please select which version you would like to keep. The discarded version will be permanently lost.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Local Save */}
          <TacticalPanel className="flex flex-col justify-between p-4" variant="default">
            <div>
              <div className="mb-4 flex items-center gap-2 border-zinc-700 border-b border-dashed pb-2">
                <HardDrive className="h-4 w-4 text-zinc-400" />
                <h3 className="font-bold font-mono text-zinc-100 uppercase">Local Save</h3>
              </div>

              <div className="mb-6 flex flex-col gap-3">
                <DataPoint label="Last Modified" value={new Date(localMetadata.timestamp).toLocaleString()} />
                {localMetadata.gameTime && <DataPoint label="Game Time" value={localMetadata.gameTime} />}
              </div>
            </div>

            <TacticalButton variant="secondary" className="w-full" hasCrosshairs onClick={onKeepLocal}>
              Keep Local
            </TacticalButton>
          </TacticalPanel>

          {/* Remote Save */}
          <TacticalPanel className="flex flex-col justify-between p-4" variant="amber">
            <div>
              <div className="mb-4 flex items-center gap-2 border-amber-500/30 border-b border-dashed pb-2">
                <Cloud className="h-4 w-4 text-amber-500" />
                <h3 className="font-bold font-mono text-amber-500 uppercase">Cloud Save</h3>
              </div>

              <div className="mb-6 flex flex-col gap-3">
                <DataPoint label="Last Modified" value={new Date(remoteMetadata.timestamp).toLocaleString()} />
                {remoteMetadata.gameTime && <DataPoint label="Game Time" value={remoteMetadata.gameTime} />}
              </div>
            </div>

            <TacticalButton
              variant="default"
              className="w-full border-amber-500/30 text-amber-500 hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-400 focus-visible:ring-amber-500"
              hasCrosshairs
              onClick={onPullRemote}
            >
              Pull Remote
            </TacticalButton>
          </TacticalPanel>
        </div>
      </TacticalPanel>
    </TacticalModal>
  );
}
