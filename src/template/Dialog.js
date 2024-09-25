const templateAlert = document.createElement("template");
templateAlert.innerHTML = `
    <style>
        #body-dialog {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100dvw;
            height: 100dvh;
            background-color: #0005;
            backdrop-filter: blur(4px);
            z-index: 2000;

            display: grid;
            align-items: center;
            justify-content: center;
        }

        #body-dialog span {
            min-width: 200px;
            width: 100dvw;
            max-width: 400px;
            padding: 0px 20px 0 20px;
            border-radius: 15px;
            background-color: var(--background);
            display: grid;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow);
        }

        #body-dialog span p, #body-dialog span h1  {
            padding: 20px;
        }

        #body-dialog span #buttons {
            min-width: 200px;
            width: 100dvw;
            max-width: 400px;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 20px;
        }

        #body-dialog span #buttons button {
            padding: 10px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            box-shadow: var(--shadow);
            flex-grow: 1;
            flex-basis: 150px;
            color: #ffffff;
            font-size: 1rem;
        }

        #body-dialog span #buttons button:hover {
            opacity: .8;
        }

        #body-dialog span #buttons button.success {
            background-color: var(--green);
            color: #000000;
        }

        #body-dialog span #buttons button.warn {
            background-color: var(--pink);
            color: #000000;
        }

        #body-dialog span #buttons button.info {
            background-color: var(--primary);
        }
    </style>

    <div id="body-dialog">
        <span>
            <h1><slot name="title"></slot></h1>
            <p><slot name="message"></slot></p>
            <div id="buttons">
                <button type="button" class="warn">Entendi</button>
            </div>
        </span>
    </div>
`

class DialogAlert extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(templateAlert.content.cloneNode(true));
    }

    connectedCallback() {
        const $main = this.shadowRoot.querySelector("#body-dialog");
        const $button = this.shadowRoot.querySelector("button");
        
        $button.onclick = () => {
            $main.remove();
        };
    }
}
window.customElements.define("app-dialog-alert", DialogAlert);

// Confirm
const templateConfirm = document.createElement("template");
templateConfirm.innerHTML = `
    <style>
        #body-dialog {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100dvw;
            height: 100dvh;
            background-color: #0005;
            backdrop-filter: blur(4px);
            z-index: 2000;

            display: grid;
            align-items: center;
            justify-content: center;
        }

        #body-dialog span {
            min-width: 200px;
            width: 100dvw;
            max-width: 400px;
            padding: 0px 20px 0 20px;
            border-radius: 15px;
            background-color: var(--background);
            display: grid;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow);
        }

        #body-dialog span p, #body-dialog span h1  {
            padding: 20px;
        }

        #body-dialog span #buttons {
            min-width: 200px;
            width: 100dvw;
            max-width: 400px;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 20px;
        }

        #body-dialog span #buttons button {
            padding: 10px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            box-shadow: var(--shadow);
            flex-grow: 1;
            flex-basis: 150px;
            color: #ffffff;
            font-size: 1rem;
        }

        #body-dialog span #buttons button:hover {
            opacity: .8;
        }

        #body-dialog span #buttons button.success {
            background-color: var(--green);
            color: #000000;
        }

        #body-dialog span #buttons button.warn {
            background-color: var(--pink);
            color: #000000;
        }

        #body-dialog span #buttons button.info {
            background-color: var(--primary);
        }
    </style>

    <div id="body-dialog">
        <span>
            <h1><slot name="title"></slot></h1>
            <p><slot name="message"></slot></p>
            <div id="buttons">
                <button type="button" id="no" class="warn">Não</button>
                <button type="button" id="yes" class="info">Sim</button>
            </div>
        </span>
    </div>
`

class DialogConfirm extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(templateConfirm.content.cloneNode(true));
    }
}
window.customElements.define("app-dialog-confirm", DialogConfirm);


const openDialog = {
    confirm: (title='',message='') => {
        return new Promise((resolve,reject) => {
            const $body = document.querySelector("body");
            const dialog = document.createElement("app-dialog-confirm");
            const titleSpan = document.createElement("span");
            const messageSpan = document.createElement("span");
        
            titleSpan.slot = "title";
            titleSpan.innerText = title;
            dialog.appendChild(titleSpan);
        
            messageSpan.slot = "message";
            messageSpan.innerText = message;
            dialog.appendChild(messageSpan);
    
            const noConfirm = dialog.shadowRoot.querySelector("#no");
            const confirm = dialog.shadowRoot.querySelector("#yes");
            
            noConfirm.addEventListener("click", () => {
                resolve(false)
                dialog.remove();
            });
            
            confirm.addEventListener("click", () => {
                resolve(true)
                dialog.remove();
            });
    
            $body.appendChild(dialog);
        });
    },

    alert: (title='',message='') => {
        const $body = document.querySelector("body");
        const dialog = document.createElement("app-dialog-alert");
        const titleSpan = document.createElement("span");
        const messageSpan = document.createElement("span");
    
        titleSpan.slot = "title";
        titleSpan.innerText = title;
        dialog.appendChild(titleSpan);
    
        messageSpan.slot = "message";
        messageSpan.innerText = message;
        dialog.appendChild(messageSpan);
    
        $body.appendChild(dialog);
    }
};