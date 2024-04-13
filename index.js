const PYODIDE_CDN_URI = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";

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
    this._ensurePyodideLoaded().then(() => {
      if (this.autoRun) {
        this._initializePyodideAndRunCode();
      }
    }).catch(error => {
      console.error('Failed to load Pyodide:', error);
    });
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
        this._dispatchEvent('code-execution-error', { error });
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

  _ensurePyodideLoaded() {
    return new Promise((resolve, reject) => {
      if (window.pyodide) {
        resolve();
      } else if (!window.pyodideLoadingPromise) {
        // load pyodide via cdn
        const script = document.createElement('script');
        script.src = PYODIDE_CDN_URI;
        script.onload = () => {
          window.pyodideLoadingPromise = loadPyodide();
          window.pyodideLoadingPromise.then(() => {
            window.pyodide = true;
            resolve();
          });
        };
        script.onerror = reject;
        document.head.appendChild(script);
      } else {
        window.pyodideLoadingPromise.then(resolve).catch(reject);
      }
    });
  }
}

customElements.define("mini-py", MiniPy);