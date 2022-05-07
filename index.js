import { keyBase } from "./keyBase.js";

const main = document.createElement("main");
const keyBoard = document.createElement("section");
const classActive = (node) => {
  node.classList.add("active");
};

const classRemoveActive = (node) => {
  node.classList.remove("active");
};

// const classActiveSpecial = (node) => {
//   node.classList.add("activeSpecial");
// };
// const classRemoveSpecial = (node) => {
//   node.classList.add("activeSpecial");
// };

let language = "";
const lng = window.localStorage.getItem("lng");
// console.log(lng);
if (lng === null) {
  window.localStorage.setItem("lng", "eng");
  language = "eng";
} else {
  language = lng;
}
//значения кнопок
class Button {
  constructor({ code, value, valueShift, keySpecial }) {
    this.code = code;
    this.value = value;
    this.valueShift = valueShift;
    this.language = language;
    this.keySpecial = keySpecial;
  }
  //создание кнопки
  generateBtn() {
    const btn = document.createElement("li");
    let temp = "";
    if (this.keySpecial) {
      btn.className = `btn btn-special ${this.keySpecial}`;
    } else {
      btn.className = `btn ${this.code}`;
    }
    temp += `<span class="lowerCase">${this.value}</span>`;
    temp += `<span class="upperCase">${this.valueShift}</span>`;
    btn.innerHTML = temp;
    return btn;
  }
}
const capsSwichAdd = (nodeArr) => {
  nodeArr.forEach((el) => {
    el.children.item(0).classList.add("upperCase");
    el.children.item(0).classList.remove("lowerCase");
    el.children.item(1).classList.add("lowerCase");
    el.children.item(1).classList.remove("upperCase");
  });
};
const capsSwichRemove = (nodeArr) => {
  nodeArr.forEach((el) => {
    el.children.item(0).classList.add("lowerCase");
    el.children.item(0).classList.remove("upperCase");
    el.children.item(1).classList.add("upperCase");
    el.children.item(1).classList.remove("lowerCase");
  });
};
//создание поля ввода
const textarea = document.createElement("textarea");
const renderTextarea = () => {
  textarea.id = "textarea";
  textarea.setAttribute("rows", "10");
  return textarea;
};

const input = (val) => {
  let position = textarea.selectionStart;
  const text = textarea.value;
  const array = text.split("");
  array.splice(position, 0, val);
  textarea.value = array.join("");
  position += 1;
  textarea.selectionStart = position;
  textarea.selectionEnd = position;
  setTimeout(() => {
    textarea.focus();
  }, 0);
};

const backspaceOut = () => {
  let position = textarea.selectionStart;
  if (position === 0) {
    return;
  }
  const text = textarea.value;
  const array = text.split("");
  array.splice(position - 1, 1);
  textarea.value = array.join("");
  position += -1;
  textarea.selectionStart = position;
  textarea.selectionEnd = position;
  setTimeout(() => {
    textarea.focus();
  }, 0);
};

const deleteOut = () => {
  let position = textarea.selectionStart;
  const text = textarea.value;
  const array = text.split("");
  array.splice(position, 1);
  textarea.value = array.join("");
  position += 0;
  textarea.selectionStart = position;
  textarea.selectionEnd = position;
  setTimeout(() => {
    textarea.focus();
  }, 0);
};

