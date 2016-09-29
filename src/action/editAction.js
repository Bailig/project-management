export function editProject(id){
    return {
        type: "EDIT_PROJECT",
        payload: id
    }
}

export function cancelEdit(id){
    return {
        type: "CANCEL_EDITING_PROJECT",
        payload: id
    }
}