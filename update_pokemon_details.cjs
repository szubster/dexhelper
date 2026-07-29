const fs = require('fs');
const content = fs.readFileSync('src/components/PokemonDetails.tsx', 'utf8');

const search = `  return (
    <TacticalModal
      isOpen={true}
      onClose={onClose}
      ariaLabel={\`Details for \${pokemonName}\`}
      containerClassName="items-end p-0 sm:items-center sm:p-4"
      backdropClassName="bg-black/90 backdrop-blur-xl"
      dialogClassName="slide-in-from-bottom-[100%] flex h-[95vh] flex-col overflow-hidden rounded-none border-[var(--theme-primary)]/30 border-t-2 bg-zinc-950/95 shadow-[0_0_50px_rgba(var(--theme-primary-rgb),0.1)] ease-out sm:h-[85vh] sm:max-w-6xl sm:border-2 sm:flex-row"
    >
      <ScanlineOverlay />

      {/* Sidebar / Header Section */}
      <div className="relative flex shrink-0 flex-col items-center border-[var(--theme-primary)]/20 border-b bg-gradient-to-b from-[var(--theme-primary)]/10 to-transparent p-6 sm:w-80 sm:border-r sm:border-b-0 sm:bg-gradient-to-br sm:p-8">
        <div className="flex w-full flex-col items-center gap-6 sm:gap-8">
          <div className="group relative">
            <div className="zoom-in-50 fade-in relative flex h-32 w-32 animate-in items-center justify-center overflow-hidden rounded-none border border-[var(--theme-primary)]/40 border-dashed bg-black/60 fill-mode-both shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-colors delay-100 duration-500 group-hover:border-[var(--theme-primary)] group-hover:bg-black/80 sm:h-56 sm:w-56">
              <LcdGrid className="opacity-10" color="var(--theme-primary)" />
              <HoverScanner />
              <PokemonSprite
                pokemonId={pokemonId}
                generation={saveData?.generation ?? 1}
                isShiny={isShiny}
                alt={pokemonName}
                className="relative z-10 h-24 w-24 object-contain drop-shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.4)] transition-transform duration-500 group-hover:scale-110 sm:h-40 sm:w-40"
              />
              <CornerCrosshairs
                thickness={2}
                className="h-3 w-3 border-[var(--theme-primary)]/60 transition-colors group-hover:border-[var(--theme-primary)]"
              />
            </div>

            <ShinyBadge isShiny={isShiny} isShinyCarrier={isShinyCarrier} size="md" />
          </div>

          <div className="w-full text-center sm:text-left">
            <div className="slide-in-from-bottom-4 fade-in flex animate-in flex-col fill-mode-both delay-200 duration-500">
              <span className="mb-2 font-black font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-[0.4em]">
                [ SUBJECT_ID: {pokemonId.toString().padStart(3, '0')} ]
              </span>
              <h2 className="mb-6 break-words break-all font-black font-display text-4xl text-white uppercase leading-none tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] sm:break-normal sm:text-4xl lg:text-5xl">
                {pokemonName}
              </h2>
              <div className="flex flex-wrap justify-center gap-3 sm:flex-col sm:justify-start">
                {stadiumReward && (
                  <div className="tactical-text flex w-fit items-center gap-2 rounded-none border border-blue-500/50 border-dashed bg-blue-500/10 px-3 py-1.5 text-[10px] text-blue-400 backdrop-blur-md">
                    <Monitor size={12} /> Stadium Reward
                  </div>
                )}

                {saveData && (
                  <div
                    className={cn(
                      'flex w-fit items-center gap-2 rounded-none border border-dashed px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md',
                      yourPokemon.length > 0
                        ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                        : 'border-red-500/50 bg-red-500/10 text-red-500',
                    )}
                  >
                    {yourPokemon.length > 0 ? (
                      <>
                        <CheckCircle2 size={12} className="animate-pulse" />
                        Status: Secured
                      </>
                    ) : (
                      <>
                        <AlertCircle size={12} />
                        Status: Unsecured
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TacticalIconButton
        onClick={onClose}
        aria-label="Close details"
        title="Close details"
        className="group absolute top-4 right-4 z-50 rounded-none border border-white/20 bg-black/40 p-2 hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/20 active:scale-95 sm:top-6 sm:right-6 sm:p-3"
      >
        <X size={20} className="text-zinc-400 transition-colors group-hover:text-[var(--theme-primary)]" />
      </TacticalIconButton>

      <div className="custom-scrollbar relative flex-1 overflow-y-auto p-6 sm:p-10">
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-12">
          {/* Left Column: Catching */}
          <div className="space-y-10 xl:col-span-5">
            {catchRate !== null && (
              <PokemonCatchProbability catchRate={catchRate} effectivePokeball={effectivePokeball} />
            )}
          </div>

          {/* Right Column: Details & Locations */}
          <div className="space-y-12 xl:col-span-7">
            <PokemonCaughtDetails yourPokemon={yourPokemon} />
            {pokemonId === 201 && saveData?.generation === 2 && <UnownDexPanel yourPokemon={yourPokemon} />}

            <PokemonEvolutions
              evoReq={evoReq}
              evolvesTo={evolvesTo || []}
              breedingInfo={breedingInfo}
              hasPreEvo={hasPreEvo}
              onNavigate={onNavigate}
              yourPokemonLength={yourPokemon.length}
              pokemonId={pokemonId}
              gameVersion={gameVersion}
              saveData={saveData}
            />

            <PokemonLocations
              pokemonId={pokemonId}
              gameVersion={gameVersion}
              encounters={encounters}
              areaNames={areaNames}
              evoReq={evoReq}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </TacticalModal>
  );
}`;

