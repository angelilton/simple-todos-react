import React,{useState} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import Task from './task.jsx';
import { TaskForm } from './TaskForm.jsx';
import {Container, Button} from 'react-bootstrap';

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false)
  
  //mongo query
  const hideCompletedFilter = { isChecked: {$ne: true}}
  
  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 }
    }).fetch())
  
  console.log(hideCompleted);
  
  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(hideCompletedFilter).count()
  )

  console.log(pendingTasksCount);

  const showPendingTasks = `${
    pendingTasksCount ? `${pendingTasksCount}` : ''
  }`

  const deleteAllTasks = () => {
    tasks.map(({ _id }) => TasksCollection.remove(_id))
}
  
  return(
    <div className='container'>
        <h1>📝️ To Do List {' '}
          {showPendingTasks}
        </h1>
        <TaskForm />
      <div className='d-flex  justify-content-around' >
        <Button  variant="outline-info"  onClick={() => setHideCompleted(!hideCompleted) }>
          {hideCompleted ? 'show all' : 'Hide Completed'}
        </Button>
        <Button
          variant="outline-danger ml-3"
          onClick={deleteAllTasks}
        >
          Clear Tasks
        </Button>
        </div>
        <ul>
            {tasks.map(task => (
              <Task
                key={task._id}
                task={task}
                onCheckboxClick={toggleChecked}
                onDeleteClick={deleteTask}
              />
            ))}
            </ul>
    </div>
  )
};

const toggleChecked = ({_id, isChecked}) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
}

const deleteTask = ({ _id }) => TasksCollection.remove(_id)
