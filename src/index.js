console.log('Application starting...');

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div style={{
    padding: '20px',
    margin: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}>
    <h1 style={{ color: '#e53e3e', marginBottom: '10px' }}>Something went wrong</h1>
    <p style={{ color: '#4a5568', marginBottom: '20px' }}>
      The application encountered an error. Please try refreshing the page.
    </p>
    {process.env.NODE_ENV === 'development' && (
      <pre style={{
        whiteSpace: 'pre-wrap',
        backgroundColor: '#f7fafc',
        padding: '15px',
        borderRadius: '4px',
        color: '#2d3748',
        fontSize: '14px'
      }}>
        {error?.message}
        {'\n\n'}
        {error?.stack}
      </pre>
    )}
    <button 
      onClick={resetErrorBoundary}
      style={{
        padding: '10px 15px',
        backgroundColor: '#4a90e2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '15px'
      }}
    >
      Try again
    </button>
  </div>
);

// Initialize app with error handling
const initializeApp = () => {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Failed to find the root element. Make sure there is a <div id="root"></div> in your HTML.');
  }

  try {
    const root = createRoot(container);
    root.render(
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('Failed to initialize the application:', error);
    container.innerHTML = `
      <div style="padding: 20px; color: #e53e3e;">
        <h1>Failed to start the application</h1>
        <p>Please try refreshing the page. If the problem persists, contact support.</p>
        ${process.env.NODE_ENV === 'development' ? `<pre>${error.stack}</pre>` : ''}
      </div>
    `;
  }
};

// Start the application
initializeApp(); 