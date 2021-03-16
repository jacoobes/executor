/**
 * @param {Message} message - Your message parameter
 * @param {String} this.argument - Can take in an array or string. Returns Collection or Object of Collections
 */
function getMentions(argument, message) {

    const objectContainingMentions = {}
    let anyIDs = turnMentionIntoID(argument)

    if (Array.isArray(argument)) {
        let mentionMap = new Map()

        mentionMap = argument.reduce((accumulator, currentValue, index) => {
            accumulator.set(
                currentValue,

                message.guild.members.cache.get(anyIDs[index]) ||
                message.guild.roles.cache.get(anyIDs[index])
            )

            return accumulator
        }, mentionMap)

        for (var i = 0; i < argument.length; i++) {
            objectContainingMentions[`mention${i}`] = mentionMap.get(argument[i])

            objectContainingMentions[`mention${i}`] === undefined ?
                delete objectContainingMentions[`mention${i}`] :
                ''
        }

        return objectContainingMentions
    } else {
        return message.guild.members.cache.get(anyIDs) || message.guild.roles.cache.get(anyIDs)
    }
}

function turnMentionIntoID(argument) {
    if (Array.isArray(argument)) {
        let onlyUniques = [...new Set(argument.map((mentions) => mentions))]

        onlyUniques = onlyUniques.reduce((accumulator, currentValue) => {
            currentValue = currentValue.replace(/[<>@!&]/g, '')
            accumulator.push(currentValue)

            return accumulator
        }, [])

        return onlyUniques
    } else {

        return argument.replace(/[<>@!&]/g, '')
    }
}


module.exports.getMentions = getMentions