import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import * as windowUtils from '../../utils/window';
import { AUTH_LOGGED_IN_INDICATOR, AuthProvider, useAuth } from '../AuthContext';

// Mock redirectPage
vi.mock('../../utils/window', () => ({
  redirectPage: vi.fn<typeof windowUtils.redirectPage>(),
  reloadPage: vi.fn<typeof windowUtils.reloadPage>(),
}));

const TestComponent = () => {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="status">{isLoggedIn ? 'LoggedIn' : 'LoggedOut'}</div>
      <button type="button" onClick={login} data-testid="login-btn">
        Login
      </button>
      <button type="button" onClick={logout} data-testid="logout-btn">
        Logout
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('initializes with false when local storage is empty', async () => {
    const screen = await render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await expect.element(screen.getByTestId('status')).toHaveTextContent('LoggedOut');
  });

  it('initializes with true when local storage has indicator', async () => {
    localStorage.setItem(AUTH_LOGGED_IN_INDICATOR, 'true');

    const screen = await render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await expect.element(screen.getByTestId('status')).toHaveTextContent('LoggedIn');
  });

  it('login updates state, local storage and redirects to cloudflare login', async () => {
    const screen = await render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await screen.getByTestId('login-btn').click();

    await expect.element(screen.getByTestId('status')).toHaveTextContent('LoggedIn');
    expect(localStorage.getItem(AUTH_LOGGED_IN_INDICATOR)).toBe('true');
    expect(windowUtils.redirectPage).toHaveBeenCalledWith('/cdn-cgi/access/login');
  });

  it('logout updates state, clears local storage and redirects to cloudflare logout', async () => {
    localStorage.setItem(AUTH_LOGGED_IN_INDICATOR, 'true');

    const screen = await render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await expect.element(screen.getByTestId('status')).toHaveTextContent('LoggedIn');

    await screen.getByTestId('logout-btn').click();

    await expect.element(screen.getByTestId('status')).toHaveTextContent('LoggedOut');
    expect(localStorage.getItem(AUTH_LOGGED_IN_INDICATOR)).toBeNull();
    expect(windowUtils.redirectPage).toHaveBeenCalledWith('/cdn-cgi/access/logout');
  });
});
