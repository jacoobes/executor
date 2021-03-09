const {
    getMentions
} = require('./mentions')
const
    randomInt = require('./randomInt').getRandomInt





class Argument {


    constructor(argument, array, argType, validate) {

        this.argument = argument
        this.array = array
        this.argType = argType
        this.validate = validate
        this.utils = {
            getMentions: getMentions,
            randomInt: randomInt,
            
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

        let desiredType = this.array ? this.argType.split(" ") : [this.argType]
        /**
         * All type checks: 
         * String, Integer, Number, Character,  flex 
         * 
         * 
         */

        let argLine = "";
        let index = 0;

        for (let header of desiredType) {
            let argument;

            if (Array.isArray(this.argument)) {

                argument = +this.argument[index] || this.argument[index]

            } else {

                argument = +this.argument || this.argument
            }

            if (header === 'flex') {

                argLine += 'flex '

            } else if (typeof argument === 'string') {

                argLine += argument.length === 1 ? 'character ' : 'string ';

            } else if (typeof argument === 'number') {

                if (header === 'number') {

                    argLine += 'number '

                } else {

                    argLine += argument % 1 === 0 ? 'integer ' : 'decimal ';

                }

                index++;
            }
            return argLine.trimEnd()


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