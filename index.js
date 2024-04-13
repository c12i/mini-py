class PythonElement extends HTMLElement {
  constructor() {
    super();
    this.code = this.textContent;
    this.textContent = ''
    loadPyodide()
      .then(pyodide => {
        console.log(pyodide.runPython(this.code));
      })
      .catch(e => {
        throw e;
      })
  }
}

customElements.define('mini-py', PythonElement);

