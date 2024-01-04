const stringDecorator = (string, decorator) => {
    return decorator(string)
}

console.log(`Test of splitting supercalifragilisticexpialidocious on 'c': 
${stringDecorator('supercalifragilisticexpialidocious', string => {
    string = string.replaceAll('c','^c')
    return string.split('^')})}`)

console.log()

console.log('Test of Replacing \'a\' with \'A\' and returning an object on the string supercalifragilisticexpialidocious:')
const stringInfo = stringDecorator('supercalifragilisticexpialidocious', string => {
        return {
            originalString: string,
            modifiedString: string.replaceAll('a', 'A'),
            numberReplaced: string.split('a').length - 1,
            length: string.length
        }
})

console.table(stringInfo)