/// <reference types="vite/client" />

interface Window {
  // biome-ignore lint/suspicious/noExplicitAny: External Google API globals loaded via script tag
  gapi: any;
  // biome-ignore lint/suspicious/noExplicitAny: External Google API globals loaded via script tag
  google: any;
}
