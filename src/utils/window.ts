/**
 * Wrapper for window.location.reload to allow easier mocking in tests.
 */
export const reloadPage = () => {
  window.location.reload();
};
