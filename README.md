# X-jsx - A library for rendering JSX to the DOM with reactivity, the first to be weighted in bytes

X-jsx is a lightweight library for rendering JSX to the DOM with reactivity support. It provides a minimalistic approach to building reactive user interfaces with JSX syntax.

![jsx](https://github.com/erikyo/xjsx/assets/8550908/896efa3c-92ed-4e8c-9a5e-01de98d5aead)

## Features

- **JSX Compilation**: Compile JSX syntax to DOM elements, allowing for intuitive UI development.
- **Reactivity**: Support for state management and effects, enabling reactive updates to the UI.
- **Lightweight**: Small footprint with a size of only 864 bytes, making it ideal for projects where code size is a concern.

## Installation

To install xjsx, you can use npm or yarn:

```sh
npm install x-jsx
```

## Usage

Here's a simple example of how to use xjsx in your project:


```typescript jsx
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

## API

### `createElement`

Creates a virtual DOM element.

### `render`

Renders a virtual DOM element to a real DOM element.

### `useState`

A hook for managing state in functional components.

### `useEffect`

A hook for handling side effects in functional components.

## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests on the [GitHub repository](https://github.com/your-username/xjsx).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Bundlers settings

Vite configuration

```json
export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'xjsx'
  }
})
```
