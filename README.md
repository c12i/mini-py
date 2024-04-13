#  mini-py

An **extremely** simplified way to run python in the browser with a similar API to the [`<py-script></py-script>`](https://pyscript.net) tag, re-implemented as `<mini-py></mini-py>`, using [web-components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) and [pyodide](https://pyodide.org)


## Examples

- default behaviour is to run the python code in the `mini-py` element

```html
<mini-py>
import js

div = js.document.createElement("h1")
div.innerHTML = "This element was created from Python"
js.document.body.prepend(div)
</mini-py>
```

- with `autoRun` set to `"false"`

```html
<mini-py autorun="false">print("Hello, World!")</mini-py>
<button onclick="document.querySelector('mini-py').runCode()">Run Code</button>
```

- event handling

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