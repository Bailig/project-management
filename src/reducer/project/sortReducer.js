const initialSort = {
    sortBy: "title",
    error: null
}

export default function reducer(state, action){
    switch(action.type){
        case "SORT_PROJECT_PENDING":
            return {... state,
                sortBy: action.payload
            }
        default: return state
    }
}