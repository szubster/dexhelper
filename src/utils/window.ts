/**
 * Wrapper for window.location.reload to allow easier mocking in tests.
 */
export const reloadPage = () => {
  window.location.reload();
};

/**
 * Wrapper for window.location.href assignment to allow easier mocking in tests.
 */
export const redirectPage = (url: string) => {
  window.location.href = url;
};
