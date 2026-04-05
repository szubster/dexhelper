import { CheckCircle2, CircleDot, MapPin, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import {
	gen2Items,
	gen2Locations,
} from "../../../engine/data/gen2/legacyNameMap";
import { getGenerationConfig } from "../../../utils/generationConfig";

interface PokemonCaughtDetailsProps {
	yourPokemon: any[];
	saveData: any;
}

const contentVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", damping: 20, stiffness: 100 },
	},
} as const;

function calculateHiddenPower(dvs: {
	atk: number;
	def: number;
	spd: number;
	spc: number;
}) {
	const typeMap = [
		"Fighting",
		"Flying",
		"Poison",
		"Ground",
		"Rock",
		"Bug",
		"Ghost",
		"Steel",
		"Fire",
		"Water",
		"Grass",
		"Electric",
		"Psychic",
		"Ice",
		"Dragon",
		"Dark",
	];

	const typeIndex = 4 * (dvs.atk % 4) + (dvs.def % 4);
	const hpType = typeMap[typeIndex];

	const v = dvs.spc >= 8 ? 1 : 0;
	const w = dvs.spd >= 8 ? 1 : 0;
	const x = dvs.def >= 8 ? 1 : 0;
	const y = dvs.atk >= 8 ? 1 : 0;
	const z = dvs.spc % 4;

	const hpPower = Math.floor((5 * (v + 2 * w + 4 * x + 8 * y) + z) / 2) + 31;

	return { type: hpType, power: hpPower };
}

export function PokemonCaughtDetails({
	yourPokemon,
	saveData,
}: PokemonCaughtDetailsProps) {
	if (yourPokemon.length === 0) return null;

	return (
		<div className="space-y-6">
			<motion.h3
				variants={contentVariants}
				className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2"
			>
				<CheckCircle2 size={14} className="text-emerald-500" /> Discovered Units
			</motion.h3>
			<motion.div
				variants={contentVariants}
				className="grid grid-cols-1 sm:grid-cols-2 gap-4"
			>
				{yourPokemon.map((p, i) => (
					<div
						key={i}
						className="glass-card bg-white/5 p-6 rounded-[2rem] border border-white/10 space-y-5 relative overflow-hidden group"
					>
						<div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
							{p.isShiny ? (
								<Sparkles size={40} className="text-amber-400" />
							) : (
								<CircleDot size={40} className="text-white/20" />
							)}
						</div>

						<div className="flex justify-between items-start relative z-10">
							<div>
								<div className="text-2xl font-display font-black text-white tracking-tighter">
									LV.{p.level}
								</div>
								<div className="flex gap-2 items-center mt-1">
									<div className="px-2 py-0.5 bg-[var(--theme-primary)]/20 rounded-md border border-[var(--theme-primary)]/30">
										<span className="text-[9px] font-black text-[var(--theme-primary)] uppercase tracking-widest leading-none">
											{p.location}
										</span>
									</div>
									{p.slot && (
										<div className="px-2 py-0.5 bg-white/5 rounded-md border border-white/10">
											<span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-none">
												Slot {p.slot}
											</span>
										</div>
									)}
								</div>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-x-4 gap-y-2 relative z-10">
							{p.otName && (
								<div className="flex flex-col">
									<span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">
										Original Trainer
									</span>
									<span className="text-[10px] font-bold text-zinc-200 uppercase truncate">
										{p.otName}
									</span>
								</div>
							)}
							{p.item !== undefined && p.item > 0 && (
								<div className="flex flex-col">
									<span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">
										Held Item
									</span>
									<span className="text-[10px] font-bold text-zinc-200 uppercase truncate">
										{gen2Items[p.item]}
									</span>
								</div>
							)}
							{p.friendship !== undefined && (
								<div className="flex flex-col">
									<span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">
										Friendship
									</span>
									<span className="text-[10px] font-bold text-rose-400">
										{p.friendship} pt
									</span>
								</div>
							)}
							{saveData &&
								getGenerationConfig(saveData.generation).hasHiddenPower &&
								p.dvs && (
									<div className="flex flex-col">
										<span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">
											Hidden Power
										</span>
										<span className="text-[10px] font-bold text-blue-400 uppercase">
											{calculateHiddenPower(p.dvs).type}
										</span>
									</div>
								)}
						</div>

						{p.caughtData && (
							<div className="pt-4 border-t border-white/5 space-y-1 relative z-10">
								<span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1">
									<MapPin size={8} /> Origin Point
								</span>
								<div className="text-[10px] font-black text-zinc-300 uppercase tracking-tight truncate">
									{gen2Locations[p.caughtData.location] || "UNKNOWN ZONE"}
								</div>
							</div>
						)}
					</div>
				))}
			</motion.div>
		</div>
	);
}
