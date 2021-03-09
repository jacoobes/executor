const {
    getMentions
} = require('./mentions')
const
    randomInt = require('./randomInt')

const {
    extract
} = require('./extract')



class Argument {


    constructor(argument, array, argType, validate) {

        this.argument = argument
        this.array = array
        this.argType = argType
        this.validate = validate
        this.utils = {
            getMentions: getMentions,
            randomInt: randomInt,
            extract: extract
        }


    }

    setArray() {


        if (this.array) {
            return this.argument = Array.prototype.slice.call(this.argument, 2)
        } else {

            return this.argument = Array.prototype.slice.call(this.argument, 2).join(' ')
        }


    }

    type() {

        let desiredType = this.array ? this.argType.split(" ") : this.argType

        
        /**
         * All type checks: 
         * String, Integer, Number, Character,  flex 
         * 
         * 
         */

        let nonNumerics = {
            character: 'character',
            string: 'string',
        }
        let numerics = {
            number: 'number',
            double: 'decimal',
            integer: 'integer',
        } 

        if (Array.isArray(desiredType)) {

        
            let argLine = "";
            let index = 0;
            for(let header of desiredType) {

                let argument = nonNumerics[desiredType[index]] ?? 
                numerics[desiredType[index]] ?? 
                'flex'
               

                argument = +this.argument[index] || this.argument[index]
                
                if(header === 'flex') argLine+='flex ';

                if (typeof argument === 'string') {
                  
                    argLine += argument.length === 1 ? 'character ' : 'string ';
                     
                } else if(typeof argument === 'number'){
                    
                    argLine += Number.isInteger(argument) ? 'integer ' : 'decimal ';
    
                  } else {
    
                    void 0
                  }

                index++;  

            }
            
            return argLine.trimEnd()

        } else {

            let type = nonNumerics[desiredType] ?? 
            numerics[desiredType] ?? 
            'flex' ??
            console.error(new Error('Type mismatch. Check argType header. Must be of type number, character, flex, string, or integer'))

            type = +this.argument || this.argument;

            if (desiredType === 'flex') return 'flex';

            if (typeof type === 'string') {

                return this.argument.length === 1 ? 'character' : 'string';
                 
            } else if(typeof type === 'number'){
                //going to add 'number generic type'
                return this.argument % 1 === 0 ? 'integer' : 'double';

              } else {

                (void 0)
              }

        }

    }

    ensureValidationFunction() {
        if (this.validate == null) return true;


        let passesTest = this.validate(this.argument)

        return passesTest
    }

    send() {

        module.exports.argumentInstance = this.argument

    }





}




module.exports.Argument = Argument





/*name: 'profile',
 aliases: ['p'],
    hasArguments: { 
        argType: 'string',
        multiple: false,
    },
 ownerOnly: true 
 hasUserPermissions
 description: "checks your own profile",
 
 
 */