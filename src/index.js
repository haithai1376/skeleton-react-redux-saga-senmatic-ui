
import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { routerMiddleware, push } from 'react-router-redux'
import { compose, createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import App from './containers/App';
import reducers from './reducers';
import saga from './sagas';
import * as serviceWorker from './serviceWorker';

const persistConfig = { key: 'root', version: 1, storage };
const history = createBrowserHistory();
const routerHistoryMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware();
const reducer = persistReducer(persistConfig, reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(compose(applyMiddleware(sagaMiddleware, routerHistoryMiddleware))));
const persistor = persistStore(store);
console.log(saga);
sagaMiddleware.run(saga);
const render = (Component) => {
  ReactDOM.render(
    <Provider key={Math.random()} store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Route path="/" component={Component}/>
        </Router>
      </PersistGate>
    </Provider>,
    document.querySelector('#app-root')
  );
};

render(App);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
