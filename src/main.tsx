import { registerSW } from 'virtual:pwa-register';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Single SW registration point — vite-plugin-pwa handles generation.
// Do NOT call navigator.serviceWorker.register() anywhere else.
registerSW({
  immediate: true,
  onRegistered(r) {
    if (r) console.log('[PWA] Service worker registered:', r.scope);
  },
  onRegisterError(error) {
    console.error('[PWA] Service worker registration failed:', error);
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
