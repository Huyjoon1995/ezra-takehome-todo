import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { worker } from './mocks/browser';

// Check if we're in test mode (set by Playwright)
const isTestMode = (window as any).__TEST_MODE__ || process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testing';

// Start MSW worker only for testing
if (isTestMode) {
  worker.start({
    onUnhandledRequest: 'bypass',
  }).catch((error) => {
    console.warn('MSW failed to start:', error);
  });
}

// Conditional Auth0 wrapper - bypass in test mode
const AppWrapper = () => {
  if (isTestMode) {
    // In test mode, bypass Auth0 and render app directly
    return <App />;
  }
  
  // In development and production, use real Auth0
  return (
    <Auth0Provider 
      domain="dev-3fas6re2rfmlpqmh.us.auth0.com" 
      clientId="75Xqorq3EGoB634Hbjb1hVpycxky8O7A" 
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://localhost:7038/api",
        prompt: "login"
      }}
    >
      <App />
    </Auth0Provider>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <AppWrapper />
    </StrictMode>,
)
