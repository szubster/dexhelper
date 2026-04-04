import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import { QueryClientProvider } from '@tanstack/solid-query';
import { queryClient } from './queryClient';
import './index.css';

import { AppLayout } from './components/AppLayout';
import { IndexRoute } from './routes/index';

// Register Service Worker (production only — SW breaks Vite HMR in dev)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(err => {
      console.error('ServiceWorker registration failed: ', err);
    });
  });
}

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error('Root element not found');
}

render(
  () => (
    <QueryClientProvider client={queryClient}>
      <Router base={import.meta.env.BASE_URL} root={AppLayout}>
        <Route path="/" component={IndexRoute} />
        {/* Other routes are stubbed out for this prototype */}
      </Router>
    </QueryClientProvider>
  ),
  root!
);