const renderKeyBoard = () => {
  keyBoard.remove();
  main.appendChild(keyBoard);
  keyBoard.innerHTML = "";

  keyBase[language].map((el, id) => {
    const row = document.createElement("ul");
    row.className = `row row-${id}`;
    keyBoard.appendChild(row);
    return el.map((item) => {
      const btnEl = new Button({ ...item });
      return row.appendChild(btnEl.generateBtn());
    });
  });
  let allButtons = document.querySelectorAll(".btn");

  // Мышь, кнопка ВНИЗ

  allButtons.forEach((el) => {
    const mouseDownListener = (e) => {
      let target = e.target;
      if (
        target.classList.contains("ShiftLeft") ||
        target.classList.contains("ShiftRight")
      ) {
        classActive(target);
        capsSwichAdd(allButtons);
      }

      if (target.classList.contains("Space")) {
        classActive(target);
        input(" ");
        return;
      }
      if (target.classList.contains("Tab")) {
        classActive(target);
        input("    ");
        return;
      }
      if (target.classList.contains("Enter")) {
        classActive(target);
        input("\n");
        return;
      }
      if (target.classList.contains("Backspace")) {
        classActive(target);
        setTimeout(() => {
          backspaceOut();
        }, 0);
        return;
      }
      if (target.classList.contains("Delete")) {
        classActive(target);
        setTimeout(() => {
          deleteOut();
        }, 0);
        return;
      }
      if (target.classList.contains("btn")) {
        if (target.classList.contains("btn-special")) {
          input("");
          classActive(target);
          return;
        } else {
          classActive(target);
          input(target.children.item(0).innerText);
          return;
        }
      }
      if (!target.classList.contains("btn")) {
        if (target.parentElement.classList.contains("btn-special")) {
          classActive(target.parentElement);
          input("");
        } else {
          classActive(target.parentElement);
          input(target.innerText);
          return;
        }
      }
    };
    el.addEventListener("mousedown", mouseDownListener);

    // Мышь, кнопка ВЕРХ

    el.addEventListener("mouseup", () => {
      allButtons.forEach((elMouseup) => {
        classRemoveActive(elMouseup);
        capsSwichRemove(allButtons);
      });
    });
  });

  //Клавиатура,кнопка ВНИЗ

  const keyDownListener = (e) => {
    e.preventDefault();
    console.log(e.code);
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
      capsSwichAdd(allButtons);
    }

    allButtons.forEach((el) => {
      if (el.classList.contains(e.code)) {
        if (el.classList.contains("Space")) {
          classActive(el);
          input(" ");
          return;
        }
        if (el.classList.contains("Tab")) {
          classActive(el);
          input("    ");
          return;
        }
        if (el.classList.contains("Enter")) {
          classActive(el);
          input("\n");
          return;
        }
        if (el.classList.contains("Backspace")) {
          classActive(el);
          setTimeout(() => {
            backspaceOut();
          }, 0);
          return;
        }
        if (el.classList.contains("Delete")) {
          classActive(el);
          setTimeout(() => {
            deleteOut();
          }, 0);
          return;
        }
        if (el.classList.contains("ArrowLeft")) {
          classActive(el);
          input("◄");
          return;
        }
        if (el.classList.contains("ArrowRight")) {
          classActive(el);
          input("►");
          return;
        }
        if (el.classList.contains("ArrowUp")) {
          classActive(el);
          input("▲");
          return;
        }
        if (el.classList.contains("ArrowDown")) {
          classActive(el);
          input("▼");
          return;
        }

        if (
          el.classList.contains("Tab") ||
          el.classList.contains("CapsLock") ||
          el.classList.contains("ShiftLeft") ||
          el.classList.contains("ControlLeft") ||
          el.classList.contains("MetaLeft") ||
          el.classList.contains("AltLeft") ||
          el.classList.contains("AltRight") ||
          el.classList.contains("ControlRight") ||
          el.classList.contains("ShiftRight") ||
          el.classList.contains("Enter") ||
          el.classList.contains("Backspace") ||
          el.classList.contains("Delete") ||
          el.classList.contains("ArrowLeft") ||
          el.classList.contains("ArrowRight") ||
          el.classList.contains("ArrowUp") ||
          el.classList.contains("ArrowDown")
        ) {
          classActive(el);
        } else {
          classActive(el);
          input(el.innerText);
        }
      }
    });

    // переключения языка
    const switchLanguage = () => {
      if (language === "eng") {
        language = "ru";
        window.localStorage.setItem("lng", "ru");
        return;
      } else if (language === "ru") {
        language = "eng";
        window.localStorage.setItem("lng", "eng");
        return;
      }
    };
    const pushKeyLanguage = () => {
      const ctrlLeft = document.querySelector(".ControlLeft");
      const altlLeft = document.querySelector(".AltLeft");
      if (
        ctrlLeft.classList.contains("active") &&
        altlLeft.classList.contains("active")
      ) {
        switchLanguage();
        document.removeEventListener("keydown", keyDownListener);
        document.removeEventListener("keyup", keyUpListener);
        keyBoard.remove();
        renderKeyBoard();
      }
    };
    pushKeyLanguage();
  };

  //Клавиатура,кнопка ВЕРХ

  const keyUpListener = (e) => {
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
      capsSwichRemove(allButtons);
    }
    allButtons.forEach((el) => {
      classRemoveActive(el);
    });
  };

  document.removeEventListener("keydown", keyDownListener);
  document.addEventListener("keydown", keyDownListener);
  document.removeEventListener("keyup", keyUpListener);
  document.addEventListener("keyup", keyUpListener);
  return keyBoard;
};

const init = () => {
  document.body.appendChild(main);
  main.appendChild(renderTextarea());
  main.appendChild(renderKeyBoard());
  main.insertAdjacentHTML(
    "afterend",
    "<p class ='description'>Клавиатура создана в операционной системе Windows</p><p class='language'>Для переключения языка комбинация: левыe ctrl + alt</p>"
  );
};
init();
