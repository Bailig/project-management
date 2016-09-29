import $ from "jquery"

export function openForm() {
    return {
        type: "OPEN_FORM_ADD"
    }
}

export function closeForm() {
    return {
        type: "CLOSE_FORM_ADD"
    }
}

export function addProject(newProject) {
    if (
        newProject.title === "" ||
        newProject.student.firstName === "" ||
        newProject.student.lastName === "" ||
        newProject.student.userName === "" 
    ){
        return {
            type: "ADD_PROJECT_REJECTED",
            payload: "Please complete the form!!!"
        }
    } else {
        return function(dispatch) {
                $.ajax({
                    type: 'POST',
                    url: 'http://rest.learncode.academy/api/learncode/project1',
                    dataType: "json",
                    data: newProject
                })
                .done(resData => {
                    const newData = {... resData, 
                        check: "unchecked",
                        edit: "noEdit"
                    }
                    dispatch({
                        type: "ADD_PROJECT_FULFILLED",
                        payload: newData
                    })
                })
                .fail((xhr, status, strErr) => {
                    dispatch({
                        type: "ADD_PROJECT_REJECTED",
                        payload: status + ": POST DATA REJECTED!"
                    })
                })
        }
     }
}
