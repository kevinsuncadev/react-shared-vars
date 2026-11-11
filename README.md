# react-shared-vars

A high-performance, self-cleaning key-value global variable manager for React. No stores, no reducers, no actions, and no dispatch boilerplate—just shared variables powered by React's native `useSyncExternalStore`.

## Why `react-shared-vars`?
* **No Warehouse Metaphors:** Stop dealing with stores, actions, payloads, and dispatchers just to share a value across components.
* **Feels Like `useState`:** Read and assign shared variables with `[value, setVariable] = useVariable(name, defaultValue)`.
* **Zero Setup Required:** Call `useVariable` anywhere in your app immediately without wrapping your root component in a `<Provider>`.
* **Automatic Memory Cleanup:** Variables are created on demand and automatically deleted from memory the moment the last component using them unmounts.

## Installation

```bash
npm install react-shared-vars
```

## Usage

Use `useVariable` in any component to read and update a shared variable across your app:

```jsx
import { useVariable } from 'react-shared-vars';

function CounterButton() {
    const [count, setCount] = useVariable("global_counter", 0);
    return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

function CounterDisplay() {
    const [count] = useVariable("global_counter", 0);
    return <p>Current count: {count}</p>;
}
```

### Accessing Variables Outside React
You can also read or update variables directly inside plain JavaScript utilities, API helpers, or event handlers using `VariableManager`:

```js
import { VariableManager } from 'react-shared-vars';

// Update a variable outside a React component
VariableManager.set("global_counter", 10);

// Read a variable outside a React component
const currentCount = VariableManager.get("global_counter");
```

### Optional `<VariableProvider>`
`<VariableProvider>` is **not required** for normal usage, as `useVariable` connects to the global `VariableManager` automatically. However, you can optionally wrap a component tree in `<VariableProvider>` if you want to inject a custom manager instance for unit testing:

```jsx
import { VariableProvider } from 'react-shared-vars';

function App() {
    return (
        <VariableProvider>
            <YourComponents />
        </VariableProvider>
    );
}
```

## License

MIT
