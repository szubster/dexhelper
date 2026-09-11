import type React from 'react';
import { useEffect, useState } from 'react';
import { HardwareScrews } from '../HardwareScrews';

export interface HallOfFameRecord {
  playerName: string;
  pokemon: {
    speciesId: number;
    level: number;
    nickname: string;
  }[];
}

interface HiddenCertificateProps {
  record: HallOfFameRecord;
  gameVersion: string;
}

export const HiddenCertificate: React.FC<HiddenCertificateProps> = ({ record, gameVersion }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    void document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) {
    return (
      <div
        className="pointer-events-none absolute top-0 left-0 -z-50 opacity-0"
        id="hof-certificate-hidden-container"
      />
    );
  }

  return (
    <div
      id="hof-certificate-hidden-container"
      className="pointer-events-none absolute top-0 left-0 -z-50 flex h-[630px] w-[1200px] flex-col rounded-none border-4 border-zinc-700 border-dashed bg-zinc-950 p-12 font-mono text-zinc-100 opacity-0"
    >
      <HardwareScrews />

      <div className="mb-12 border-zinc-800 border-b-2 border-dashed pb-8 text-center">
        <h1 className="font-black text-6xl text-[var(--theme-primary)] tracking-widest">HALL OF FAME</h1>
        <div className="mt-8 flex items-end justify-between px-12">
          <h2 className="text-4xl">TRAINER: {record.playerName}</h2>
          <h3 className="text-2xl text-zinc-400">VERSION: {gameVersion.toUpperCase()}</h3>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-3 content-center gap-8 px-12">
        {record.pokemon.map((pkmn, idx) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Safe here since list is static and read-only
            key={idx}
            className="relative flex flex-col items-center rounded-none border-2 border-zinc-800 border-dashed bg-zinc-900/50 p-6"
          >
            <div className="mb-2 font-bold text-3xl">{pkmn.nickname || `Species ${pkmn.speciesId}`}</div>
            <div className="mb-4 text-xl text-zinc-400">Lvl {pkmn.level}</div>

            <div className="flex h-32 w-32 items-center justify-center rounded-none border-2 border-zinc-700 border-dashed bg-zinc-950">
              <span className="text-2xl text-zinc-500">#{pkmn.speciesId}</span>
            </div>

            {/* LED Status Indicator (ADR 008 Exception) */}
            <div className="absolute top-2 right-2 flex items-center justify-center">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute right-0 bottom-12 left-0 text-center text-sm text-zinc-600">
        [ SYSTEM GENERATED CERTIFICATE {/* DATA SECURE // END OF RECORD ] */}
      </div>
    </div>
  );
};
