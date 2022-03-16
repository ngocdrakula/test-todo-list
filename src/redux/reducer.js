import * as types from "./type";

const initalState = {
  data: [],
  onEdit: null,
  selecteds: []
}

const sortAndSaveLocal = (state) => {
  console.log(state.data.map(i => i.dueDate));
  state.data.sort((a, b) => a.dueDate > b.dueDate ? 1 : -1)
  console.log(state.data.map(i => i.dueDate));
  localStorage.setItem('store', JSON.stringify(state.data));
  return state
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case types.GET_LOCAL_TASKS: {
      return {
        ...state,
        data: action.payload
      }
    }
    case types.ADD_TASK: {
      const newTask = {
        ...action.payload,
        id: Date.now()
      }
      return sortAndSaveLocal({
        ...state,
        data: [...state.data, newTask]
      })
    }
    case types.VIEW_TASK: {
      return {
        ...state,
        onEdit: action.payload
      }
    }
    case types.UPDATE_TASK: {
      return sortAndSaveLocal({
        ...state,
        data: [...state.data.filter(task => task.id !== action.payload.id), action.payload]
      })
    }
    case types.REMOVE_TASK: {
      return sortAndSaveLocal({
        ...state,
        data: state.data.filter(task => task.id !== action.payload),
        selecteds: state.selecteds.filter(id => id !== action.payload)
      })
    }
    case types.SELECT_TASK: {
      if (state.selecteds.includes(action.payload)) {
        state.selecteds = state.selecteds.filter(id => id !== action.payload);
      }
      else {
        state.selecteds = [...state.selecteds, action.payload];
      }
      return {
        ...state
      }
    }
    case types.REMOVE_MULTIPLE_TASK: {
      return sortAndSaveLocal({
        ...state,
        data: state.data.filter(task => !state.selecteds.includes(task.id)),
        selecteds: []
      })
    }
    case types.DONE_MULTIPLE_TASK: {
      return {
        ...state,
        selecteds: []
      }
    }
    default: {
      return state
    }
  }
};

export default reducer