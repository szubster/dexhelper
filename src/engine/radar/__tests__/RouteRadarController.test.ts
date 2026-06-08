import { describe, expect, it } from 'vitest';
import type { Suggestion } from '../../assistant/strategies/types';
import { RouteRadarController } from '../RouteRadarController';

describe('RouteRadarController', () => {
  it('should instantiate correctly', () => {
    const controller = new RouteRadarController();
    expect(controller).toBeInstanceOf(RouteRadarController);
  });

  it('should throw Not implemented for calculateHeatmap currently', () => {
    const controller = new RouteRadarController();
    const suggestions: Suggestion[] = [];

    expect(() => {
      controller.calculateHeatmap(suggestions);
    }).toThrowError('Not implemented');
  });
});
