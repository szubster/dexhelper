import { TacticalButton } from '@dexhelper/ui';
import { useFeatureFlagActions, useFeatureFlags } from '../../contexts/FeatureFlagContext';

export function FeatureFlagsUI() {
  const flags = useFeatureFlags();
  const { setFlag, resetFlags } = useFeatureFlagActions();

  return (
    <div className="mt-8 border-t border-dashed border-zinc-800 pt-8">
      <h3 className="mb-4 font-mono text-xs font-black tracking-widest text-zinc-500">FEATURE.FLAGS</h3>
      <div className="flex flex-col gap-2">
        {Object.entries(flags).map(([key, value]) => (
          <TacticalButton
            key={key}
            onClick={() => setFlag(key, !value)}
            className="w-full justify-between font-mono"
            variant={value ? 'primary' : 'secondary'}
          >
            <span>{key}</span>
            <span className={value ? 'text-teal-400' : 'text-zinc-500'}>{value ? 'ON' : 'OFF'}</span>
          </TacticalButton>
        ))}
      </div>
      <TacticalButton
        onClick={resetFlags}
        variant="danger"
        className="mt-4 w-full font-mono text-xs"
        hasCrosshairs={true}
      >
        RESET FLAGS
      </TacticalButton>
    </div>
  );
}
