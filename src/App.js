import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'
import './App.css';
import TaskList from './components/task/TaskList';
import AddTask from './components/task/AddTask';

function App() { 
  return (
    <Provider store={store}>
      <div className="App">
        <div className="container">
          <div className="task row">
            <AddTask />
            <TaskList />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
