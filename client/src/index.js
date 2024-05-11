import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './authentication/AuthContext.js';
import { LoadingProvider } from './components/Loading/LoadingContext.js';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
        <AuthProvider>
          <LoadingProvider>
        <Router>
          <App />
          </Router>
    </LoadingProvider>

    </AuthProvider>
  </StrictMode>
);