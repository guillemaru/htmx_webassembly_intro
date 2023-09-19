import express from 'express';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:5500',
};
app.use(cors(corsOptions));

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

function loadWasm(fileName) {
    // Construct the full path to the wasm file
    const wasmFilePath = `${__dirname}/${fileName}`;

    // Read the wasm file from the file system
    return new Promise((resolve, reject) => {
        fs.readFile(wasmFilePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                WebAssembly.compile(data).then(module => {
                    resolve(new WebAssembly.Instance(module));
                }).catch(reject);
            }
        });
    });
}

// Define a route to handle the HTMX POST request
app.post('/api/computePrimes', (req, res) => {
    const inputNumber = parseInt(req.body.inputValue);
    console.log(`Input number is ${inputNumber}`);
    loadWasm('web/gen/fib.wasm')
            .then(instance => {
                let fib = instance.exports.fib;
                const reversedNumber = fib(inputNumber);
                const responseObj = `Fibonnaci of ${inputNumber} is ${reversedNumber}`;
                res.json(responseObj);
        });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
