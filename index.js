import { keyBase } from './keyBase.js';


const main = document.createElement("main");
const keyBoard = document.createElement("section");

// const row = document.createElement("div")
// row.className = `row`

let language = "eng";
// console.log(language);
//значения кнопок
class Button {
  constructor({ code, value, valueShift, keySpecial }) {
    this.code = code;
    this.value = value;
    this.valueShift = valueShift;
    this.keySpecial = keySpecial;
    this.language = language;
  }
  //создание кнопки
  generateBtn() {
    const btn = document.createElement("li");
    let temp = "";
    if (this.keySpecial) {
      btn.className = `btn  ${this.keySpecial}`;
    } else {
      btn.className = `btn ${this.code}`;
    }
    temp += `<span class="span">${this.value}</span>`;
    temp += `<span class="none">${this.value}</span>`;
    btn.innerHTML = temp;
    return btn;
  }
}


const renderKeyBoard = () => {
//   keyBoard.remove();
//   main.appendChild(keyBoard);
//   keyBoard.innerHTML = "";

  keyBase[language].map((el, id) => {
    const row = document.createElement("ul");
    row.className = `row row-${id}`;
    keyBoard.appendChild(row);
    return el.map((item) => {
      const btnEl = new Button({ ...item });
      return row.appendChild(btnEl.generateBtn());
    });
  });
  return keyBoard
};
renderKeyBoard()


const init =() => {
    document.body.appendChild(main);
    main.appendChild(keyBoard)
    
}
 init ()

// main.appendChild(keyBoard);
// main.appendChild(renderKeyBoard)
// keyBoard.appendChild(row)

