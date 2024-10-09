const header = document.getElementById('todos-header');
const input = document.getElementById('new-todo-input');
const button = document.getElementById('new-todo-button');
const list = document.getElementById('todo-list');

const todos = {};
let timerId = null;

function update() {
  const todoCount = Object.keys(todos).length;
  let doneCount = 0;
  for (const todo of Object.values(todos)) {
    if (todo.done) doneCount += 1;
  }
  header.classList.toggle(
    'todos-remaining',
    todoCount > 0 && doneCount !== todoCount
  );
  header.classList.toggle(
    'todos-done',
    todoCount > 0 && doneCount === todoCount
  );

  clearTimeout(timerId);
  if (todoCount > 0 && doneCount === todoCount) {
    timerId = setTimeout(() => {
      for (const todo of Object.keys(todos)) {
        delete todos[todo];
      }
      list.innerHTML = '';
      update();
    }, 3000);
  }
}

function addItem(todoText) {
  if (todoText in todos) return;
  const item = document.createElement('li');
  item.textContent = todoText;
  list.appendChild(item);
  todos[todoText] = { text: todoText, done: false };
  update();

  item.onclick = function () {
    item.innerHTML = `<del>${todoText}</del>`;
    todos[todoText].done = true;
    update();

    item.onclick = function () {
      item.remove();
      delete todos[todoText];
      update();
    };
  };
}

button.onclick = function () {
  const todoText = input.value.trim();
  if (!todoText) return;
  input.value = '';
  addItem(todoText);
};
