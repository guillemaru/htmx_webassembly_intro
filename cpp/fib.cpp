#include <emscripten/emscripten.h>

#ifdef __cplusplus
#define EXTERN extern "C"
#else
#define EXTERN
#endif

EXTERN EMSCRIPTEN_KEEPALIVE int fib(int x) {
  if (x < 1)
    return 0;
  if (x == 1)
    return 1;
  return fib(x-1)+fib(x-2);
}