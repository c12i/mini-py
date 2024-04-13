#  python-script

An **extremely** simplified way to run python in the browser with a similar API to the [`<py-script></py-script>`](https://pyscript.net) tag, re-implemented as `<mini-py></mini-py>`, using [web-components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) and [pyodide](https://pyodide.org)


```html
    <mini-py>
import js

div = js.document.createElement("h1")
div.innerHTML = "This element was created from Python"
js.document.body.prepend(div)
    </mini-py>
```