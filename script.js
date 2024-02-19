
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
    justify-content: center; 
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
    checklist.addEventListener('click', () => this. toggleChecked());

    const checklistItems = document.querySelectorAll('checklist-item');
    checklistItems.forEach(item => item.updateProgressBar());

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
    // console.log(completionPercentage);

    const progressBar = this.shadow.querySelector('.big .small');
    progressBar.style.width = `${completionPercentage}%`;

    // console.log (progressBar.style.width);

    const progressBarText = this.shadow.querySelector('.meter p');
    progressBarText.textContent = `${Math.round(completionPercentage)}% complete`;
    // console.log(updateProgressBar)
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
  }
} 

customElements.define('checklist-item', CheckListItem);
customElements.define('recurring-button', RecurringButton);

const inputBox = document.getElementById('input-box');
const wrapper = document.getElementById('wrapper')

function addTask() {
  if (inputBox.value === '') {
    alert('You must write something!')
  } else {
    let newItem = document.createElement('li');
    newItem.getAttribute
    newItem.innerHTML = inputBox.value;
    wrapper.appendChild(newItem);
  }
}

let row = document.getElementById('row');
let isClicked = true;


function showInput() {
  if (isClicked) {
    row.style.display = 'block';
    isClicked = false;
  }else {
    row.style.display = 'none';
    isClicked = true;
  }
  
  
}








