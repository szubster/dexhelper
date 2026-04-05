import { AlertCircle, Bug } from "lucide-react";
import type { RejectedSuggestion } from "../../hooks/useAssistant";

interface AssistantDebugViewProps {
	rejected: RejectedSuggestion[];
	getPokemonName: (id: number) => string;
}

export function AssistantDebugView({
	rejected,
	getPokemonName,
}: AssistantDebugViewProps) {
	if (rejected.length === 0) return null;

	return (
		<div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="flex items-center gap-3 px-2">
				<div className="p-2 rounded-xl border bg-amber-500/10 border-amber-500/30 text-amber-400">
					<Bug size={16} />
				</div>
				<h3 className="text-xl font-display font-black text-white uppercase tracking-widest">
					Debug: Rejected Suggestions
				</h3>
			</div>

			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
				{rejected.map((r, i) => (
					<div
						key={`${r.pokemonId}-${i}`}
						className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4 flex items-start gap-4 hover:border-zinc-700 transition-colors"
					>
						<div className="w-12 h-12 bg-zinc-800 rounded-xl p-1 flex-shrink-0 border border-white/5 relative">
							<img
								src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${r.pokemonId}.png`}
								alt="Sprite"
								className="w-full h-full object-contain pixelated grayscale opacity-50"
							/>
							<div className="absolute -top-1 -right-1">
								<AlertCircle
									size={14}
									className="text-amber-500 fill-zinc-900"
								/>
							</div>
						</div>
						<div className="space-y-1 overflow-hidden">
							<div className="flex items-center gap-2">
								<span className="text-[10px] font-mono font-bold text-zinc-500">
									#{r.pokemonId.toString().padStart(3, "0")}
								</span>
								<span className="text-xs font-black text-zinc-300 uppercase tracking-tight truncate">
									{getPokemonName(r.pokemonId)}
								</span>
								<span className="text-[8px] font-black bg-zinc-800 text-zinc-500 px-1 py-0.5 rounded border border-white/5 uppercase">
									{r.code}
								</span>
							</div>
							<p className="text-[10px] font-medium text-zinc-500 leading-tight italic">
								"{r.reason}"
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
