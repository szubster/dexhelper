import {
  Background,
  BackgroundVariant,
  Controls,
  type Edge,
  Handle,
  type Node,
  Position,
  ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useMemo } from 'react';

type FacilityData = {
  label: string;
  silverSymbol: boolean;
  goldSymbol: boolean;
  currentStreak: number;
  brainEncounterAt: number;
};

type WalletData = {
  bp: number;
};

const FacilityNode = ({ data }: { data: FacilityData }) => {
  const progressPercent = Math.min((data.currentStreak / data.brainEncounterAt) * 100, 100);

  return (
    <div className="tactical-panel flex w-48 flex-col items-center gap-2 bg-zinc-950 p-4 text-center">
      <Handle type="target" position={Position.Top} className="!bg-zinc-700 !w-3 !h-3 !rounded-none !border-zinc-500" />
      <h3 className="w-full border-zinc-700 border-b border-dashed pb-1 font-bold text-zinc-100">{data.label}</h3>
      <div className="flex gap-2 text-xs">
        <span className={data.silverSymbol ? 'text-zinc-300' : 'text-zinc-700'}>Silver</span>
        <span className={data.goldSymbol ? 'text-yellow-500' : 'text-zinc-700'}>Gold</span>
      </div>
      <div className="mt-2 w-full">
        <div className="mb-1 flex justify-between text-[10px] text-zinc-500">
          <span>Streak: {data.currentStreak}</span>
          <span>Next Brain: {data.brainEncounterAt}</span>
        </div>
        <div className="relative h-2 w-full rounded-none border border-zinc-700 border-dashed bg-zinc-800">
          <div
            className="absolute top-0 left-0 h-full bg-zinc-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-zinc-700 !w-3 !h-3 !rounded-none !border-zinc-500"
      />
    </div>
  );
};

const WalletNode = ({ data }: { data: WalletData }) => (
  <div className="tactical-panel flex w-32 flex-col items-center gap-2 border-green-500 bg-zinc-950 p-4">
    <Handle type="target" position={Position.Top} className="!bg-green-500 !w-3 !h-3 !rounded-none" />
    <h3 className="font-bold text-green-500">BP WALLET</h3>
    <div className="text-2xl text-green-400">{data.bp}</div>
    <Handle type="source" position={Position.Bottom} className="!bg-green-500 !w-3 !h-3 !rounded-none" />
  </div>
);

const nodeTypes = {
  facility: FacilityNode,
  wallet: WalletNode,
};

const initialNodes: Node[] = [
  { id: 'wallet', type: 'wallet', position: { x: 400, y: 50 }, data: { bp: 150 } },
  {
    id: 'tower',
    type: 'facility',
    position: { x: 100, y: 200 },
    data: { label: 'Battle Tower', silverSymbol: true, goldSymbol: false, currentStreak: 35, brainEncounterAt: 70 },
  },
  {
    id: 'dome',
    type: 'facility',
    position: { x: 300, y: 200 },
    data: { label: 'Battle Dome', silverSymbol: false, goldSymbol: false, currentStreak: 12, brainEncounterAt: 20 },
  },
  {
    id: 'palace',
    type: 'facility',
    position: { x: 500, y: 200 },
    data: { label: 'Battle Palace', silverSymbol: false, goldSymbol: false, currentStreak: 0, brainEncounterAt: 21 },
  },
  {
    id: 'arena',
    type: 'facility',
    position: { x: 700, y: 200 },
    data: { label: 'Battle Arena', silverSymbol: false, goldSymbol: false, currentStreak: 5, brainEncounterAt: 28 },
  },
  {
    id: 'factory',
    type: 'facility',
    position: { x: 200, y: 400 },
    data: { label: 'Battle Factory', silverSymbol: false, goldSymbol: false, currentStreak: 0, brainEncounterAt: 21 },
  },
  {
    id: 'pike',
    type: 'facility',
    position: { x: 400, y: 400 },
    data: { label: 'Battle Pike', silverSymbol: false, goldSymbol: false, currentStreak: 20, brainEncounterAt: 28 },
  },
  {
    id: 'pyramid',
    type: 'facility',
    position: { x: 600, y: 400 },
    data: { label: 'Battle Pyramid', silverSymbol: false, goldSymbol: false, currentStreak: 0, brainEncounterAt: 21 },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e-wallet-tower',
    source: 'wallet',
    target: 'tower',
    animated: true,
    style: { stroke: '#3f3f46', strokeDasharray: '5,5' },
  },
  {
    id: 'e-wallet-dome',
    source: 'wallet',
    target: 'dome',
    animated: true,
    style: { stroke: '#3f3f46', strokeDasharray: '5,5' },
  },
  {
    id: 'e-wallet-palace',
    source: 'wallet',
    target: 'palace',
    animated: true,
    style: { stroke: '#3f3f46', strokeDasharray: '5,5' },
  },
  {
    id: 'e-wallet-arena',
    source: 'wallet',
    target: 'arena',
    animated: true,
    style: { stroke: '#3f3f46', strokeDasharray: '5,5' },
  },
];

export const BattleFrontierDashboard = () => {
  const nodes = useMemo(() => initialNodes, []);
  const edges = useMemo(() => initialEdges, []);

  return (
    <div className="h-[600px] w-full border border-zinc-700 border-dashed font-mono">
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView className="bg-zinc-950">
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#3f3f46" />
        <Controls showInteractive={false} className="!rounded-none !border !border-dashed !border-zinc-700" />
      </ReactFlow>
    </div>
  );
};
