rm build/ -rf
mkdir build
cd build
em++ ../cpp/fib.cpp -s WASM=1 -s EXPORT_ALL=1 -s "EXPORTED_RUNTIME_METHODS=['ccall']" -o fib.js || exit 1
wasm-dis fib.wasm -o fib.wast
mv fib.js ../web/gen/
mv fib.wasm ../web/gen/