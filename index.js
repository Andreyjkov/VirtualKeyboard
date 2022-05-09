import keyBase from './keyBase.js';

const main = document.createElement('main');
const keyBoard = document.createElement('section');
const classActive = (node) => {
  node.classList.add('active');
};

const classRemoveActive = (node) => {
  node.classList.remove('active');
};
let language = '';
const lng = window.localStorage.getItem('lng');
if (lng === null) {
  window.localStorage.setItem('lng', 'eng');
  language = 'eng';
} else {
  language = lng;
}
// значения кнопок
class Button {
  constructor({
    code, value, valueShift, keySpecial,
  }) {
    this.code = code;
    this.value = value;
    this.valueShift = valueShift;
    this.language = language;
    this.keySpecial = keySpecial;
  }

  // создание кнопки
  generateBtn() {
    const btn = document.createElement('li');
    let temp = '';
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
// шифт
const capsSwichAdd = (nodeArr) => {
  nodeArr.forEach((el) => {
    el.children.item(0).classList.add('upperCase');
    el.children.item(0).classList.remove('lowerCase');
    el.children.item(1).classList.add('lowerCase');
    el.children.item(1).classList.remove('upperCase');
  });
};
// убираем шифт
const capsSwichRemove = (nodeArr) => {
  nodeArr.forEach((el) => {
    el.children.item(0).classList.add('lowerCase');
    el.children.item(0).classList.remove('upperCase');
    el.children.item(1).classList.add('upperCase');
    el.children.item(1).classList.remove('lowerCase');
  });
};
// создание поля ввода
const textarea = document.createElement('textarea');
const renderTextarea = () => {
  textarea.id = 'textarea';
  textarea.setAttribute('rows', '10');
  return textarea;
};

const input = (val) => {
  let position = textarea.selectionStart;
  const text = textarea.value;
  const array = text.split('');
  array.splice(position, 0, val);
  textarea.value = array.join('');
  position += 1;
  textarea.selectionStart = position;
  textarea.selectionEnd = position;
  setTimeout(() => {
    textarea.focus();
  }, 0);
};
// backspace key
const backspaceOut = () => {
  let position = textarea.selectionStart;
  if (position === 0) {
    return;
  }
  const text = textarea.value;
  const array = text.split('');
  array.splice(position - 1, 1);
  textarea.value = array.join('');
  position += -1;
  textarea.selectionStart = position;
  textarea.selectionEnd = position;
  setTimeout(() => {
    textarea.focus();
  }, 0);
};
// del key
const deleteOut = () => {
  let position = textarea.selectionStart;
  const text = textarea.value;
  const array = text.split('');
  array.splice(position, 1);
  textarea.value = array.join('');
  position += 0;
  textarea.selectionStart = position;
  textarea.selectionEnd = position;
  setTimeout(() => {
    textarea.focus();
  }, 0);
};
const tab = () => {
  let position = textarea.selectionStart;
  const text = textarea.value;
  const array = text.split('');
  array.splice(position, 0, '    ');
  textarea.value = array.join('');
  position += 4;
  textarea.selectionStart = position;
  textarea.selectionEnd = position;
  setTimeout(() => {
    textarea.focus();
  }, 0);
};
// заполнение клавиатуры
const renderKeyBoard = () => {
  keyBoard.remove();
  main.appendChild(keyBoard);
  keyBoard.innerHTML = '';

  keyBase[language].map((el, id) => {
    const row = document.createElement('ul');
    row.className = `row row-${id}`;
    keyBoard.appendChild(row);
    return el.map((item) => {
      const btnEl = new Button({ ...item });
      return row.appendChild(btnEl.generateBtn());
    });
  });

  const allButtons = document.querySelectorAll('.btn');

  // Мышь, кнопка ВНИЗ
  allButtons.forEach((el) => {
    const mouseDownListener = (e) => {
      const { target } = e;
      if (
        target.classList.contains('ShiftLeft')
        || target.parentElement.classList.contains('ShiftLeft')
        || target.parentElement.classList.contains('ShiftRight')
        || target.classList.contains('ShiftRight')
      ) {
        if (
          target.classList.contains('ShiftLeft')
          || target.classList.contains('ShiftRight')
        ) {
          classActive(target);
        }
        if (
          target.parentElement.classList.contains('ShiftLeft')
          || target.parentElement.classList.contains('ShiftRight')
        ) {
          classActive(target.parentElement);
        }
        capsSwichAdd(allButtons);
      }
      if (
        target.classList.contains('CapsLock')
        || target.parentElement.classList.contains('CapsLock')
      ) {
        if (
          target.classList.contains('active')
          || target.parentElement.classList.contains('active')
        ) {
          setTimeout(() => {
            classRemoveActive(target);
            classRemoveActive(target.parentElement);
          }, 0);

          allButtons.forEach((btnNoSp, i) => {
            if (!btnNoSp.classList.contains('btn-special')) {
              allButtons[i].children.item(0).innerText = btnNoSp.children
                .item(0)
                .innerText.toLowerCase();
              allButtons[i].children.item(1).innerText = btnNoSp.children
                .item(1)
                .innerText.toUpperCase();
            }
          });
        } else {
          allButtons.forEach((btnNoSp, i) => {
            if (!btnNoSp.classList.contains('btn-special')) {
              allButtons[i].children.item(0).innerText = btnNoSp.children
                .item(0)
                .innerText.toUpperCase();
              allButtons[i].children.item(1).innerText = btnNoSp.children
                .item(1)
                .innerText.toLowerCase();
            }
          });
        }
      }

      if (target.classList.contains('Space')) {
        classActive(target);
        input(' ');
        return;
      }
      if (
        target.classList.contains('Tab')
        || target.parentElement.classList.contains('Tab')
      ) {
        classActive(target);
        input('    ');
        return;
      }
      if (
        target.classList.contains('Enter')
        || target.parentElement.classList.contains('Enter')
      ) {
        classActive(target);
        input('\n');
        return;
      }
      if (
        target.classList.contains('Backspace')
        || target.parentElement.classList.contains('Backspace')
      ) {
        classActive(target);
        setTimeout(() => {
          backspaceOut();
        }, 0);
        return;
      }
      if (
        target.classList.contains('Delete')
        || target.parentElement.classList.contains('Delete')
      ) {
        classActive(target);
        setTimeout(() => {
          deleteOut();
        }, 0);
        return;
      }
      if (target.classList.contains('btn')) {
        if (target.classList.contains('btn-special')) {
          input('');
          classActive(target);
          return;
        }
        classActive(target);
        input(target.children.item(0).innerText);
        return;
      }
      if (!target.classList.contains('btn')) {
        if (target.parentElement.classList.contains('btn-special')) {
          classActive(target.parentElement);
        } else {
          classActive(target.parentElement);
          input(target.innerText);
        }
      }
    };
    el.addEventListener('mousedown', mouseDownListener);
    // Мышь, кнопка ВЕРХ
    el.addEventListener('mouseup', () => {
      allButtons.forEach((elMouseup) => {
        if (!elMouseup.classList.contains('CapsLock')) {
          classRemoveActive(elMouseup);
          classRemoveActive(elMouseup.children.item(0));
        }
      });
      capsSwichRemove(allButtons);
    });
  });
  // Клавиатура,кнопка ВЕРХ
  const keyUpListener = (e) => {
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      capsSwichRemove(allButtons);
    }

    allButtons.forEach((el) => {
      if (!el.classList.contains('CapsLock')) {
        classRemoveActive(el);
      }
    });
  };
  // Клавиатура,кнопка ВНИЗ
  const keyDownListener = (e) => {
    e.preventDefault();
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      capsSwichAdd(allButtons);
    }
    allButtons.forEach((el) => {
      if (el.classList.contains(e.code)) {
        if (el.classList.contains('Space')) {
          classActive(el);
          input(' ');
          return;
        }
        if (el.classList.contains('Tab')) {
          classActive(el);
          tab();
          return;
        }
        if (el.classList.contains('CapsLock')) {
          allButtons.forEach((item) => {
            if (item.classList.contains('CapsLock')) {
              if (item.classList.contains('active')) {
                setTimeout(() => {
                  classRemoveActive(item);
                }, 0);
                allButtons.forEach((btnNoSp, i) => {
                  if (!btnNoSp.classList.contains('btn-special')) {
                    allButtons[i].children.item(0).innerText = btnNoSp.children
                      .item(0)
                      .innerText.toLowerCase();
                    allButtons[i].children.item(1).innerText = btnNoSp.children
                      .item(1)
                      .innerText.toUpperCase();
                  }
                });
              } else {
                allButtons.forEach((btnNoSp, i) => {
                  if (!btnNoSp.classList.contains('btn-special')) {
                    allButtons[i].children.item(0).innerText = btnNoSp.children
                      .item(0)
                      .innerText.toUpperCase();
                    allButtons[i].children.item(1).innerText = btnNoSp.children
                      .item(1)
                      .innerText.toLowerCase();
                  }
                });
              }
            }
          });
          classActive(el);
          return;
        }
        if (el.classList.contains('Enter')) {
          classActive(el);
          input('\n');
          return;
        }
        if (el.classList.contains('Backspace')) {
          classActive(el);
          setTimeout(() => {
            backspaceOut();
          }, 0);
          return;
        }
        if (el.classList.contains('Delete')) {
          classActive(el);
          setTimeout(() => {
            deleteOut();
          }, 0);
          return;
        }
        if (el.classList.contains('ArrowLeft')) {
          classActive(el);
          input('◄');
          return;
        }
        if (el.classList.contains('ArrowRight')) {
          classActive(el);
          input('►');
          return;
        }
        if (el.classList.contains('ArrowUp')) {
          classActive(el);
          input('▲');
          return;
        }
        if (el.classList.contains('ArrowDown')) {
          classActive(el);
          input('▼');
          return;
        }
        if (
          el.classList.contains('Tab')
          || el.classList.contains('CapsLock')
          || el.classList.contains('ShiftLeft')
          || el.classList.contains('ControlLeft')
          || el.classList.contains('MetaLeft')
          || el.classList.contains('AltLeft')
          || el.classList.contains('AltRight')
          || el.classList.contains('ControlRight')
          || el.classList.contains('ShiftRight')
          || el.classList.contains('Enter')
          || el.classList.contains('Backspace')
          || el.classList.contains('Delete')
          || el.classList.contains('ArrowLeft')
          || el.classList.contains('ArrowRight')
          || el.classList.contains('ArrowUp')
          || el.classList.contains('ArrowDown')
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
      if (language === 'eng') {
        language = 'ru';
        window.localStorage.setItem('lng', 'ru');
      } else if (language === 'ru') {
        language = 'eng';
        window.localStorage.setItem('lng', 'eng');
      }
    };
    const pushKeyLanguage = () => {
      const ctrlLeft = document.querySelector('.ControlLeft');
      const altlLeft = document.querySelector('.AltLeft');
      if (
        ctrlLeft.classList.contains('active')
        && altlLeft.classList.contains('active')
      ) {
        switchLanguage();
        document.removeEventListener('keydown', keyDownListener);
        document.removeEventListener('keyup', keyUpListener);
        keyBoard.remove();
        renderKeyBoard();
      }
    };
    pushKeyLanguage();
  };
  // // Клавиатура,кнопка ВЕРХ
  // const keyUpListener = (e) => {
  //   if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
  //     capsSwichRemove(allButtons);
  //   }

  //   allButtons.forEach((el) => {
  //     if (!el.classList.contains('CapsLock')) {
  //       classRemoveActive(el);
  //     }
  //   });
  // };
  document.removeEventListener('keydown', keyDownListener);
  document.addEventListener('keydown', keyDownListener);
  document.removeEventListener('keyup', keyUpListener);
  document.addEventListener('keyup', keyUpListener);
  return keyBoard;
};
const init = () => {
  document.body.appendChild(main);
  main.appendChild(renderTextarea());
  main.appendChild(renderKeyBoard());
  main.insertAdjacentHTML(
    'afterend',
    "<p class ='description'>Клавиатура создана в операционной системе Windows</p><p class='language'>Для переключения языка комбинация: левыe ctrl + alt</p>",
  );
};
init();
