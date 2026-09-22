import { useFeatureFlagActions, useFeatureFlags } from '../../contexts/FeatureFlagContext';
import { TacticalButton } from '../TacticalButton';

export function FeatureFlagsUI() {
  const flags = useFeatureFlags();
  const { setFlag, resetFlags } = useFeatureFlagActions();

  return (
    <div className="mt-8 border-zinc-800 border-t border-dashed pt-8">
      <h3 className="mb-4 font-black font-mono text-xs text-zinc-500 tracking-widest">FEATURE.FLAGS</h3>
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
