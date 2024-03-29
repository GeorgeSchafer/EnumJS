
function ensureUppercase(key){
    if (typeof key === "string") {
        return key.toUpperCase()
    } else {
        return key
    }
}

function splitObjectKeysValues(objArray){
    const data = {
        keys : [],
        values : []
    }

    objArray.forEach(obj => {
        const key = Object.keys(obj)[0]
        const value = Object.values(obj)[0]
        data.keys.push(key)
        data.values.push(value)
    })

    return data
}

/**
 * @function
 * @summary
 *      This is used to create a copy of the string to prevent the key from 
 *      being modified prematurely and avoid using the string object wrapper.
 * @param str is a string to copy. 
 * @returns a duplicate of the string.
 */
function copyString(str){
    return str.substring(0)
}

export {
    ensureUppercase,
    splitObjectKeysValues,
    copyString
}