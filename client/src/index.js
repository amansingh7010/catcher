import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import gameStateReducer from './features/game-state';
import scoreReducer from './features/score';
import notificationReducer from './features/notification';
import playerReducer from './features/player';

const store = configureStore({
  reducer: {
    gameState: gameStateReducer,
    score: scoreReducer,
    notifications: notificationReducer,
    player: playerReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
