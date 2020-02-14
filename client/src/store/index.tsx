import { Store, createStore, applyMiddleware, combineReducers } from "redux";

// We'll be using Redux Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import throttle from "lodash/throttle";

import { createLogger } from "./middleware";
import { loadState, saveState } from "./utils/localStorage";

import { shipmentReducer } from "../features/shipments/reducers";
import { ApplicationState, ShipmentP } from "./types";

const rootReducer = combineReducers<ApplicationState>({
  app: shipmentReducer
});

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = () => rootReducer;
//----------------

export default function configureStore(): Store<ApplicationState> {
  let middleware = applyMiddleware(thunkMiddleware, createLogger(false));

  // create the composing function for our middlewares
  if (process.env.NODE_ENV !== "production") {
    middleware = composeWithDevTools(middleware);
  }

  const prevState = loadState();

  const persistedState: ShipmentP = {
    app: {
      shipments: prevState ? prevState.shipments : null,
      searchedRecords: null,
      loading: false,
      didSearch: false
    }
  };

  const store = createStore(createRootReducer(), persistedState, middleware);

  store.subscribe(
    throttle(() => {
      saveState({ shipments: store.getState().app.shipments });
    }, 1000)
  );

  return store;
}
