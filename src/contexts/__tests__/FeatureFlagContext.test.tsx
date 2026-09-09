import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { FeatureFlagProvider, parseFeatureFlags, useFeatureFlagActions, useFeatureFlags } from '../FeatureFlagContext';

describe('FeatureFlagContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('parseFeatureFlags', () => {
    it('should parse environment variables starting with VITE_FF_', () => {
      const env = {
        VITE_FF_WIP_SOMETHING: 'true',
        VITE_FF_DISABLED_FEATURE: 'false',
        VITE_OTHER_VAR: 'true',
      };

      const flags = parseFeatureFlags(env);

      expect(flags).toEqual({
        WIP_SOMETHING: true,
        DISABLED_FEATURE: false,
      });
    });

    it('should handle boolean types directly', () => {
      const env = {
        VITE_FF_DIRECT_BOOLEAN: true,
        VITE_FF_DIRECT_BOOLEAN_FALSE: false,
      };

      const flags = parseFeatureFlags(env);

      expect(flags).toEqual({
        DIRECT_BOOLEAN: true,
        DIRECT_BOOLEAN_FALSE: false,
      });
    });
  });

  describe('Context and State', () => {
    const TestComponent = () => {
      const flags = useFeatureFlags();
      const { setFlag, resetFlags } = useFeatureFlagActions();

      return (
        <div>
          <div data-testid="flag-wip">{flags['WIP_SOMETHING'] ? 'Enabled' : 'Disabled'}</div>
          <button
            type="button"
            data-testid="toggle-btn"
            onClick={() => setFlag('WIP_SOMETHING', !flags['WIP_SOMETHING'])}
          >
            Toggle
          </button>
          <button type="button" data-testid="reset-btn" onClick={() => resetFlags()}>
            Reset
          </button>
        </div>
      );
    };

    it('should provide default flags from env', async () => {
      const mockEnv = {
        VITE_FF_WIP_SOMETHING: 'true',
      };

      const screen = await render(
        <FeatureFlagProvider env={mockEnv}>
          <TestComponent />
        </FeatureFlagProvider>,
      );

      await expect.element(screen.getByTestId('flag-wip')).toHaveTextContent('Enabled');
    });

    it('should allow toggling flags via actions', async () => {
      const mockEnv = {
        VITE_FF_WIP_SOMETHING: 'false',
      };

      const screen = await render(
        <FeatureFlagProvider env={mockEnv}>
          <TestComponent />
        </FeatureFlagProvider>,
      );

      await expect.element(screen.getByTestId('flag-wip')).toHaveTextContent('Disabled');
      await screen.getByTestId('toggle-btn').click();
      await expect.element(screen.getByTestId('flag-wip')).toHaveTextContent('Enabled');
    });

    it('should allow resetting flags back to env defaults', async () => {
      const mockEnv = {
        VITE_FF_WIP_SOMETHING: 'false',
      };

      const screen = await render(
        <FeatureFlagProvider env={mockEnv}>
          <TestComponent />
        </FeatureFlagProvider>,
      );

      await expect.element(screen.getByTestId('flag-wip')).toHaveTextContent('Disabled');
      await screen.getByTestId('toggle-btn').click();
      await expect.element(screen.getByTestId('flag-wip')).toHaveTextContent('Enabled');
      await screen.getByTestId('reset-btn').click();
      await expect.element(screen.getByTestId('flag-wip')).toHaveTextContent('Disabled');
    });
  });
});
