import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Network } from 'lucide-react';
import { BoxAnalyzerView } from '../components/box-analyzer/BoxAnalyzerView';
import { EmptyState } from '../components/EmptyState';
import { useStore } from '../store';
import { pokemonListQueryOptions } from '../utils/pokemonQueries';

export const Route = createFileRoute('/box-analyzer')({
  component: BoxAnalyzerPage,
});

function BoxAnalyzerPage() {
  const saveData = useStore((s) => s.saveData);
  const { data: pokemonList } = useSuspenseQuery(pokemonListQueryOptions);

  if (!saveData) {
    return <EmptyState icon={<Network size={24} />} label="SYSTEM OFFLINE" />;
  }

  return <BoxAnalyzerView pokemonList={pokemonList} />;
}
