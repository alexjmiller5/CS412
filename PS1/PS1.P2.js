const helper = string => {
    const [left, operator, right] = string.split('')
    return {left, operator, right}
}
const evaluate = string => {
    const {left, operator, right} = helper(string)
    switch (operator) {
        case '+':
            return (left, right) => left + right;
        case '*':
            return (left, right) => left * right;
        case '-':
            return (left, right) => left - right;
        case '/':
            return (left, right) => left / right;
        case '^':
            return (left, right) => Math.pow(left, right);
    }
}

const expressions = ['4+2', '5*7', '6-1', '9/2', '2^8'];

expressions.forEach(expression => {
  const operator = evaluate(expression);
  let {left, oper, right} = helper(expression)
  console.log(`${expression} = ${operator(left,right)}`)
});