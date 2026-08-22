import { describe, expect, it } from 'vitest';
import * as Module from './index';

describe('stateVariables index export', () => {
  it('exports expected functions and constants', () => {
    expect(Module.extractEventFlag).toBeDefined();
    expect(Module.extractGameVariable).toBeDefined();
    expect(Module.extractLatestSectionOffset).toBeDefined();
    expect(Module.EVENT_FLAGS_OFFSET).toBeDefined();
    expect(Module.VARS_START).toBeDefined();
    expect(Module.EMERALD_VARS_OFFSET).toBeDefined();
    expect(Module.RS_VARS_OFFSET).toBeDefined();
  });
});
