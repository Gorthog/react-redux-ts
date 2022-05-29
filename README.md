This is a little project that shows how to use React with Redux and Typescript.
The functionality is pretty basic. There is a single input to search repositories of npm and return the repositories names found by that term.

The interesting part is the structure of the state, and all the typing plumbing required.

You can traverese the commits to see the evolution. Latest commit is after migration to Redux Toolkit, which reduces boilerplate significantly.

AFAIK, this repo achieved full type safety currently possible.

TODO:

1. Add memoization.
2. Migrate to RTK query
3. Add data normalization
