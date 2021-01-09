import React, { useState, useEffect, useRef } from 'react'
import { TasksCollection } from '/imports/api/TasksCollection';
import Button from 'react-bootstrap/Button';

export const TaskForm = () => {
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus();
  }, [text]);

  const handleSubmit = e => {
    e.preventDefault()
    
    if (!text) return
    
    TasksCollection.insert({
      text: text.trim(),
      createdAt: new Date()
    })

    setText('')
    
  }

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='type to add new tasks'
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type='submit'>Add task</Button>
    </form>
  )
}

