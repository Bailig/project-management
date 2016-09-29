import React from 'react'
import { connect } from "react-redux"
import "./Bootstrap/bootstrap.min.js"
import { fetchProject, deleteProject } from "../action/projectAction"
import { setKeyWord, filterProject } from "../action/searchAction"
import { setSortBy, sortProject } from "../action/sortAction"
import { openForm, closeForm } from "../action/formAction"
import { uncheckAll, checkAll } from "../action/selectAction"

@connect((store) => {
    return {
        form: store.project.form.form,
        selectionMode: store.project.selectionMode,
        checkedCount: store.project.check.checkedCount,
        filteredProject: store.project.search.filteredProject
    }
})
export default class Header extends React.Component{
    componentWillMount(){
        this.props.dispatch(fetchProject())
    }
    setKeyWord(event){
        this.props.dispatch(setKeyWord(event.target.value))
        this.props.dispatch(filterProject(event.target.value))
        this.props.dispatch(sortProject())
    }
    sortByTitle(){
        this.props.dispatch(setSortBy("title"))
        this.props.dispatch(sortProject())
    }
    sortByStudentName(){
        this.props.dispatch(setSortBy("firstName"))
        this.props.dispatch(sortProject())
    }
    sortByUserName(){
        this.props.dispatch(setSortBy("userName"))
        this.props.dispatch(sortProject())
    }
    sortByDate(){
        this.props.dispatch(setSortBy("date")) 
        this.props.dispatch(sortProject())
    }
    toggleFormAdd(){
        if (this.props.form === "close"){
            this.props.dispatch(openForm())
        } else if (this.props.form === "add"){
            this.props.dispatch(closeForm())
        }
    }
    uncheckAll(){
        this.props.dispatch(uncheckAll())
    }
    checkAll(){
        this.props.dispatch(checkAll())
    }
    deleteChecked(){
        const checkedProject = this.props.filteredProject.filter(project => project.check === "checked")
        for (let index in checkedProject){
            this.props.dispatch(deleteProject(checkedProject[index].id))
        }
    }
    listenCheckedCount(){
        return this.props.checkedCount
    }
    listenSelectionMode(){
        if (this.props.selectionMode){
            return ""
        } else {
            return " sr-only "
        }
    }
    render() {
        let keyWord
        return (
            <div>
            <header id="displayMode">
            <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
            <div className="row">
            
                <div className="navbar-header col-md-3 col-sm-4 col-xs-9">
                    <a className="navbar-brand" href="#">Algonquin College</a>
                </div>

                <div className="navbar-header col-sm-1 col-xs-3">
                     <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#my-navbar-collapse" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                     </button>
                </div>
                
                <div className="collapse navbar-collapse col-md-10 col-sm-7" id="my-navbar-collapse">
                <form className="navbar-form navbar-right" role="search">
            
                    <div className="form-group">
                        <input id="searchBox" type="text" className="form-control" placeholder="Search"
                            value={keyWord}
                            defaultValue={keyWord}
                            onChange={this.setKeyWord.bind(this)}
                        ></input>
                    </div>
                        
                    <div className="btn-group">
                    <ul className="nav navbar-nav">
                        <li className="dropdown">
                            <a id="sortByBTN" type="button" href="#" className="dropdown-toggle btn btn-default navbar-btn" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Sort By&nbsp; <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><a onClick={this.sortByTitle.bind(this)} href="#">Project Title</a></li>
                                <li><a onClick={this.sortByStudentName.bind(this)} href="#">Student Name</a></li>
                                <li><a onClick={this.sortByUserName.bind(this)} href="#">Student User Name</a></li>
                                <li><a onClick={this.sortByDate.bind(this)} href="#">Date</a></li>
                            </ul>
                        </li>
                        <li><a onClick={this.toggleFormAdd.bind(this)} id="addBTN" type="button"  href="#">Add Project&nbsp; <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> </a></li>
                    </ul>  
                    </div>
                </form>
                </div>
            </div>
            </div>
            </nav>
            </header>
                        
            <header id="selectionMode" className={this.listenSelectionMode()}>
            <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
            <div className="row">
            
               <div className="col-xs-2">
                    <ul className="nav navbar-nav">
                    <li>
                    <a onClick={this.uncheckAll.bind(this)} type="button">
                        <span id="leftArrow1" className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    </a>
                    </li>
                    </ul> 
               </div>
                <div className="navbar-header col-md-6 col-sm-5 col-xs-7">
                       <p className="navbar-text">{this.listenCheckedCount()} Selected</p>
                </div>

                <div className="navbar-header col-sm-1 col-xs-3">
                     <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#my-navbar-collapse2" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                     </button>
                </div>
                
                <div className="collapse navbar-collapse col-md-2 col-sm-6" id="my-navbar-collapse2">

                <div className="btn-group">
                <ul className="nav navbar-nav">                        
                    <li><a onClick={this.checkAll.bind(this)} type="button"  href="#">Select All &nbsp; <span className="glyphicon glyphicon-check" aria-hidden="true"></span></a></li>

                    <li><a onClick={this.deleteChecked.bind(this)} type="button"  href="#">Delete &nbsp; <span className="glyphicon glyphicon-trash" aria-hidden="true"></span></a></li>
                </ul>  
                </div>

                </div>
            </div>
            </div>
            </nav>
            </header>
            </div>
        )

    }
}