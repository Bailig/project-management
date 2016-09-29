import React from "react"
import { connect } from "react-redux"
import { deleteProject, checkProject, updateProject } from "../../action/projectAction"
import { editProject, cancelEdit } from "../../action/editAction"

@connect()

export default class Project extends React.Component{
    deleteProject(){
        this.props.dispatch(deleteProject(this.props.project.id))
    }
    editProject(){
        this.props.dispatch(editProject(this.props.project.id))
    }
    cancelEdit(){
        this.props.dispatch(cancelEdit(this.props.project.id))
    }
    saveEdit(){
        const newProject = {
            id: this.props.project.id,
            title: this.refs.projectTitle.value,
            description: this.refs.description.value,
            website: this.refs.website.value,
            date: this.refs.date.value,
            student: {
                firstName: this.refs.firstName.value,
                lastName: this.refs.lastName.value,
                userName: this.refs.userName.value
            }
        }
        this.props.dispatch(updateProject(newProject, this.props.check))
    }
    checkProject(){
        this.props.dispatch(checkProject(this.props.project.id, this.props.project.check))
    }
    listenCheck(){
        if (this.props.check === "unchecked"){
            return false
        }else{
            return true
        }
    }
    render(){
        return(
            <li className={this.props.check + " " + this.props.edit} id={this.props.project.id}>

                <div className="display">
                    <div className="media-left">
                        <label>
                            <input onChange={this.checkProject.bind(this)} checked={this.listenCheck()} className="check" type="checkbox" />
                        </label>
                    </div>
                    <div className="media-body">
                        <div className="projectTitle">
                            <a href={this.props.project.website} target="_blank">{this.props.project.title}</a>
                            <span className="projectDate">
                                {this.props.project.date}
                            </span>
                        </div>
                        <div className="studentName">{this.props.project.student.firstName} {this.props.project.student.lastName} ({this.props.project.student.userName})
                        </div>
                        <div className="description">{this.props.project.description}
                        </div>
                    </div>
                        
                    <div className="media-right">
                         <span>
                            <button onClick={this.editProject.bind(this)} className="check btn btn-primary glyphicon glyphicon-pencil"/>
                            <button onClick={this.deleteProject.bind(this)} className="check btn btn-danger glyphicon glyphicon-trash"/>
                        </span>
                    </div>
                </div>
          
                                  
                            
                            
                            
                <form className="form-horizontal edit" >
                   <div className="media-body">
                       <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="projectTitle">
                                Project Title
                            </label>
                            <div className="col-sm-9">
                                <input defaultValue={this.props.project.title} type="text" className="form-control" id="projectTitle" ref="projectTitle" placeholder="Project Title" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="firstName">
                                First Name
                            </label>
                            <div className="col-sm-9">
                                <input defaultValue={this.props.project.student.firstName} type="text" className="form-control" id="firstName" ref="firstName" placeholder="Student First Name" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="lastName">
                                Last Name
                            </label>
                            <div className="col-sm-9">
                                <input defaultValue={this.props.project.student.lastName} type="text" className="form-control" id="lastName" ref="lastName" placeholder="Student Last Name" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="userName">
                                User Name
                            </label>
                            <div className="col-sm-9">
                                <input defaultValue={this.props.project.student.userName} type="text" className="form-control" id="userName" ref="userName" placeholder="Algonqion College User Name" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="website">
                                URL
                            </label>
                            <div className="col-sm-9">
                                <input defaultValue={this.props.project.website} type="text" className="form-control" id="website" ref="website" placeholder="Project Website URL Link" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="date">
                                Date
                            </label>
                            <div className="col-sm-4">
                                <input type="date" className="form-control" id="date" ref="date" />
                            </div>
                        </div>


                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="description">
                                Description
                            </label>
                            <div className="col-sm-9">
                                <textarea defaultValue={this.props.project.description} className="form-control" rows="4" cols="50" id="description" ref="description" placeholder="Project Description"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="media-right">
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">

                                <button onClick={this.saveEdit.bind(this)} type="reset" className="btn btn-primary glyphicon glyphicon-floppy-disk"></button>

                                <button onClick={this.cancelEdit.bind(this)} type="reset" className="btn btn-danger glyphicon glyphicon-floppy-remove"></button>

                            </div>
                        </div>
                    </div>
                </form>
            </li>
        )
    }
}