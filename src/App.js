import './App.css';
import {useState, useEffect} from 'react';

const URL = 'http://localhost/todo/';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    let status = 0;
    fetch(URL + 'retrieve.php')
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
        alert('Häiriö');
      }
    )
  }, [])

  function save(e) {
    e.preventDefault();
    let status = 0;
    fetch(URL + 'create.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        description: task
      })
    })
    .then(res => {
      status = parseInt(res.status);
      return res.json()
    })
    .then(
      (res) => {
        if (status === 200) {
          setTasks(tasks => [...tasks,res]);
          //kenttä tyhjenee
          setTask('');
        } else {
          alert(res.error);
        }
      }, (error) => {
        alert('Häiriö');
      }
    )


  }

  return (
    <div className="container">
      <h3>Todo list</h3>
      <form onSubmit={save}>
        <label>New task</label>
        <input value={task} onChange={e => setTask(e.target.value)} />
        <button>Save</button>
      </form>
      <ol>
        {tasks.map(task => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
