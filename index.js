class MiniPy extends HTMLElement {
  constructor() {
    super();
    this.code = ''
  }

  connectedCallback() {
    this.code = this.textContent.trim();
    this.textContent = '';
    this.initializePyodideAndRunCode();
  }

  initializePyodideAndRunCode() {
    if (!window.pyodidePromise) {
      window.pyodidePromise = loadPyodide();
    }
    window.pyodidePromise
      .then(pyodide => {
        return pyodide.runPython(this.code);
      })
      .then(console.log)
      .catch(error => {
        console.error('Python execution error:', error);
      });
  }
}

customElements.define('mini-py', MiniPy);