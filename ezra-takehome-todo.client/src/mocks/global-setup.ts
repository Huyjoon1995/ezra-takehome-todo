import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Setup MSW server for Node.js environment (Playwright)
const server = setupServer(...handlers);

export default async function globalSetup() {
  // Start the MSW server
  server.listen({
    onUnhandledRequest: 'warn',
  });

  console.log('MSW server started for Playwright tests');
}
