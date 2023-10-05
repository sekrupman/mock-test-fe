const initialState = {
  todos: [],
  loading: false,
  error: null,
  username:''
};

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_TASKS_REQUEST':
      return { ...state, loading: true, error: null };

    case 'FETCH_USER_TASKS_SUCCESS':
      return { ...state, loading: false, todos: action.payload, error: null };

    case 'FETCH_USER_TASKS_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload], 
      };

    case 'FETCH_USERNAME_SUCCESS':
      return { ...state, username: action.payload };

    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((task) => task.id !== action.payload),
      };

    default:
      return state;
  }
};

export default TodoReducer;
