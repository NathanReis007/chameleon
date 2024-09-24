const template = document.createElement("template");
template.innerHTML = `
    <style>
    
    </style>
`

class Dialog extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template);
    }
}

window.customElements.define("app-dialog", Dialog);