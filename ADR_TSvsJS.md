# Choice of Language (TS vs JS)

## Context and Problem Statement
TypeScript(TS) and JavaScript(JS) are both languages that can be used with the Lit WebComponent library. One should not implement both as it would add confustion and overhead.
 

## Considered Options
* TypeScript
* JavaScript with JSDoc

## Decision Outcome
TypeScript
TS is a superset of JS and provides more features and an ease of use when typing objects. Node.js(runtime) and Vite(build and dev environment) have well developed support for TS.

### Consequences

* Good, Well defined types with little overhead
* Bad, Requires a build