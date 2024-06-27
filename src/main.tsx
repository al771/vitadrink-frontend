import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    RouterProvider,
} from "react-router-dom";
import { DeviceThemeProvider } from '@salutejs/plasma-ui/components/Device';
import { GlobalStyle } from './GlobalStyle';

import {router} from "./router";
import './index.css';
import {AssistantProvider} from "./contexts/AssistantContext";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <DeviceThemeProvider>
          <AssistantProvider>
              <GlobalStyle />
              <RouterProvider router={router} />
          </AssistantProvider>
      </DeviceThemeProvider>
  </React.StrictMode>,
)
