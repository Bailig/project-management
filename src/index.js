// library
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

// component
import Layout from "./component/Layout"

// store
import store from "./store"

const app = document.getElementById("app")
ReactDOM.render(
    <Provider store={store}>
        <Layout/>
    </Provider>
    , app)

