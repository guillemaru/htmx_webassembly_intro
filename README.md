## Introduction to HTMX and WebAssembly with a simple example
This repository contains a simple web application that calculates the Fibonacci number of a given input using WebAssembly and HTMX.  
The Fibonacci calculation is performed in C++ and compiled to WebAssembly, which is then loaded and executed in a Node.js server using HTMX for the front-end interaction.  

# Prerequisites
Before running the application, ensure you have the following prerequisites installed on your system:  

[Emscripten for compiling C++ to WebAssembly (it should get you nodejs as well)](https://emscripten.org/docs/getting_started/downloads.html)  
[(nice to have) VSCode extension "Live server"](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)  

# Getting Started
Follow these steps to set up and run the project:  

Clone the repository to your local machine:  

```bash
git clone https://github.com/guillemaru/htmx_webassembly_intro  
cd your-repo  
code .
```
Initialize the npm project and install dependencies:  
`npm init  
npm install`  
Build the WebAssembly files by running the provided build.sh script:  
`./build.sh`  
This script compiles the fib.cpp file to WebAssembly and moves the resulting files to the web/gen/ directory.  

# Running the Application
Start the html file by running the live server extension in VSCode  
Start the Node.js server:  
`node server.js`  
The server will be running on http://localhost:3000.  

Enter a number in the input field and click the "Calculate Fibonacci number" button. The result will be displayed below the button.  

# Understanding the Code
The C++ code for calculating the Fibonacci number is located in cpp/fib.cpp. This code is compiled to WebAssembly using Emscripten during the build process.  

The Node.js server is defined in server.js. It handles the HTMX POST request to calculate the Fibonacci number using the WebAssembly module.  

The HTML user interface is defined in index.html. It serves the HTML page. It includes an input field for entering a number and a button to trigger the calculation.  

The build.sh script is used to compile the C++ code to WebAssembly and move the resulting files to the web/gen/ directory.  

#Important Note  
The WebAssembly module (fib.wasm) exports a function called "fib," which is used in the server.js file to perform the Fibonacci calculation. The details of the exported function can be found in the fib.wast file in the generated build/ directory.  

# Contributing
Feel free to contribute to this project by opening issues or creating pull requests. Your contributions are welcome!
