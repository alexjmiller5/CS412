function* wordsInSentence(sentence) {
    const words = sentence.split(' ')
    for(const word of words) {
        yield word
    }
}
const sentence = "All I know is something like a bird within her sang"
const generator = wordsInSentence(sentence)

for(const word of generator){
    console.log(word)
}