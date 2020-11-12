import React, { useState, DragEvent } from 'react';
import './App.css';

interface ITask {
  statusId: number
  taskName: string
  taskId: string
}

function App() {
  const [status, updateStatus] = useState(['TODO', 'IN PROGRESS'])
  const [tasks, updateTask] = useState<Array<ITask>>([
    {
      statusId: 0,
      taskName: 'UX Design',
      taskId: '0'
    },
    {
      statusId: 0,
      taskName: 'Service Setup',
      taskId: '1'
    },
    {
      statusId: 1,
      taskName: 'UI Setup',
      taskId: '2'
    }
  ])

  const getTaskByStatus = (statusId: number) => {
    return tasks.filter(task => task.statusId === statusId)
  }

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // console.log('E', e)
    const taskId = e.dataTransfer.getData('id')
    const target: any = e.target
    const statusId = target.id
    tasks[+taskId].statusId = +statusId
    updateTask([...tasks])
  }

  const onDragStart = (e: DragEvent) => {
    // e.preventDefault()
    // e.stopPropagation()
    // console.log('E', e)
    const target: any = e.target
    e.dataTransfer.setData('id', target.id)
  }

  const onDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // console.log('E', e)

  }


  return (
    <div className="wrapper">
      <ul>
        {status.map((s, i) => <li key={i}>
          <div className='statusHeader'>
            {s}
          </div>
          <div className='taskWrapper' onDrop={onDrop} onDragOver={onDragOver} id={'' + i}>
            {
              getTaskByStatus(i).map((task, taskIndex) => <div className='taskBox' key={taskIndex}
                draggable={true} onDragStart={onDragStart} id={task.taskId}>
                {task.taskName}
              </div>)
            }
          </div>
        </li>)}
      </ul>

    </div>
  );
}

export default App;
