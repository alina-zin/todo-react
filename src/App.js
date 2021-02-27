import './App.css';
import {useState, useEffect} from 'react';

const URL = 'http://localhost/todo/retrieve.php';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let status = 0;
    fetch(URL)
    .then(res => {
      status = parseInt(res.status);
      return res.json()
    })
    .then(
      (res) => {
        if (status === 200) {
          setTasks(res);
        } else {
          alert(res.error);
        }
      }, (error) => {
        alert(error);
      }
    )
  }, [])

  return (
    <div className="container">
      <h3>Todo list</h3>
      <ol>
        {tasks.map(task => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
