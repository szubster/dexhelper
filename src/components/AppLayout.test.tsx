/**
 * @vitest-environment jsdom
 */
import '@testing-library/jest-dom';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { parseSaveFile } from '../engine/saveParser/index';
import { useStore } from '../store';
import { AppLayout } from './AppLayout';

// Mock the parseSaveFile dependency
vi.mock('../engine/saveParser/index', () => ({
  parseSaveFile: vi.fn(),
}));

// Setup a simple TanStack router for testing since AppLayout uses <Link>
const rootRoute = createRootRoute();
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <AppLayout>
      <div data-testid="child">Child Content</div>
    </AppLayout>
  ),
});
const routeTree = rootRoute.addChildren([indexRoute]);

function renderWithRouter() {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const router = createRouter({ routeTree, history });
  return render(<RouterProvider router={router} />);
}

describe('AppLayout Error Handling', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    useStore.setState({ saveData: null, error: null });
  });

  it('displays an error message when save file parsing fails', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Corrupted save file';

    // Setup the mock to throw an error
    vi.mocked(parseSaveFile).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    renderWithRouter();

    // Wait for the file input to be available
    const fileInput = await waitFor(() => {
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).not.toBeNull();
      return input;
    });

    // Create a mock file
    const file = new File(['mock binary data'], 'test.sav', { type: 'application/octet-stream' });

    // Simulate file upload
    await user.upload(fileInput, file);

    // Assert that parseSaveFile was called
    await waitFor(() => {
      expect(parseSaveFile).toHaveBeenCalled();
    });

    // Assert that the error is displayed in the UI
    await waitFor(() => {
      expect(screen.getByText('System Error')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    // Assert that store state has been updated correctly
    expect(useStore.getState().error).toBe(errorMessage);
    expect(useStore.getState().saveData).toBeNull();
  });
});
