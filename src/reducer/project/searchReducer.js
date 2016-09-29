const initialSearch = {
    filteredProject: [],
    keyWord: [],
    keyWordSet: false,
    filtered: false,
    error: null
}

export default function reducer(state, action){
    switch (action.type){
        case "FILTER_PROJECT_PENDING":
            return {...state, 
                keyWord: action.payload,
                keyWordSet: true
            }
        default: return state
    }
}