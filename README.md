

```json

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'xjsx'
  }
})

```


```ts
import { useState, useEffect } from 'xjsx';

const Counter = () => {
    const [count, setCount] = useState(0);

    useEffect(() => console.log('=>', count()));

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount((c) => c + 1)}>Increment</button>
        </div>
    );
};

const App = () => (
    <div className="App" style="display: flex; background: #f5f5f5; height: 80vh; margin: auto; align-items: center; justify-content: center; font-family: monospace;">
        <div style="display: flex; border-radius: 10px; flex-direction: column; background: white; width: 200px; height: 200px;padding: 20px;box-shadow: 0 10px 30px -25px;">
            <h1>I'm from JSX</h1>
            <Counter/>
        </div>
    </div>
);

// Rendering
document.getElementById('root')?.appendChild(<App onClick={console.log}/>);
```
