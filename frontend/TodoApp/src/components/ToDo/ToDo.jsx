import React, { useEffect, useState } from "react";
import "./ToDo.css";
import { TodoInput } from "./TodoInput/TodoInput";
import { TodoButton } from "./TodoButton/TodoButton";
import { TodoList } from "./TodoList/TodoList";
import { TodoEdit } from "./TodoEdit/TodoEdit";
import axios from "axios";
import { API_URL } from "../../constants/constants";
let todoId = 0;

export function ToDo() {
  const [todoItem, setTodoItem] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setTodoItem(e.target.value);
  };

  const fetchTodoList = async () => {
    try {
      const response = await axios(API_URL);
      console.log("===get response", response);
      if (response) {
        setTodoList(response.data);
      } else {
        setError("Todo List is empty please add a task");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, [todoItem]);

  const addTodoItem = async (e) => {
    e.preventDefault();
    try {
      if (todoItem) {
        const response = await axios(API_URL, {
          method: "POST",
          data: {
            title: todoItem,
          },
        });
        fetchTodoList();
        setError("");
      } else {
        setError("* Input field is required,enter your task");
      }
    } catch (error) {
      console.log(error);
    }
    setTodoItem("");
    setError("");
  };

  console.log("todoitem..", todoItem);

  return (
    <div className="todo-main-container">
      <h2 className="heading">Todo List</h2>
      <div className="todo-input-section">
        <TodoInput
          onChange={handleChange}
          value={todoItem}
          name="addInput"
          type="text"
          placeholder="Add Todo Item.."
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodoItem(e);
          }}
        />
        <TodoButton onClick={addTodoItem} label="ADD TODO" />
      </div>
      {error && <p className="error">{error}</p>}
      {todoList.length > 0 && (
        <div className="todo-list-section">
          <TodoList todoList={todoList} setTodoList={setTodoList} />
        </div>
      )}
    </div>
  );
}

export default ToDo;
