#include <emscripten/emscripten.h>
#include <vector>

#ifdef __cplusplus
#define EXTERN extern "C"
#else
#define EXTERN
#endif

EXTERN EMSCRIPTEN_KEEPALIVE int fib(int n) {
    static std::vector<int> memo = {0, 1}; // Memoization array
    if (n <= 0) return 0;
    if (n < memo.size()) return memo[n];

    // Only calculate if we haven't already
    for (int i = memo.size(); i <= n; ++i) {
        memo.push_back(memo[i - 1] + memo[i - 2]);
    }

    return memo[n];
}