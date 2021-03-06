import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/modal';
import SidebarProvider from './context/sidebar-context';
import WorkspaceProvider from './context/workspace-context';
import CardStateProvider from './context/card-state-context';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CardStateProvider>
        <WorkspaceProvider>
          <SidebarProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </SidebarProvider>
        </WorkspaceProvider>
      </CardStateProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
