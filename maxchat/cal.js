const cs = {
    'add': {
        d: 'Adds numbers. Can be used for addition of multiple numbers.',
        e: 'add: 5, 10, 15',
        h: i => {
            const n = i.split(',').map(s => Number(s.trim()));
            if (n.some(isNaN) || n.length < 2) {
                return `Invalid input. Please provide at least two numbers separated by commas. Example: <span class="c-blk">add: 5, 10</span>`;
            }
            const s = n.reduce((a, b) => a + b, 0);
            return `The sum is ${s}.`;
        }
    },
    'subtract': {
        d: 'Subtracts the second number from the first.',
        e: 'subtract: 20, 8',
        h: i => {
            const n = i.split(',').map(s => Number(s.trim()));
            if (n.some(isNaN) || n.length !== 2) {
                return `Invalid input. Please provide exactly two numbers separated by a comma. Example: <span class="c-blk">subtract: 20, 8</span>`;
            }
            const r = n[0] - n[1];
            return `The result of subtraction is ${r}.`;
        }
    },
    'multiply': {
        d: 'Multiplies numbers. Can be used for multiplication of multiple numbers.',
        e: 'multiply: 2, 3, 4',
        h: i => {
            const n = i.split(',').map(s => Number(s.trim()));
            if (n.some(isNaN) || n.length < 2) {
                return `Invalid input. Please provide at least two numbers separated by commas. Example: <span class="c-blk">multiply: 2, 5</span>`;
            }
            const p = n.reduce((a, b) => a * b, 1);
            return `The product is ${p}.`;
        }
    },
    'divide': {
        d: 'Divides the first number by the second.',
        e: 'divide: 100, 5',
        h: i => {
            const n = i.split(',').map(s => Number(s.trim()));
            if (n.some(isNaN) || n.length !== 2) {
                return `Invalid input. Please provide exactly two numbers separated by a comma. Example: <span class="c-blk">divide: 100, 5</span>`;
            }
            if (n[1] === 0) {
                return `Error: Division by zero is not allowed.`;
            }
            const r = n[0] / n[1];
            return `The result of division is ${r}.`;
        }
    },
    'area_circle': {
        d: 'Calculates the area of a circle. Takes the radius as input.',
        e: 'area_circle: 5',
        h: i => {
            const r = Number(i.trim());
            if (isNaN(r) || r <= 0) {
                return `Invalid input. Please provide a positive number for the radius. Example: <span class="c-blk">area_circle: 5</span>`;
            }
            const a = Math.PI * Math.pow(r, 2);
            return `The area of a circle with radius ${r} is ${a.toFixed(2)}.`;
        }
    },
    'perimeter_square': {
        d: 'Calculates the perimeter of a square. Takes the side length as input.',
        e: 'perimeter_square: 10',
        h: i => {
            const s = Number(i.trim());
            if (isNaN(s) || s <= 0) {
                return `Invalid input. Please provide a positive number for the side length. Example: <span class="c-blk">perimeter_square: 10</span>`;
            }
            const p = 4 * s;
            return `The perimeter of a square with side length ${s} is ${p}.`;
        }
    },
    'bmi': {
        d: 'Calculates Body Mass Index (BMI). Takes weight (kg) and height (m) as input.',
        e: 'bmi: 70, 1.75',
        h: i => {
            const [w, h] = i.split(',').map(s => Number(s.trim()));
            if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
                return `Invalid input. Please provide weight in kg and height in meters. Example: <span class="c-blk">bmi: 70, 1.75</span>`;
            }
            const b = w / (h * h);
            let c = 'normal';
            if (b < 18.5) c = 'underweight';
            else if (b >= 25) c = 'overweight';
            
            return `Your BMI is ${b.toFixed(2)}, which is considered ${c}.`;
        }
    },
    'cagr': {
        d: 'Calculates Compound Annual Growth Rate (CAGR). Takes beginning value, ending value, and number of years.',
        e: 'cagr: 1000, 1500, 3',
        h: i => {
            const [bv, ev, y] = i.split(',').map(s => Number(s.trim()));
            if (isNaN(bv) || isNaN(ev) || isNaN(y) || bv <= 0 || ev <= 0 || y <= 0) {
                return `Invalid input. Please provide positive numbers for beginning value, ending value, and years. Example: <span class="c-blk">cagr: 1000, 1500, 3</span>`;
            }
            const c = (Math.pow(ev / bv, 1 / y) - 1) * 100;
            return `The Compound Annual Growth Rate (CAGR) is ${c.toFixed(2)}%.`;
        }
    },
    'sip': {
        d: 'Calculates Systematic Investment Plan (SIP) returns. Takes monthly investment, expected return rate (%), and number of years.',
        e: 'sip: 5000, 12, 10',
        h: i => {
            const [mi, er, y] = i.split(',').map(s => Number(s.trim()));
            if (isNaN(mi) || isNaN(er) || isNaN(y) || mi <= 0 || y <= 0) {
                return `Invalid input. Please provide positive numbers for monthly investment, expected return rate, and years. Example: <span class="c-blk">sip: 5000, 12, 10</span>`;
            }
            const r = er / 100 / 12;
            const n = y * 12;
            const fv = mi * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
            const invested = mi * n;
            const returns = fv - invested;
            return `After ${y} years, your investment will be worth ${fv.toFixed(2)}. You invested ${invested.toFixed(2)} and earned returns of ${returns.toFixed(2)}.`;
        }
    },
    'kaprekar': {
        d: 'Demonstrates the Kaprekar Constant (6174) for a four-digit number with at least two distinct digits.',
        e: 'kaprekar: 3524',
        h: i => {
            let n = Number(i.trim());
            if (isNaN(n) || n < 1000 || n > 9999) {
                return `Invalid input. Please provide a four-digit number. Example: <span class="c-blk">kaprekar: 3524</span>`;
            }
            if (new Set(String(n).split('')).size < 2) {
                return `Invalid input. The number must have at least two distinct digits.`;
            }

            let steps = 0;
            let result = n;
            const history = [];

            while (result !== 6174 && steps < 7) {
                steps++;
                let numStr = String(result).padStart(4, '0');
                let digits = numStr.split('').sort();
                let asc = Number(digits.join(''));
                let desc = Number(digits.reverse().join(''));
                result = desc - asc;
                history.push(`${desc} - ${asc} = ${result}`);
            }

            if (result === 6174) {
                return `Kaprekar's Constant (6174) reached in ${steps} steps. <br>Steps: ${history.join('<br>')}`;
            } else {
                return `Could not reach Kaprekar's Constant. This is unexpected for a valid input.`;
            }
        }
    },
    'collatz': {
        d: 'Applies the Collatz Conjecture to a positive integer.',
        e: 'collatz: 6',
        h: i => {
            let n = Number(i.trim());
            if (isNaN(n) || n <= 0 || !Number.isInteger(n)) {
                return `Invalid input. Please provide a positive integer. Example: <span class="c-blk">collatz: 6</span>`;
            }

            let steps = 0;
            const history = [n];
            while (n !== 1) {
                steps++;
                if (n % 2 === 0) {
                    n /= 2;
                } else {
                    n = 3 * n + 1;
                }
                history.push(n);
            }
            return `Collatz sequence for ${i} reached 1 in ${steps} steps. <br>Sequence: ${history.join(' -> ')}`;
        }
    },
    'percentage_of_a_number': {
    d: 'Calculates the percentage of a given number.',
    e: 'percentage_of_a_number: 20, 150',
    h: i => {
    const [p, n] = i.split(',').map(s => Number(s.trim()));
    if (isNaN(p) || isNaN(n)) {
    return `Invalid input. Please provide a percentage and a number. Example: <span class="c-blk">percentage_of_a_number: 20, 150</span>`;
    }
    const result = (p / 100) * n;
    return `${p}% of ${n} is ${result}.`;
    }
    },
    'percentage_change': {
    d: 'Calculates the percentage change between two numbers.',
    e: 'percentage_change: 50, 60',
    h: i => {
    const [ov, nv] = i.split(',').map(s => Number(s.trim()));
    if (isNaN(ov) || isNaN(nv) || ov === 0) {
    return `Invalid input. Please provide the original value and the new value. The original value cannot be zero. Example: <span class="c-blk">percentage_change: 50, 60</span>`;
    }
    const change = ((nv - ov) / ov) * 100;
    return `The percentage change from ${ov} to ${nv} is ${change.toFixed(2)}%.`;
    }
    },
    'percentage_of_another': {
    d: 'Calculates what percentage one number is of another.',
    e: 'number_as_percentage_of_another: 25, 200',
    h: i => {
    const [part, whole] = i.split(',').map(s => Number(s.trim()));
    if (isNaN(part) || isNaN(whole) || whole === 0) {
    return `Invalid input. Please provide two numbers (part, whole). The whole cannot be zero. Example: <span class="c-blk">number_as_percentage_of_another: 25, 200</span>`;
    }
    const result = (part / whole) * 100;
    return `${part} is ${result.toFixed(2)}% of ${whole}.`;
    }
    },     
    'factorial': {
        d: 'Calculates the factorial of a non-negative integer.',
        e: 'factorial: 5',
        h: i => {
            const n = Number(i.trim());
            if (isNaN(n) || n < 0 || !Number.isInteger(n)) {
                return `Invalid input. Please provide a non-negative integer. Example: <span class="c-blk">factorial: 5</span>`;
            }
            if (n === 0) return `The factorial of 0 is 1.`;
            let f = 1;
            for (let j = 1; j <= n; j++) {
                f *= j;
            }
            return `The factorial of ${n} is ${f}.`;
        }
    },
    'fibonacci': {
        d: 'Generates the Fibonacci sequence up to a given number of terms.',
        e: 'fibonacci: 10',
        h: i => {
            const n = Number(i.trim());
            if (isNaN(n) || n <= 0 || !Number.isInteger(n)) {
                return `Invalid input. Please provide a positive integer. Example: <span class="c-blk">fibonacci: 10</span>`;
            }
            if (n === 1) return `Fibonacci sequence: 0`;
            if (n === 2) return `Fibonacci sequence: 0, 1`;

            let a = 0, b = 1;
            const seq = [a, b];
            for (let j = 2; j < n; j++) {
                const temp = a + b;
                a = b;
                b = temp;
                seq.push(b);
            }
            return `The first ${n} terms of the Fibonacci sequence are: ${seq.join(', ')}.`;
        }
    },
    'lcm': {
    d: 'Calculates the Least Common Multiple (LCM) of two or more numbers.',
    e: 'lcm: 12, 15',
    h: i => {
    const numbers = i.trim().split(',').map(Number);
    if (numbers.some(isNaN) || numbers.length < 2) {
    return `Invalid input. Please provide at least two numbers separated by commas. Example: <span class="c-blk">lcm: 12, 15</span>`;
    }
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const lcm = (a, b) => (a * b) / gcd(a, b);
    let result = numbers[0];
    for (let j = 1; j < numbers.length; j++) {
    result = lcm(result, numbers[j]);
    }
    return `The LCM of ${numbers.join(', ')} is ${result}.`;
    }
    },
    'gcd': {
    d: 'Finds the Greatest Common Divisor (GCD) of two or more numbers.',
    e: 'gcd: 48, 18',
    h: i => {
    const numbers = i.trim().split(',').map(Number);
    if (numbers.some(isNaN) || numbers.length < 2) {
    return `Invalid input. Please provide at least two numbers separated by commas. Example: <span class="c-blk">gcd: 48, 18</span>`;
    }
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    let result = numbers[0];
    for (let j = 1; j < numbers.length; j++) {
    result = gcd(result, numbers[j]);
    }
    return `The GCD of ${numbers.join(', ')} is ${result}.`;
    }
    },
    'remainder': {
    d: 'Calculates the remainder of a division operation.',
    e: 'remainder: 17, 5',
    h: i => {
    const parts = i.trim().split(',').map(Number);
    if (parts.length !== 2 || parts.some(isNaN)) {
    return `Invalid input. Please provide a number and a divisor separated by a comma. Example: <span class="c-blk">remainder: 17, 5</span>`;
    }
    const [dividend, divisor] = parts;
    if (divisor === 0) {
    return `Division by zero is not allowed.`;
    }
    const result = dividend % divisor;
    return `The remainder of ${dividend} divided by ${divisor} is ${result}.`;
    }
    },
    'palindrome': {
    d: 'Checks if a given string or number is a palindrome.',
    e: 'palindrome: racecar',
    h: i => {
    const str = String(i).trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (str.length === 0) {
    return `Invalid input. Please provide a string or number to check. Example: <span class="c-blk">palindrome: racecar</span>`;
    }
    const reversedStr = str.split('').reverse().join('');
    if (str === reversedStr) {
    return `'${i}' is a palindrome.`;
    } else {
    return `'${i}' is not a palindrome.`;
    }
    }
    }
};

    