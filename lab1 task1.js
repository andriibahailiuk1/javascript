function isInteger(num) {
    return (num % 1 === 0);
}


function findPrimes(a, b) {
    console.log(`Прості числа в діапазоні [${a}, ${b}]:`);
    
    for (let i = a; i <= b; i++) {
        
        if (i <= 1) continue;

        let isPrime = true;

       
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                isPrime = false;
                break; 
            }
        }

        if (isPrime) {
            console.log(i);
        }
    }
}