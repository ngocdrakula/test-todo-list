import React, { Component } from 'react'
import { connect } from 'react-redux';
import TaskForm from '../form/TaskForm';
import * as types from '../../redux/type';

class TaskItem extends Component {
  constructor(props) {
    super(props);
  }
  handleSelect = () => {
    const { data, dispatch } = this.props;
    dispatch({
      type: types.SELECT_TASK,
      payload: data.id
    });
  }
  handleViewDetail = () => {
    const { data, dispatch, onEdit } = this.props;
    dispatch({
      type: types.VIEW_TASK,
      payload: onEdit !== data.id ? data.id : null
    });
  }
  handleRemove = () => {
    const { data, dispatch } = this.props;
    dispatch({
      type: types.REMOVE_TASK,
      payload: data.id
    });
  }
  render() {
    const { data, onEdit, checked } = this.props;
    return (
      <div className="task-item">
        <div className="task-box">
          <label
            className="task-checbox-title"
            htmlFor={"task-" + data.id}
          >
            <input
              id={"task-" + data.id}
              type="checkbox"
              className="checkbox"
              checked={checked ? "checked" : ""}
              onChange={this.handleSelect}
            />
            <i className="checkbox-icon" />
            <span>{data.title}</span>
          </label>
          <div className="task-time">
            {data.dueDate}
          </div>
          <div className="task-action">
            <div className="ta-item">
              <button
                className="ta-detail"
                onClick={this.handleViewDetail}
              >Detail</button>
            </div>
            <div className="ta-item">
              <button
                className="ta-remove"
                onClick={this.handleRemove}
              >Remove</button>
            </div>
          </div>
        </div>
        {data.id === onEdit ?
          <TaskForm data={data} />
          : ''
        }
      </div>
    )
  }
}
export default connect(({ onEdit }) => ({ onEdit }))(React.memo(TaskItem))
