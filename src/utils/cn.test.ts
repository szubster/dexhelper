import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('should merge simple class strings', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should handle falsy values properly', () => {
    expect(cn('class1', false, null, undefined, 0, '', 'class2')).toBe('class1 class2');
  });

  it('should handle objects with boolean values', () => {
    expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2');
  });

  it('should merge tailwind classes properly overriding conflicting ones', () => {
    // p-2 vs p-4, twMerge should keep the latter
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('should handle complex conditional combinations', () => {
    const isError = true;
    const isPrimary = false;

    expect(cn(
      'base-class',
      isError && 'text-red-500',
      isPrimary && 'bg-blue-500',
      { 'opacity-50': !isError },
      ['array-class', 'another-class']
    )).toBe('base-class text-red-500 array-class another-class');
  });

  it('should handle tailwind colors correctly', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
  });
});
