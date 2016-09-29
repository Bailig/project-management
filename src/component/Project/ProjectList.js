import React from "react"
import Project from "./Project"
import { connect } from "react-redux"

import "./_Project.scss"

@connect((store) => {
    return {
        filteredProject: store.project.search.filteredProject
    }
})

export default class ProjectList extends React.Component{
    mapProject(){
        const mappedProject = this.props.filteredProject.map((project,i) => {
            return(
                <Project key={project.id} edit={project.edit} check={project.check} project={project} />
            )
        })
        return mappedProject
    }
    render() {
        return (
            <article className="container" id="projectList">
                <div className="row">
                    <ul className="col-md-10 col-md-push-1">
                        {this.mapProject()}
                    </ul>
                </div>
            </article>
        )
    }
}