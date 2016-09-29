import React from "react"
import { connect } from "react-redux"
import { closeForm, addProject , setAdded } from "../../action/formAction"
import "./_Form.scss"

@connect((store) => {
    return {
        form: store.project.form.form,
        valid: store.project.form.valid,
        validated: store.project.form.validated,
        error: store.project.form.error
    }
})

export default class Form extends React.Component{
    closeForm(){
        this.props.dispatch(closeForm())
    }
    addProject(){
        const newProject = {
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
        this.props.dispatch(addProject(newProject))
    }
    renderError(){
        if (this.props.valid === false){
            return (
                <div className="alert alert-danger" role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <span className="sr-only">Error:</span>
                    &nbsp; {this.props.error}
                </div>
            )
        } else {
            return null
        }
    }
    renderSuccess(){
        if (this.props.valid === true){
            return (
                <div className="alert alert-success" role="alert">
                    <span className="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
                    <span className="sr-only">Error:</span>
                    &nbsp; New project was successfully added.
                </div>
            )
        } else {
            return null
        }
    }
    renderAdd(){
        return(
            <div className="panel panel-primary">
                <div className="panel-heading apt-addheading">
                    New Project
                </div>
                <div className="panel-body">

                    <form className="form-horizontal">

                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="projectTitle">
                                Project Title
                            </label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="projectTitle" ref="projectTitle" placeholder="Project Title" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="firstName">
                                First Name
                            </label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="firstName" ref="firstName" placeholder="Student First Name" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="lastName">
                                Last Name
                            </label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="lastName" ref="lastName" placeholder="Student Last Name" />
                            </div>
                        </div>


                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="userName">
                                User Name
                            </label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="userName" ref="userName" placeholder="Algonqion College User Name" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="website">
                                URL
                            </label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="website" ref="website" placeholder="Project Website URL Link" />
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
                                <textarea className="form-control" rows="4" cols="50" id="description" ref="description" placeholder="Project Description"></textarea>
                            </div>
                        </div>
                        {this.renderError()}
                        {this.renderSuccess()}
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
            
                                <button onClick={this.closeForm.bind(this)} type="reset" className="btn btn-danger pull-right">Close</button>
            
                                <button onClick={this.addProject.bind(this)} type="reset" className="btn btn-primary pull-right">Add</button>
            
                            </div>
                        </div>
                   </form>
              </div>
          </div>
        
        )
    }
    
    render(){
        if (this.props.form === "add"){
            return(
                 <article className="container" id="addProject">
                    <div className="row">
                        <ul className="col-md-10 col-md-push-1">
                            {this.renderAdd()}
                        </ul>
                    </div>
                </article>
            )
        } else {
            return null
        }
        
    }
}