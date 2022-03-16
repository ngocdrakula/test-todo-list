import React, { Component } from 'react'
import { connect } from 'react-redux';
import TaskItem from './TaskItem';
import * as types from '../../redux/type';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }
    componentDidMount() {
        try {
            const dataLocal = localStorage.getItem('store');
            if (dataLocal) {
                const data = JSON.parse(dataLocal);
                const { dispatch } = this.props;
                dispatch({
                    type: types.GET_LOCAL_TASKS,
                    payload: data
                })
            }
        }
        catch (e) {
            console.log('Co loi say ra:', e);
        }
    }

    handleDoneMulti = () => {
        const { dispatch } = this.props;
        dispatch({
            type: types.DONE_MULTIPLE_TASK
        })
    }

    handleRemoveMulti = () => {
        const { dispatch } = this.props;
        dispatch({
            type: types.REMOVE_MULTIPLE_TASK
        })
    }
    handleChange = e => {
        this.setState({ search: e.target.value });
        if (this.props.selecteds) this.handleDoneMulti();
    }

    render() {
        const { data, selecteds } = this.props;
        const { search } = this.state;
        const dataSearch = data.filter(task => {
            if (search && !task.title.toUpperCase().includes(search.toUpperCase())) {
                return false;
            }
            return true;
        });
        return (
            <div className="task-container col">
                <h3 className="task-header">To Do List</h3>
                <div className="form-group">
                    <input
                        name="search"
                        className="input-search"
                        onChange={this.handleChange}
                        placeholder="Search..."
                    />
                </div>
                <div className="task-list">
                    {dataSearch.map(task => {
                        const checked = selecteds.includes(task.id);
                        return (
                            <TaskItem
                                key={task.id}
                                data={task}
                                checked={checked}
                            />
                        )
                    })}
                    {!dataSearch.length ?
                        <div className="list-empty">
                            {search ? "No results found for " + `"${search}"` : "The task list is empty"}
                        </div>
                        : ""}
                </div>
                {selecteds.length ?
                    <div className="task-action-multi">
                        <div className="tam-title">Bulk Action:</div>
                        <div className="tam-item">
                            <button
                                className="tam-done"
                                onClick={this.handleDoneMulti}
                            >Done</button>
                        </div>
                        <div className="tam-item">
                            <button
                                className="tam-remove"
                                onClick={this.handleRemoveMulti}
                            >Remove</button>
                        </div>
                    </div>
                    : ''}
            </div>
        )
    }
}

export default connect(({ data, selecteds }) => ({ data, selecteds }))(TaskList)