# ADR-001: State Management Architecture

## Status

Accepted

## Date

2026-02-28

## Context

The YouTube Module application is a Lit-based web component that searches YouTube videos, displays results, and allows users to bookmark videos. The application needs to manage several types of state:

1. **Search Results**: Video data returned from YouTube API
2. **Search Parameters**: Query text, max results, API key, mock data flag
3. **User Preferences**: Bookmarked videos (persisted to localStorage)
4. **UI State**: Current view (search vs bookmarks), sorting preferences

## Decision

We have adopted a **component-based state management** approach using Lit's reactive properties combined with **@lit/context** for dependency injection and **@lit/task** for async operations.

### State Management Strategy

#### 1. Local Component State (Lit @state)

All application state is managed within the root `YTSearchModule` component using Lit's `@state` decorator:

```typescript
@state() results: ModifiedSearchResponse | undefined;
@state() bookmarks: ModifiedItem[];
@state() showBookmarks: boolean = false;
@state() renderedResults: boolean = false;
```

**Rationale**:

- Simple and sufficient for this application's scope
- No external state management library needed (Redux, MobX, etc.)
- Native to Lit framework, providing reactive updates automatically

#### 2. Context-Based State Distribution (@lit/context)

Search results are provided to child components via `@lit/context`:

```typescript
@provide({ context: resultsContext })
@state()
results: ModifiedSearchResponse | undefined;
```

The `SortResults` component consumes this context:

```typescript
@consume({ context: resultsContext, subscribe: true })
results: ModifiedSearchResponse | undefined;
```

**Rationale**:

- Avoids prop drilling through multiple component layers
- Allows child components to access search results without explicit passing
- Supports reactive updates when results change

#### 3. Async Task Management (@lit/task)

API calls are handled using `@lit/task` for proper loading, completion, and error state handling:

```typescript
private _getYTSearchData = new Task(this, {
    task: async ([maxResults, q, key, mockData]) => { ... },
    autoRun: false,
});
```

**Rationale**:

- Built-in support for loading, error, and completion states
- Automatic cleanup on component disconnect
- Cancellable tasks

#### 4. Persistence (localStorage)

Bookmarks are persisted to localStorage:

```typescript
private syncBookmarks() {
    const lsBookmarks = localStorage.getItem("bookmarks");
    if (lsBookmarks !== null) {
        return JSON.parse(lsBookmarks) || [];
    }
    return [];
}
```

**Rationale**:

- Simple persistence without backend requirements
- Survives page refreshes
- No external storage library needed

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    YTSearchModule                           │
│  (Root Component - State Owner)                            │
│                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────┐  │
│  │ @state results  │  │ @state bookmarks│  │ @state    │  │
│  │ (via @provide)  │  │ (localStorage)  │  │ showBook- │  │
│  └────────┬────────┘  └────────┬────────┘  │ marks     │  │
│           │                     │            └─────┬──────┘  │
│           ▼                     ▼                  │         │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              @lit/task (_getYTSearchData)              ││
│  │  - Manages async API calls                             ││
│  │  - Handles loading/error/complete states               ││
│  └─────────────────────────────────────────────────────────┘│
│           │                                                  │
└───────────┼──────────────────────────────────────────────────┘
            │ @lit/context (resultsContext)
            ▼
┌───────────────────────────────────────────────────────────────┐
│                        SortResults                             │
│  (Consumer Component)                                          │
│                                                                │
│  @consume({ context: resultsContext, subscribe: true })       │
│  results: ModifiedSearchResponse | undefined                  │
└───────────────────────────────────────────────────────────────┘
```

## Consequences

### Positive

- **Minimal dependencies**: No external state management libraries required
- **Native framework integration**: Uses Lit's built-in reactive system
- **Simple debugging**: State is co-located with the component that owns it
- **Type safety**: Full TypeScript support with decorators

### Negative

- **Limited scalability**: Not suitable for large applications with complex state relationships
- **Prop drilling potential**: If component tree grows deeper, context may be overused
- **Testing complexity**: UI state testing requires browser environment (Playwright)
- **No time-travel debugging**: Unlike Redux/MobX

### Trade-offs

- Chose simplicity over feature-richness
- Chose native Lit solutions over third-party libraries
- Accepted limited testing options for unit tests

## Alternatives Considered

### 1. Redux / RTK

**Rejected**: Overkill for single-component application. Would add significant bundle size and boilerplate.

### 2. MobX

**Rejected**: Requires separate observable setup, more complex than needed for this use case.

### 3. Context API + useReducer (React-style)

**Rejected**: Not idiomatic for Lit components. Lit's reactive system is more elegant.

### 4. Signal-based state (Preact Signals)

**Rejected**: Would require additional dependency. Lit's @state provides similar functionality.

## References

- [Lit Reactive Properties](https://lit.dev/docs/components/properties/)
- [@lit/context Documentation](https://www.npmjs.com/package/@lit/context)
- [@lit/task Documentation](https://www.npmjs.com/package/@lit/task)
- [ADR Template](https://github.com/joelparkerhenderson/architecture-decision-record)

## Review Notes

This ADR should be revisited if:

- Application grows to include user authentication
- Multiple pages/routes are added
- Complex derived state becomes necessary
- Server-side state synchronization is required
