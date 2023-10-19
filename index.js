import redux from 'redux';
import { legacy_createStore as createStore, applyMiddleware  } from 'redux';

const initialState = {
    count: 0,
    finished: false
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "CLICK": {
        return {
          ...state,
          count: state.count + 1
        };
      }
      case "DISABLE": {
        return {
          ...state,
          finished: true
        };
      }
      default: {
        return state;
      }
    }
  };
   
  const loggerMiddleware = (store) => (next) => (action) => {
    if (store.getState().count >= 4 && action.type === "CLICK") {
      store.dispatch({
        type: "DISABLE"
      });
    }
    return next(action);
  };
  
  const store = createStore(reducer, applyMiddleware(loggerMiddleware));
  
  store.subscribe(() => {
    document.getElementById("counter").innerHTML = store.getState().count;
  });
  
  document.getElementById("button").addEventListener("click", () => {
    if (store.getState().finished) return;
    store.dispatch({
      type: "CLICK"
    });
  });