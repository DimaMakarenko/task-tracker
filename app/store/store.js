import createSagaMiddleware from '@redux-saga/core';
import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './rootReducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeEnhancer(applyMiddleware(sagaMiddleware)));
