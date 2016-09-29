export function setSortBy(property){
    return {
        type: "SORT_PROJECT_PENDING",
        payload: property
    }
}

export function sortProject(){
    return{
        type: "SORT_PROJECT_FULFILLED"
    }
}