import React from 'react'
import {Button, InputGroup} from 'react-bootstrap';

const Task = ({task, onCheckboxClick, onDeleteClick}) => {
  return(
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      
      <span>{task.text}</span>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => onDeleteClick(task)}
      >
        &times;
        </Button>
    </li>
  )
}

export default Task
