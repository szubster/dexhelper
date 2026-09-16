import { RngExplainer } from '../../rng/RngExplainer';
import { TacticalBlockHeader } from '../../TacticalBlockHeader';

export function RngCalculatorDashboard() {
  return (
    <div className="flex flex-col gap-4">
      <TacticalBlockHeader title="Trainer ID & Secret ID Info" trackingLabel="RNG CALCULATOR TOOLBOX" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <RngExplainer />
      </div>
    </div>
  );
}
