import _ from "lodash"
import search from "./project/searchReducer"
import sort from "./project/sortReducer"
import form from "./project/formReducer"


const initialProject = {
    project: [],
    fetched: false,
    error: null,
    selectionMode: false,
    search: {
        filteredProject: [],
        keyWord: [],
        keyWordSet: false,
        filtered: false,
        error: null
    },
    sort: {
        sortBy: "title",
        error: null
    },
    form: {
        form: "close",
        valid: null,
        error: null
    },
    check:{
        checkedCount: 0
    }
}

export default function reducer(state = initialProject, action) {
    switch (action.type){
        case "FETCH_PROJECT_FULFILLED": 
            const initialSortedProject = _.orderBy(action.payload, (project) => project[state.sort.sortBy].toLowerCase(), "asc")
            return {... state,
                fetched: true, 
                project: action.payload,
                search: {... state.search, 
                    filteredProject: initialSortedProject
                }
            }
        case "FETCH_PROJECT_REJECTED": 
            return {... state,
                fetching: false, 
                error: action.payload + ": Fail fetching project."
            }
        case "ADD_PROJECT_FULFILLED":             
            return {... state,
                // make a copy of the project list from old state, then add new project to the project list.
                project: [... state.project, action.payload],
                search: {... state.search,
                    filteredProject: [...state.search.filteredProject, action.payload]
                },
                form: {... state.form,
                    valid: true,
                    error: null
                }
            }
        case "ADD_PROJECT_REJECTED":
            return {...state, form: form(state.form, action)}
        case "UPDATE_PROJECT_FULFILLED": 
            const newUpdatedProjectNoEdit = {... action.payload, 
                edit: "noEdit"
            }

            //update project
            const newUpdatedProject = [...state.project]
            const newUpdatedProjectIndex = newUpdatedProject.findIndex(project => project.id === action.payload.id)
            newUpdatedProject[newUpdatedProjectIndex] = newUpdatedProjectNoEdit
            
            // update filtered project
            const newUpdatedFilteredProject = [...state.search.filteredProject]
            const newUpdatedFilteredProjectIndex = newUpdatedFilteredProject.findIndex(project => project.id === action.payload.id)
            newUpdatedFilteredProject[newUpdatedFilteredProjectIndex] = newUpdatedProjectNoEdit
            
            return {... state,
                project: newUpdatedProject,
                search: {... state.search,
                    filteredProject: newUpdatedFilteredProject
                }
            }
        case "DELETE_PROJECT_FULFILLED": 
            let newCheckedCountAfterDelete = 0
            let selectionModeAfterDelete
            const newFilteredProjectAfterDelete = state.search.filteredProject.filter(project =>{
                if (project.id === action.payload){
                    if (project.check === "checked"){
                        newCheckedCountAfterDelete = 1
                    }
                }
                if(project.id !== action.payload){
                    return project
                }
            })
            const selectedProjectAfterDelete = state.check.checkedCount - newCheckedCountAfterDelete
            
            if (selectedProjectAfterDelete === 0){
                selectionModeAfterDelete = false
            } else {
                selectionModeAfterDelete = true
            }
            return {... state,
                selectionMode: selectionModeAfterDelete,
                project: state.project.filter(project => project.id !== action.payload),
                search: {... state.search,
                    filteredProject: newFilteredProjectAfterDelete
                },
                check: {... state.check,
                    checkedCount: selectedProjectAfterDelete
                }
            }
        case "DELETE_PROJECT_REJECTED":
            return{... state,
                error: action.payload
            }
        case "CHECK_PROJECT":
            let checkedProject = [... state.search.filteredProject]
            checkedProject = checkedProject.map(project=>{
                if (project.id === action.payload){
                    project.check = "checked"
                }
                return project
            })
            return{... state,
                selectionMode: true,
                search: {... state.search,
                    filteredProject: checkedProject
                },
                check: {... state.check,
                    checkedCount: state.check.checkedCount + 1
                }
            }
        case "UNCHECK_PROJECT":
            let newSelectionMode
            let selectedProjectNumber = 0
            let uncheckedProject = [... state.search.filteredProject]
            uncheckedProject = uncheckedProject.map(project => {
                if (project.id === action.payload){
                    project.check = "unchecked"
                }
                return project
            })
            for (let i in uncheckedProject){
                if (uncheckedProject[i].check === "checked"){
                    selectedProjectNumber++
                }
            }
            if (selectedProjectNumber === 0){
                newSelectionMode = false
            } else {
                newSelectionMode = true
            }
            return{... state,
                selectionMode: newSelectionMode,
                search: {... state.search,
                    filteredProject: uncheckedProject
                },
                check: {... state.check,
                    checkedCount: state.check.checkedCount - 1
                }
            }
        case "CHECK_ALL_PROJECT":
            let checkAllProject = [... state.search.filteredProject]
            checkAllProject = checkAllProject.map(project => {
                project.check = "checked" 
                return project
            })
            let newCheckedCount = checkAllProject.length
            return{... state,
                search: {... state.search,
                    filteredProject: checkAllProject
                },
                check: {... state.check,
                    checkedCount: newCheckedCount
                }
            }
        case "UNCHECK_ALL_PROJECT":
            let uncheckAllProject = [... state.search.filteredProject]
            uncheckAllProject = uncheckAllProject.map(project => {
                project.check = "unchecked" 
                return project
            })
            return{... state,
                selectionMode: false,
                search: {... state.search,
                    filteredProject: uncheckAllProject
                },
                check: {... state.check,
                    checkedCount: 0
                }
            }
        case "EDIT_PROJECT":
            let newEditingProject = [... state.search.filteredProject]
            newEditingProject = newEditingProject.map(project => { 
                if (project.id === action.payload){
                    project.edit = "edit"
                }
                return project
            })
            return{...state,
                search: {... state.search, 
                   filteredProject: newEditingProject
                }
            }
        case "CANCEL_EDITING_PROJECT":
            let newCanceledEditingProject = [... state.search.filteredProject]
            newCanceledEditingProject = newCanceledEditingProject.map(project => { 
                if (project.id === action.payload){
                    project.edit = "noEdit"
                }
                return project
            })
            return{... state,
                search: {... state.search, 
                   filteredProject: newCanceledEditingProject
                }
            }
        case "FILTER_PROJECT_PENDING":
            return {...state, search: search(state.search, action)}
        case "FILTER_PROJECT_FULFILLED":
            const newFilteredProject = state.project.filter(project => {
                for (let aKeyWord in state.search.keyWord){
                    let lowerKeyWord = state.search.keyWord[aKeyWord].toLowerCase()
                    let projectContent = "" +
                        project.title +
                        project.description +
                        project.student.firstName +
                        project.student.lastName +
                        project.student.userName
                    if (lowerKeyWord !== ""){
                        if (projectContent.toLowerCase().includes(lowerKeyWord)){
                            return project
                        }
                    }
                }
            })
            return {... state,
                search: {... state.search,
                    filtered: true,
                    filteredProject: newFilteredProject
                }
            }
        case "SHOW_ALL_PROJECT":
            return {... state,
                search: {... state.search,
                    keyWordSet: false,
                    filtered: false,
                    filteredProject: state.project
                }
            }
        case "SORT_PROJECT_PENDING":
            return {... state, sort: sort(state.sort, action)}
        case "SORT_PROJECT_FULFILLED":
            let sortedProject
            if (state.sort.sortBy === "title"){
                sortedProject = _.orderBy(state.search.filteredProject, (project) => project[state.sort.sortBy].toLowerCase(), "asc")
            } else if (state.sort.sortBy === "date"){
                sortedProject = _.orderBy(state.search.filteredProject, (project) => project[state.sort.sortBy], "desc")
            } else {
                sortedProject = _.orderBy(state.search.filteredProject, (project) => project.student[state.sort.sortBy].toLowerCase(), "asc")
            }
            return {... state,
                search: {... state.search,
                    filteredProject: sortedProject
                }
            }
        case "OPEN_FORM_ADD":
        case "CLOSE_FORM_ADD":
        case "VALIDATE_PROJECT":
            return {... state, form: form(state.form, action)}
        default: return state
    }// switch
}