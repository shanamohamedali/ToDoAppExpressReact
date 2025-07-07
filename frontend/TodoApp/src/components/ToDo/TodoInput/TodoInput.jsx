import React from 'react'
import './TodoInput.css'

export function TodoInput({onChange,value,name,placeholder,type,onKeyDown}) {
  return (
    <div className='todo-input-container'>
      <input type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      contentEditable="true"
      />
    </div>
  )
}


