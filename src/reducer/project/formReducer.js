const initialForm = {
    form: "close",
    valid: false,
    error: null
}

export default function reducer(state, action){
    switch (action.type){
        case "OPEN_FORM_ADD":
            return {... state,
                form: "add"
            }
        case "CLOSE_FORM_ADD":
            return {... state,
                form: "close",
                valid: null
            }
        case "ADD_PROJECT_REJECTED":
            return{... state,
                error: action.payload,
                valid: false
            }
        default: return state
    }// switch
}
