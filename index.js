class MiniPy extends HTMLElement {
  constructor() {
    super();
    this.code = "";
    this.autoRun = true;
  }

  connectedCallback() {
    this.code = this.textContent.trim();
    this.textContent = "";
    this.autoRun = this.hasAttribute("autorun") ? (this.getAttribute("autorun") === "true") : true;
    if (this.autoRun) {
      this._initializePyodideAndRunCode();
    }
  }

  disconnectedCallback() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  runCode() {
    this._initializePyodideAndRunCode();
  }

  _initializePyodideAndRunCode() {
    this._dispatchEvent("pyodide-loading");
    if (!window.pyodidePromise) {
      window.pyodidePromise = loadPyodide();
      window.pyodidePromise.then(() => {
        this._dispatchEvent('pyodide-loaded')
      });
    }
    window.pyodidePromise
      .then(pyodide => {
        this._dispatchEvent("code-execution-started");
        return pyodide.runPython(this.code);
      })
      .then(result => {
        this._dispatchEvent("code-execution-completed");
        console.log(result);
      })
      .catch(error => {
        this._dispatchEvent('code-execution-error', {error: error});
        console.error("Python execution error:", error);
      });
  }

  _dispatchEvent(name, detail = {}) {
    const event = new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail
    })
    this.dispatchEvent(event)
  }
}

customElements.define("mini-py", MiniPy);