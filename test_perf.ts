import { renderToString } from 'react-dom/server';
import React from 'react';
import { StorageGrid } from './src/components/StorageGrid';
import { useStore } from './src/store';

// Mock the dependencies
jest.mock('./src/store', () => ({
  useStore: jest.fn()
}));
jest.mock('@tanstack/react-router', () => ({
  useNavigate: () => jest.fn()
}));
jest.mock('./src/utils/generationConfig', () => ({
  getGenerationConfig: () => ({ boxCount: 14, spriteUrl: (id, shiny) => `sprite-${id}-${shiny}` })
}));
