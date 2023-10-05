import axios from 'axios';
// import { useParams } from 'react-router-dom';
// const { userId } = useParams();


export const AddTodoAction = (todo, userId) => (dispatch) => {
  if (todo !== '') {
    axios
      .post(`${process.env.REACT_APP_BE_URL}/api/tasks/create/${userId}`, { task: todo })
      .then((response) => {
        dispatch({
          type: 'ADD_TODO',
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error)
      });
  }
};
export const RemoveTodoAction = (id) => (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_BE_URL}/api/tasks/delete/${id}`)
    .then(() => {
      dispatch({
        type: 'REMOVE_TODO',
        payload: id,
      });
    })
    .catch((error) => {
      console.error(error)
    });
};

  // Action types
export const FETCH_USER_TASKS_REQUEST = 'FETCH_USER_TASKS_REQUEST';
export const FETCH_USER_TASKS_SUCCESS = 'FETCH_USER_TASKS_SUCCESS';
export const FETCH_USER_TASKS_FAILURE = 'FETCH_USER_TASKS_FAILURE';

export const fetchUserTasksRequest = () => ({
  type: FETCH_USER_TASKS_REQUEST,
});

export const fetchUserTasksSuccess = (tasks) => ({
  type: FETCH_USER_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchUserTasksFailure = (error) => ({
  type: FETCH_USER_TASKS_FAILURE,
  payload: error,
});

export const fetchUserTasks = (userId) => (dispatch) => {
  // const tokenId = localStorage.getItem('tokenId');
  dispatch(fetchUserTasksRequest());
  // console.log('userId:', userId)

  axios
  .get(`${process.env.REACT_APP_BE_URL}/api/tasks/${userId}`)
  .then((response) => {
    const tasks = response.data;
    // console.log('response', response);
    dispatch(fetchUserTasksSuccess(tasks));
    // console.log('tasks', tasks)
  })
  .catch((error) => {
    dispatch(fetchUserTasksFailure(error.message));
  });
};

export const fetchUsername = (userId) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_BE_URL}/api/user/${userId}`)
    .then((response) => {
      const username = response.data.username;
      dispatch(fetchUsernameSuccess(username));
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchUsernameSuccess = (username) => ({
  type: 'FETCH_USERNAME_SUCCESS',
  payload: username,
});
  