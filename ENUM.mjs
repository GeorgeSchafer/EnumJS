/**
 * © 2023 George Schafer george.reflections@gmail.com
 * MIT License
 * 
 * @description
 *      Enum is an Enum implementation for Javascript with an 
 *      optional Extended Enum (ExtEnum) subclass.
 */
 
import {
    ensureUppercase, 
    copyString, 
    splitObjectKeysValues
} from './Utilities.mjs'

class Enum {
    constructor(keyArray){
        this.index = {}

        if(Array.isArray(keyArray)){
            keyArray.forEach(key => {
                this.addKey(key)
            })
            this.select(keyArray[0])
        } else {
            throw new InvalidArrayError(keyArray)
        }
    }

    addKey(key){
        const ENUM = this.index
        if(typeof key === 'string'){
            key = copyString(key)
            key = ensureUppercase(key)
        }
        ENUM[key] = false
    }

    addKeys(keyArray){
        keyArray.forEach( key => {
            this.addKey(key)
        })
    }

    select(key){
        key = ensureUppercase(key)

        const ENUM = this.index

        Object.keys(ENUM).forEach(key => {
            ENUM[key] = false
        })

        ENUM[key] = true
    }

    duplicate(){
        const result = {}

        const ENUM = this.index

        Object.keys(ENUM).forEach(key => {
            ENUM[key] = false
        })

        ENUM[key] = true
    }

    valueOf(){
        const ENUM = this.index
        
        return Object.keys(ENUM).find(key => ENUM[key])
    }

    v(){
        return this.valueOf()
    }

    toString(pretty=false){
        const ENUM = this.index
        const keyValuePairs = Object.keys(ENUM).map(key => `{${key}: ${ENUM[key]}}` )

        if(pretty){
            return `Enum {\n    ${keyValuePairs.join(',\n    ')}\n}`
        } else {
            return `Enum {${keyValuePairs.join(',')}}`
        }
    }

    s(pretty=false){
        return this.toString(pretty)
    }
}

class ExtEnum extends Enum {
    constructor(objArray) { // obj = { key: value }
        /**
         * @param {objArray} is an array of key:value objects.
         *      The keys are passed to the base Enum constructor 
         *      for the Index while the objArray is set to 
         * @var codex is a glossary 
         *      which holds the value of each Enumerated 
         *      Type associated with their keys.
         *      Codex has to be declared under super keyword
         *      because the super keyword has to be called in
         *      the same block. In order to perform the 
         *      InvalidArrayError check
         */
        if(Array.isArray(objArray)){
            const data = splitObjectKeysValues(objArray)
            super(data.keys)
            this.codex = {}
            this.addValues(objArray)
        } else {
            throw new InvalidArrayError()
        }

    }

    addValue(keyValuePair){
        let key = Object.keys(keyValuePair)[0]
        let value = Object.values(keyValuePair)[0]
        key = ensureUppercase(key)
        this.codex[key] = value
    }

    addValues(keyValuePairArray){
        keyValuePairArray.forEach(pair => {
            this.addValue(pair)
        })
    }

    getCipher(){
        const index = Object.keys(this.index)
        let cipher
        index.forEach(i => {
            if(this.index[i]){
                cipher = i
            }
        })

        return cipher
    }

    v(verbose=false){
        return this.valueOf(verbose)
    }

    valueOf(verbose=false){
    /**
     * Colors is an Extended Enum with key-value pairs
     *      booleans hold the key that has the value as the true value
     *      codex needs the key:value
     */
    if(verbose){
            const keyValue = {}
            for( const [key, value] of Object.entries(this.codex)){
                if(this.index[key]){
                    keyValue[key] = value
                }
            }
            return keyValue
        } else {
            const value = this.codex[this.getCipher()]
            return value
        }
    }

    toString(verbose=false){ 
        return `ExtEnum ${JSON.stringify(this.valueOf(verbose))}`
    }
}

class InvalidArrayError {
    constructor(invalidArray){
        throw new TypeError(
            `Enum declaration expected an array of keys, instead received: ${typeof invalidArray}`
        )
    }
}

export {
    Enum,
    ExtEnum,
    InvalidArrayError // for testing purposes
}