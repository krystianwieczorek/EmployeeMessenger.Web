import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import configuration from "../helpers/configFile";
import thunk from "redux-thunk";

const composeTools = configuration.dev.enableReduxDevToolsExtension
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

export const store = createStore(
  rootReducer,
  composeTools(applyMiddleware(thunk))
);
