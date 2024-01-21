# Remove the 'web\gen' directory and its contents if it exists
Remove-Item -Path "web\gen\*" -Recurse -Force -ErrorAction Ignore

# Remove the 'build' directory and its contents
Remove-Item -Path "build" -Recurse -Force -ErrorAction Ignore

# Create a new 'build' directory
New-Item -Path "build" -ItemType Directory

# Change directory to 'build'
Set-Location -Path "build"

# Run em++ command (assuming Emscripten is installed and configured in Windows)
# You might need to specify the full path to em++ if it's not in your PATH
em++ ../cpp/fib.cpp -s WASM=1 -s EXPORT_ALL=1 -s "EXPORTED_RUNTIME_METHODS=['ccall']" -o fib.js
if ($LASTEXITCODE -ne 0) { exit 1 }

# Assuming wasm-dis is available in your PATH, otherwise specify the full path
#wasm-dis fib.wasm -o fib.wast

# Move 'fib.js' and 'fib.wasm' to the '../web/gen/' directory
Move-Item -Path "fib.js" -Destination "../web/gen/"
Move-Item -Path "fib.wasm" -Destination "../web/gen/"