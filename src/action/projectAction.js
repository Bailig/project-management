import $ from "jquery"

export function fetchProject() {
    return function(dispatch) {
        $.ajax({
            type: 'GET',
            url: 'http://rest.learncode.academy/api/learncode/project1',
            dataType: "json",
            success: data => {
                const newData = data.map(project => 
                    project = {... project, 
                        check: "unchecked",
                        edit: "noEdit"
                    }
                )
                dispatch({
                    type: "FETCH_PROJECT_FULFILLED",
                    payload: newData
                })
            },
            error: (xhr, status, strErr) => {
                dispatch({
                    type: "FETCH_PROJECT_REJECTED",
                    payload: status + ": Fail fetching data."
                })
            }
        })
    }
}


export function updateProject(project, check) {
    return function(dispatch) {
        $.ajax({
            type: 'PUT',
            url: 'http://rest.learncode.academy/api/learncode/project1/' + project.id,
            data: project,
            success: ()=> {
                dispatch({
                    type: "UPDATE_PROJECT_FULFILLED",
                    payload: {... project,
                        check: check
                    }
                })
            },
            error: (xhr, status, strErr) => {
                dispatch({
                    type: "UPDATE_PROJECT_REJECTED",
                    payload: status + ": Fail updating project on ID: " + project.id
                })
            }
        })
    }
}

export function deleteProject(id) {
    return function(dispatch) {
        $.ajax({
            type: 'DELETE',
            url: 'http://rest.learncode.academy/api/learncode/project1/' + id,
            success: ()=> {
                dispatch({
                    type: "DELETE_PROJECT_FULFILLED",
                    payload: id
                })
            },
            error: (xhr, status, strErr) => {
                dispatch({
                    type: "DELETE_PROJECT_REJECTED",
                    payload: status + ": Fail deleting project on ID: " + id
                })
            }
        })
    }
}

export function checkProject(id, className){
    if (className.includes("checked") && !className.includes("unchecked")){
        return{
            type: "UNCHECK_PROJECT",
            payload: id
        }
    } else if (className.includes("unchecked")){
        return{
            type: "CHECK_PROJECT",
            payload: id
        }
    }

}
