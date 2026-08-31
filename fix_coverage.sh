cat << 'INNER_EOF' >> src/components/__tests__/StorageGrid.test.tsx

test('renders TimeCapsuleValidation tags when moves are empty array', async () => {
  (useStore as unknown as { mockImplementation: (fn: (selector: unknown) => unknown) => void }).mockImplementation(
    (selector: unknown) =>
      (selector as (state: unknown) => unknown)({
        saveData: {
          generation: 2,
          partyDetails: [
            {
              speciesId: 1, // Gen 1 (Bulbasaur)
              storageLocation: 'Party',
              level: 5,
              isShiny: false,
              hash: '',
              otName: 'RED',
              moves: []
            }
          ],
          pcDetails: [],
        },
      }),
  );

  await render(<StorageGrid pokemonList={[{ id: 1, name: 'Bulbasaur' }]} />);

  await expect.element(page.getByText('[ READY ]')).toBeInTheDocument();
});
INNER_EOF
