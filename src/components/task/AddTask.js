import React, { Component } from 'react'
import TaskForm from '../form/TaskForm';

export default class AddTask extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div className="add-task-container col">
        <h3 className="task-header">New Task</h3>
        <TaskForm />
      </div>
    )
  }
}
