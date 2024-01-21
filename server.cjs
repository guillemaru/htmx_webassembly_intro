const express = require('express');
const cors = require('cors');
const wasmModule = require('./web/gen/fib.js');

wasmModule.onRuntimeInitialized = () => {
    console.log('wasmModule initialized');
};

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
};
app.use(cors(corsOptions));

// Define a route to handle the HTMX POST request
app.post('/api/computePrimes', (req, res) => {
    const inputNumber = parseInt(req.body.fiboInput);

    // Handle edge cases
    if (!inputNumber) {
        const responseObj = `<div style="color: red;">Invalid input.</div>`;
        return res.send(responseObj);
    } else if (inputNumber > 46) {
        const responseObj = `<div style="color: red;">The input number is too large. Please enter a positive number less than or equal to 46.</div>`;
        return res.send(responseObj);
    } else if (inputNumber < 0) {
        const responseObj = `<div style="color: red;">Invalid negative input. Please enter a positive number.</div>`;
        return res.send(responseObj);
    }
    console.log(`Input number is ${inputNumber}`);

    // Do the actual WebAssembly computation
    if (wasmModule._fib) {
        const fib = wasmModule._fib;
        const reversedNumber = fib(inputNumber);
        const responseObj = `<div>Fibonacci of <strong>${inputNumber}</strong> is <strong>${reversedNumber}</strong></div>`;
        res.send(responseObj);
    } else {
        res.status(503).send('The WebAssembly module is not initialized yet. Please try again later.');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
