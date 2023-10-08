// Generator function to generate all Fibonacci numbers
function* fibonacciGenerator() {
    let a = 0, b = 1;
    yield a;
    yield b;
  
    while (true) {
        [a, b] = [b, a + b];
        yield b;
    }
}

// Generator function to generate even Fibonacci numbers
function* evenFibonacciGenerator() {
    const fibonacci = fibonacciGenerator();
    let currentFibonacci = fibonacci.next().value;

    while (true) {
        if (currentFibonacci % 2 === 0) {
            yield currentFibonacci;
        }
        currentFibonacci = fibonacci.next().value;
    }
}
  
// Print the first 6 even Fibonacci numbers
const evenFibonacci = evenFibonacciGenerator();
for (let i = 0; i < 6; i++) {
    console.log(evenFibonacci.next().value);
}  