const replace = `  return (
    <TacticalModal
      isOpen={true}
      onClose={onClose}
      ariaLabel={\`Details for \${pokemonName}\`}
      containerClassName="items-end p-0 sm:items-center sm:p-4"
      backdropClassName="bg-black/90 backdrop-blur-xl"
      dialogClassName="slide-in-from-bottom-[100%] flex h-[95vh] flex-col overflow-hidden rounded-none border-[var(--theme-primary)]/30 border-t-2 bg-zinc-950/95 shadow-[0_0_50px_rgba(var(--theme-primary-rgb),0.1)] ease-out sm:h-[85vh] sm:max-w-6xl sm:border-2"
    >
      <ScanlineOverlay />

      {/* Top Header / Target Lock Section */}
      <div className="relative flex shrink-0 flex-col items-center border-[var(--theme-primary)]/20 border-b bg-gradient-to-b from-[var(--theme-primary)]/10 to-transparent p-4 sm:flex-row sm:items-stretch sm:justify-start sm:p-6 lg:p-8">

        {/* Hardware hazard stripe lip */}
        <div
          className="absolute top-0 right-0 left-0 h-1 opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, var(--theme-primary) 25%, transparent 25%, transparent 50%, var(--theme-primary) 50%, var(--theme-primary) 75%, transparent 75%, transparent)',
            backgroundSize: '10px 10px',
          }}
        />

        <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:gap-8">
          <div className="group relative shrink-0">
            <div className="zoom-in-50 fade-in relative flex h-32 w-32 animate-in items-center justify-center overflow-hidden rounded-none border border-[var(--theme-primary)]/40 border-dashed bg-black/60 fill-mode-both shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-colors delay-100 duration-500 group-hover:border-[var(--theme-primary)] group-hover:bg-black/80">
              <LcdGrid className="opacity-10" color="var(--theme-primary)" />
              <HoverScanner />
              <PokemonSprite
                pokemonId={pokemonId}
                generation={saveData?.generation ?? 1}
                isShiny={isShiny}
                alt={pokemonName}
                className="relative z-10 h-24 w-24 object-contain drop-shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.4)] transition-transform duration-500 group-hover:scale-110"
              />
              <CornerCrosshairs
                thickness={2}
                className="h-3 w-3 border-[var(--theme-primary)]/60 transition-colors group-hover:border-[var(--theme-primary)]"
              />
            </div>

            <ShinyBadge isShiny={isShiny} isShinyCarrier={isShinyCarrier} size="md" />
          </div>

          <div className="flex w-full flex-col justify-center text-center sm:text-left">
            <div className="slide-in-from-bottom-4 fade-in flex animate-in flex-col fill-mode-both delay-200 duration-500">
              <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
                <span className="font-black font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-[0.4em]">
                  [ SUBJECT_ID: {pokemonId.toString().padStart(3, '0')} ]
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--theme-primary)]/50 to-transparent hidden sm:block" />
              </div>

              <h2 className="mb-4 break-words break-all font-black font-display text-4xl text-white uppercase leading-none tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] sm:break-normal sm:text-4xl lg:text-5xl">
                {pokemonName}
              </h2>
              <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                {stadiumReward && (
                  <div className="tactical-text flex w-fit items-center gap-2 rounded-none border border-blue-500/50 border-dashed bg-blue-500/10 px-3 py-1.5 text-[10px] text-blue-400 backdrop-blur-md">
                    <Monitor size={12} /> Stadium Reward
                  </div>
                )}

                {saveData && (
                  <div
                    className={cn(
                      'flex w-fit items-center gap-2 rounded-none border border-dashed px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md',
                      yourPokemon.length > 0
                        ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                        : 'border-red-500/50 bg-red-500/10 text-red-500',
                    )}
                  >
                    {yourPokemon.length > 0 ? (
                      <>
                        <CheckCircle2 size={12} className="animate-pulse" />
                        Status: Secured
                      </>
                    ) : (
                      <>
                        <AlertCircle size={12} />
                        Status: Unsecured
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TacticalIconButton
        onClick={onClose}
        aria-label="Close details"
        title="Close details"
        className="group absolute top-4 right-4 z-50 rounded-none border border-white/20 bg-black/40 p-2 hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/20 active:scale-95 sm:top-6 sm:right-6 sm:p-3"
      >
        <X size={20} className="text-zinc-400 transition-colors group-hover:text-[var(--theme-primary)]" />
      </TacticalIconButton>

      {/* Main Data Matrix Grid */}
      <div className="custom-scrollbar relative flex-1 overflow-y-auto bg-zinc-950/40 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-8">
          {/* Left Column Data Feed */}
          <div className="flex flex-col gap-6 xl:gap-8">
             {catchRate !== null && (
              <PokemonCatchProbability catchRate={catchRate} effectivePokeball={effectivePokeball} />
            )}

            <PokemonEvolutions
              evoReq={evoReq}
              evolvesTo={evolvesTo || []}
              breedingInfo={breedingInfo}
              hasPreEvo={hasPreEvo}
              onNavigate={onNavigate}
              yourPokemonLength={yourPokemon.length}
              pokemonId={pokemonId}
              gameVersion={gameVersion}
              saveData={saveData}
            />
          </div>

          {/* Right Column Data Feed */}
          <div className="flex flex-col gap-6 xl:gap-8">
            <PokemonCaughtDetails yourPokemon={yourPokemon} />
            {pokemonId === 201 && saveData?.generation === 2 && <UnownDexPanel yourPokemon={yourPokemon} />}

            <PokemonLocations
              pokemonId={pokemonId}
              gameVersion={gameVersion}
              encounters={encounters}
              areaNames={areaNames}
              evoReq={evoReq}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </TacticalModal>
  );
}`;

fs.writeFileSync('src/components/PokemonDetails.tsx', content.replace(search, replace), 'utf8');