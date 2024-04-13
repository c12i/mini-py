# mini-py

`mini-py` is a streamlined Web Component that enables the execution of Python code directly within the browser. This component attempts to replicate the [`<py-script></py-script>`](https://pyscript.net) tag, utilizing [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) and [Pyodide](https://pyodide.org) to run Python scripts seamlessly on web pages.

## Features

- **Easy Integration**: Embed and run Python code just by writing it within the `<mini-py>` tags.
- **Programmatic Execution**: Control when your Python scripts execute with JavaScript.
- **Event-Driven**: Respond to various stages of Python code execution with custom events.

## Examples

### Default Behavior

Runs the Python code contained within the `mini-py` element by default.

```html
<mini-py>
import js

div = js.document.createElement("h1")
div.innerHTML = "This element was created from Python"
js.document.body.prepend(div)
</mini-py>
```

### Manual Triggering

Optionally prevent automatic execution (`autoRun="false"`) and trigger Python code programmatically.

```html
<mini-py autorun="false">print("Hello, World!")</mini-py>
<button onclick="document.querySelector('mini-py').runCode()">Run Code</button>
```

### Event Handling

Monitor the lifecycle of Python code execution using custom events.

```html
<mini-py id="python-script">print("Hello, World!")</mini-py>
<script>
  const pythonElement = document.getElementById("python-script");

  pythonElement.addEventListener("pyodide-loading", () => {
    console.log("Pyodide is loading...");
  });

  pythonElement.addEventListener("pyodide-loaded", () => {
    console.log("Pyodide has loaded.");
  });

  pythonElement.addEventListener("code-execution-started", () => {
    console.log("Python code execution has started.");
  });

  pythonElement.addEventListener("code-execution-completed", (event) => {
    console.log("Python code execution completed. Result:", event.detail.result);
  });

  pythonElement.addEventListener("code-execution-error", (event) => {
    console.error("Python code execution error:", event.detail.error);
  });
</script>
```

## Installation

TODO

## Browser Compatibility

`mini-py` uses modern web technologies that are supported in most recent versions of major browsers. For full compatibility details, refer to the MDN Web Docs on Web Components.
