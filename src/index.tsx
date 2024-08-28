import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

import { ThemeProvider } from 'styled-components';
import { theme } from './globalStyles/Theme';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/28-08-task-04">
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
