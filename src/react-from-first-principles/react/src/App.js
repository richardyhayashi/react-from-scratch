import './styles.css';
import React from 'react';

function Todo(props) {
  const todo = props.todo;
  if (todo.done) {
    return <del>{todo.text}</del>;
  }
  return todo.text;
}

export default function App() {
  const inputRef = React.useRef();
  const [todos, updateTodos] = React.useState({});

  function onButtonClick() {
    const todo = inputRef.current.value;
    if (!todo) return;
    inputRef.current.value = '';
    updateTodos((todos) => ({ ...todos, [todo]: { text: todo, done: false } }));
  }

  function onDone({ text: todoText }) {
    updateTodos((todos) => {
      if (todos[todoText].done) {
        const { [todoText]: _, ...rest } = todos;
        return rest;
      } else {
        return {
          ...todos,
          [todoText]: { text: todoText, done: true },
        };
      }
    });
  }

  const todoCount = Object.keys(todos).length;
  let doneCount = 0;
  for (const todo of Object.values(todos)) {
    if (todo.done) doneCount += 1;
  }
  const finished = todoCount > 0 && todoCount === doneCount;

  React.useEffect(() => {
    if (finished) {
      const timerId = setTimeout(() => {
        updateTodos({});
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [finished]);

  const headerClass =
    todoCount === 0 ? '' : finished ? 'todos-done' : 'todos-remaining';

  return (
    <>
      <h1 className={headerClass}>TODOs</h1>
      <input ref={inputRef} />
      <button onClick={onButtonClick}>Add</button>
      <ul>
        {Object.values(todos).map((todo, index) => (
          <li key={todo.text} onClick={() => onDone(todo)}>
            <Todo todo={todo} />
          </li>
        ))}
      </ul>
    </>
  );
}
