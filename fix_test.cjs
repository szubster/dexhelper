const fs = require('fs');
let code = fs.readFileSync('src/routes/__tests__/-in-game-trades.test.tsx', 'utf8');

const fix = `
  it('renders trades when generation is 3', async () => {
    useStore.setState({
      saveData: {
        generation: 3,
        gameVersion: 'emerald',
        owned: new Set<number>(),
        party: [],
        pc: [],
        gen3NPCTrades: {},
      } as unknown as SaveData,
    });
    const router = createMockRouter(Component ? <Component /> : null);
    await render(<RouterProvider router={router} />);
    await expect.element(page.getByText('IN-GAME TRADES')).toBeVisible();
  });
`;

code = code.replace(/it\('renders trades when generation is 3'[\s\S]*?\}\);/m, fix.trim());
fs.writeFileSync('src/routes/__tests__/-in-game-trades.test.tsx', code);
