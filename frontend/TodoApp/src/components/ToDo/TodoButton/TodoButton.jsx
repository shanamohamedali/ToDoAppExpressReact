import React from 'react'
import "./TodoButton.css"

export function TodoButton({onClick,label}) {
  return (
    <div className='todo-button-container'>
      <button onClick={onClick}>
        {label}
      </button>
    </div>
  )
}

