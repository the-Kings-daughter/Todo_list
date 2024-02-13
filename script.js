const template = document.createElement("template")
template.innerHTML = `
<style>
  :host .checklist {
    display: flex;
    gap: 1rem;
    align-items: center;
    cursor: pointer;
  }

.uncheck {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid #b5ea81;
    outline: none;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center; /* Center the SVG */
}
.uncheck:hover {
    background-color: #b5ea81;
}
:host([checked]) .checklist .uncheck {
    background-color: #b5ea81;
}

.checklist p {
    color: #a6a6a6ff;
    font-weight: 400;
}
</style>
<div class="checklist">
  <button class="uncheck">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1)">
      <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
    </svg>
  </button>
  <p><slot></slot></p>
</div>
`;

class CheckListItem extends HTMLElement {
    name = 'checklist-item'
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.appendChild(template.content.cloneNode(true));

        const checklist = this.shadow.querySelector('.checklist');
        checklist.addEventListener('click', () => this.toggleChecked());
    }
    toggleChecked() {
        this.hasAttribute('checked') ?
            this.removeAttribute('checked') :
            this.setAttribute('checked', '');
    }
    updateProgressBar() {
        const checklistItems = this.shadow.querySelectorAll('.checklist-item');
        const totalItems = checklistItems.length;
        const checkedItems = Array.from(checklistItems).filter(item => item.hasAttribute('checked')).length;
        const completionPercentage = (checkedItems / totalItems) * 100;

        const progressBar = this.shadow.querySelector('.small');
        progressBar.style.width = `${completionPercentage}%`;

        const progressBarText = this.shadow.querySelector('.meter p');
        progressBarText.textContent = `${Math.round(completionPercentage)}% complete`;
    }
}

class RecurringButton extends HTMLElement {
    name = 'recurring-button'
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <style>
          button {
            width: 140px;
            height: 40px;
            border-radius: 20px;
            font-size: 16px;
          }

          :host([color="yellow"]) button {
            background-color: #f5ed84;
            color: #b5b179ff;
            border: none;
          }

          :host([color="green"]) button {
            background-color: #b5ea81;
            color: #8ca376ff;
            border: none;
          }

          :host([color="pink"]) button {
            background-color: #f8aaaa;
            color: #a38686ff;
            border: none;
          }

          :host([color="blue"]) button {
            background-color: #b3b3ef;
            color: #88889eff;
            border: none;
          }
        </style>
        <button><slot></slot></button>
        `;

        const checklistItems = this.shadow.querySelectorAll('.checklist-item');
        checklistItems.forEach(checklistItem => {
            checklistItem.addEventListener('click', () => {
                checklistItem.toggleChecked();
                this.updateProgressBar();
            });
        });
        this.updateProgressBar();
    }
}



customElements.define('checklist-item', CheckListItem);
customElements.define('recurring-button', RecurringButton);



