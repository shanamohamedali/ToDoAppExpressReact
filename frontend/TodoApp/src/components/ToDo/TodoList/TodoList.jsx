import React, { useState } from "react";
import "./TodoList.css";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { TodoEdit } from "../TodoEdit/TodoEdit";
import axios from "axios";
import { API_URL } from "../../../constants/constants";

export function TodoList({ todoList, setTodoList }) {
  const [editItem, setEditItem] = useState("");

  const handleCompleteToggle = async (id) => {
    try {
      const response = await axios(`${API_URL}/toggle`, {
        method: "PUT",
        data: {
          id: id,
          
        },
      });
      setTodoList(response.data);
      console.log("===toggle",response.data)
    } catch (error) {
      console.log(error.response.data.message);
    }
  };


  const deleteTodoItem = async (id) => {
    // console.log("id...", id);
    try{
      const response = await axios(API_URL, {
        method: "DELETE",
        data: {
          id: id,
        },
      });
      setTodoList(response.data);
    }catch(error){
      console.log(error.response.data.message);
    }
   
  };

  console.log("..edititem", editItem);

  return (
    <div className="todo-list-containter">
      <div>
        <ul>
          {todoList.map((item, index) => (
            <div className="todo-item" key={item.id}>
              <li
                key={item.id}
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
                onClick={() => handleCompleteToggle(item.id)}
              >
                {item.title}
              </li>
              <button
                // style={{ paddingRight: "40px"}}
                onClick={() =>
                  setEditItem({
                    ...editItem,
                    id: item.id,
                    title: item.title,
                    completed: item.completed,
                  })
                }
              >
                <FaPen />
              </button>
              <button>
                <FaTrash onClick={() => deleteTodoItem(item.id)} />
              </button>
            </div>
          ))}
        </ul>
      </div>
      {editItem && (
        <div>
          <TodoEdit
            todoList={todoList}
            setTodoList={setTodoList}
            editItem={editItem}
            setEditItem={setEditItem}
          />
        </div>
      )}
    </div>
  );
}
