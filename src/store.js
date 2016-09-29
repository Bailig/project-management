import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import reducer from "./reducer/reducer"


// middleware listen to dispatch to get the action, and then modify the action. if action is not sent, reducer will not be run. we send action by using next(action) statement.
const middleware = applyMiddleware(promise(), thunk, logger())

// store. 0 is the initial state in this case.
export default createStore(reducer, middleware)