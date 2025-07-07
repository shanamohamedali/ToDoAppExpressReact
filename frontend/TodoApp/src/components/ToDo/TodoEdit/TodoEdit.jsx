import React, { useState } from "react";
import { TodoInput } from "../TodoInput/TodoInput";
import { TodoButton } from "../TodoButton/TodoButton";
import "./TodoEdit.css";
import { API_URL } from "../../../constants/constants";
import axios from "axios";


export function TodoEdit({ todoList, setTodoList, editItem, setEditItem }) {
  //const[editedItem,setEditedItem]=useState(" ")
  //const{id,title,completed}=editItem;
  console.log("...dgasf", editItem.title);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEditItem({ ...editItem, title: e.target.value });
  };
  const handleChangeSave =async (e) => {
    e.preventDefault();
    try {
      if (editItem.title !== "") {
        const response=await axios(API_URL,{
          method:"PUT",
          data:{
            id:editItem.id,
            title:editItem.title,
          }
        })
        setTodoList(response.data);
        setEditItem("");
      } else {
        setError("Input is required, enter the edited task");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="todoedit-container">
        <TodoInput
          onChange={handleChange}
          value={editItem.title}
          name="editInput"
          type="text"
          placeholder="Edit Todo Item.."
        />
        <TodoButton onClick={handleChangeSave} label="SAVE" />
        <TodoButton onClick={() => setEditItem("")} label="CANCEL" />
      </div>
      {error && <p className="error">{error}</p>}
    </>
  );
}
