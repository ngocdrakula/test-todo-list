import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as types from '../../redux/type';
import Select from '../select/Select';

const piorities = [
  { value: 'Low', label: 'Low' },
  { value: 'Normal', label: 'Normal' },
  { value: 'High', label: 'High' }
]
function getDate(date = new Date()) {
  let dd = date.getDate();
  let mm = date.getMonth() + 1; //January is 0!
  let yyyy = date.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  const str = yyyy + '-' + mm + '-' + dd;
  return (str)
}
const getInitallState = () => ({
  title: "",
  description: "",
  dueDate: getDate(),
  piority: "Normal",
  error: false,
  message: ""
})
class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...getInitallState(),
    }
  }
  componentDidMount() {
    this.refeshForm();
  }
  componentDidUpdate(prevProps) {
    if (this.props.data?.id && !prevProps.data?.id) {
      this.refeshForm();
    }
  }

  refeshForm = () => {
    this.setState({
      ...getInitallState(),
      ...(this.props.data || {})
    })
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: false, message: "" });

  handleChangeDate = e => {
    this.setState({ [e.target.name]: e.target.value, error: false, message: "" });
    if (e.target.value < getDate()) {
      this.setState({
        error: 'dueDate',
        message: "Do not accept days in the past as due date"
      })
    }
  }

  handleChangeSelect = ({ name, value }) => this.setState({ [name]: value, error: false, message: "" });

  handleSubmit = e => {
    e.preventDefault();
    const { title, description, dueDate, piority } = this.state;
    if (!title) {
      this.setState({
        error: 'title',
        message: "Title is require!"
      });
    }
    else if (dueDate >= getDate()) {
      const { data, dispatch } = this.props;
      if (data?.id) {
        dispatch({
          type: types.UPDATE_TASK,
          payload: { id: data.id, title, description, dueDate, piority }
        });
        this.setState({
          message: "Update task successfully"
        });
      }
      else {
        dispatch({
          type: types.ADD_TASK,
          payload: { title, description, dueDate, piority }
        });
        this.refeshForm();
        this.setState({
          message: "Create successful task"
        });
      }
    }
  }

  render() {
    const { data } = this.props;
    const { title, description, dueDate, piority, error, message } = this.state;
    return (
      <div className="task-form-container">
        <form className="task-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              name="title"
              value={title}
              className={"task-title" + (error === 'title' ? " error" : "")}
              placeholder="Add new task..."
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor={(data?.id ? "edit" : "add") + "-description"}>Description</label>
            <textarea
              id={(data?.id ? "edit" : "add") + "-description"}
              name="description"
              rows={8}
              value={description}
              className="task-description"
              onChange={this.handleChange}
            />
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor={(data?.id ? "edit" : "add") + "-dueDate"}>Due Date</label>
                <input
                  id={(data?.id ? "edit" : "add") + "-dueDate"}
                  type="date"
                  name="dueDate"
                  value={dueDate || getDate()}
                  className={"task-due-date" + (error === "dueDate" ? " error" : "")}
                  onChange={this.handleChangeDate}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Piority</label>
                <Select
                  name="piority"
                  data={piorities}
                  defaultValue={data?.piority || 'Normal'}
                  value={piority}
                  className="task-piority"
                  onChange={this.handleChangeSelect}
                />
              </div>
            </div>
          </div>
          <div className="form-message">
            <div className={error ? "error-message" : "success-message"}>
              {message}
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value={data?.id ? "Update" : "Add"} />
          </div>
        </form >
      </div >
    )
  }
}
export default connect(({ }) => ({}))(TaskForm)
