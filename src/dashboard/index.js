import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { AddTodoAction, RemoveTodoAction, fetchUserTasks, fetchUsername } from '../actions/TodoAction';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter} from "reactstrap"
import { useParams } from 'react-router-dom';

import LogoutModal from './logout';

function Dashboard() {

  const [todo, setTodo] = useState('');
  // console.log('todo', todo)
  const dispatch = useDispatch()
  const Todo = useSelector((state) => state.Todo);
  const {todos} = Todo;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { userId } = useParams();
  const [selectedTask, setSelectedTask] = useState(null);
  const username = useSelector((state) => state.Todo.username);
  // console.log('username', username)

  useEffect(() => {
    dispatch(fetchUserTasks(userId));
    dispatch(fetchUsername(userId));
  }, [dispatch, userId]);
  // console.log('userId:', userId)
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AddTodoAction(todo, userId))
    setTodo('');
  };

  const removeHandler = (t) => {
    setSelectedTask(t);
    toggle();
  };
  
  return (
    <div className="App">
      <header className="App-header">
          <h2>To Do List</h2>
          <h5>Username: {username}</h5>
          <LogoutModal />
          <form onSubmit={handleSubmit}>
            <input placeholder='Enter To Do' name='task 'style={{ width:'15rem', padding:'1rem', borderRadius:'20px', fontSize:'20px', border:'none' }} 
            onChange={(e)=>setTodo(e.target.value)}
            value={todo}
            />
            <button type='submit' style={{ width:'7rem', margin:'2rem', height:'3rem', borderRadius:'20px', backgroundColor:'#62b0f2', border:'none', cursor:'pointer'}}>Save</button>
          </form>
          <ul className='allTodo'>
            {
              todos && todos.map((t)=>(
            <li key={t.id} className='singleTodo'>
              <span className='todoText'>{t.task}</span>
              <button
                  style={{
                    width: '7rem',
                    margin: '2rem',
                    height: '3rem',
                    borderRadius: '20px',
                    backgroundColor: '#DFEFFC',
                    cursor: 'pointer'
                  }}
                  onClick={() => removeHandler(t)}
                >
                  Done
                </button>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Delete Task</ModalHeader>
                  <ModalBody>
                    {selectedTask && (
                      <div>
                        <p>This will also delete the task.</p>
                        <p>Are you sure to delete task: {selectedTask.task}</p>
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={() => {
                      if (selectedTask) {
                        dispatch(RemoveTodoAction(selectedTask.id));
                      }
                      toggle();
                    }}>
                      Delete
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>

            </li>
            ))
            }
          </ul>

      </header>
    </div>
  );
}

export default Dashboard;
