// eslint-disable-next-line
import TodoList from "./components/TodoList";
// eslint-disable-next-line
import Textfield from '@atlaskit/textfield';
// eslint-disable-next-line
import Button from '@atlaskit/button';
import { useCallback, useEffect, useState } from "react";
import {v4} from 'uuid';

const TODO_APP_STORAGE_KEY = 'TODO_APP';
function App() {
  // eslint-disable-next-line
  const [todoList, setTodoList] = useState([]);
  // eslint-disable-next-line
  const [textInput, setTextInput] = useState("");
  // eslint-disable-next-line

  useEffect(() => {
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storageTodoList){
      setTodoList(JSON.parse(storageTodoList));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList])
  const onTextChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick =  useCallback((e) => {
    setTodoList([...todoList,
       { id: v4(), name: textInput, isCompleted: false }]);
          setTextInput("");
  }, 
  [textInput, todoList]);

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) => prevState.map((todo) => todo.id === id ? 
      {...todo, isCompleted: true} : todo)
      );

  }, []);
  return  (
    <>

    <h3>This is TODO APP MAKE BY KONANDEV</h3>
    <Textfield name="add-todo" placeholder="Thêm việc cần làm..." elemAfterInput={
    <Button type="" 
      isDisabled={!textInput} 
        appearance='primary' 
          onClick={onAddBtnClick}>Thêm</Button>
    }
    css={{ padding: "2px 4px 2px"}}
      value={textInput}
        onChange={onTextChange}
    ></Textfield>
          <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick}/>

    </>
  );
}

export default App;
