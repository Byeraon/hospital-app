import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import userSlice from "./user";
import loaderSlice from "./loader";

const rootReducer = combineReducers({
  user: userSlice,
  loader: loaderSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
