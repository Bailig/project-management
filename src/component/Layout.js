import React from "react"
import Header from "./Header"
import Form from "./Form/Form"
import ProjectList from "./Project/ProjectList"
import Footer from "./Footer"
import "./_Layout.scss"

export default class Layout extends React.Component{
    render() {                    
        return (
            <div>
                <Header />
                    <Form />
                    <ProjectList />
                <Footer />
            </div>
        )
    }
}