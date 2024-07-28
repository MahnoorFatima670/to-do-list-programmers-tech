import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  // Retrieve tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setMainTask(storedTasks);
    }
  }, []);

  // Save tasks to local storage whenever they are added or deleted
  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "" || desc.trim() === "") {
      alert("Both title and description are required!");
      return;
    }
    const newTask = { title, desc };
    const updatedTasks = [...mainTask, newTask];
    setMainTask(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTitle("");
    setDesc("");
  };
  const deleteHandler = (i) => {
    const updatedTasks = mainTask.filter((_, index) => index !== i);
    setMainTask(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  let renderTask = <h6>No Task Available</h6>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <li key={i} className='mytasklist'>
        <div className='alltasks'>
          
          <h5 className='task'><h2>Task:</h2>{t.title} &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;</h5>
          <p className='description'><h2>Description:</h2>{t.desc}</p>
          <form>
            <label>
              <input type="checkbox" className='checked1' id="checked" name="checked"></input>
            </label>
          </form>
          
        </div>
        <button onClick={() => deleteHandler(i)}>Delete</button>
      </li>
    ));
  }

  return (
    <>
      <div className="maindiv">
        <h1 className="to-do-list">Mahnoor's To do list</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="name"
            placeholder='Enter Your Task....'
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            name="name"
            placeholder='Enter Your Desc...'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button>+</button>
        </form>
      </div>
      <div className='rt'>
        <ul>
          {renderTask}
        </ul>
      </div>
    </>
  );
};

export default App;