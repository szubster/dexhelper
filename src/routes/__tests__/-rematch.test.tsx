import { describe, expect, it } from 'vitest';
import { Route } from '../rematch';

describe('rematch route', () => {
  it('should export a Route with correct component', () => {
    expect(Route).toBeDefined();
    expect(Route.options.component).toBeDefined();
  });
});
