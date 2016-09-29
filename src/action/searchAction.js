export function setKeyWord(keyWord) {
    const splitBySpace = keyWord.split(" ")
    const splitByComma = keyWord.split(",")
    if (!keyWord.includes(",")){
        const splitBySpaceTrim = splitBySpace.map(keyWord => keyWord.trim())
        return {
            type: "FILTER_PROJECT_PENDING",
            payload: splitBySpaceTrim
        }
    }
    else if(keyWord.includes(",")){
        const splitByCommaTrim = splitByComma.map(keyWord => keyWord.trim())
        return {
            type: "FILTER_PROJECT_PENDING",
            payload: splitByCommaTrim
        }
    }
}

export function filterProject(keyWord) {
    if(keyWord.trim() === ""){
        return {
            type: "SHOW_ALL_PROJECT"
        }
    }
    else{
        return{
            type: "FILTER_PROJECT_FULFILLED"
        }
    }
}