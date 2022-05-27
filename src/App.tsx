import { FC, FormEvent, useState } from "react";
import { InputField } from "./components/InputField";
import { Task } from "./model";
import { TasksList } from "./components/TasksList";
import "./App.css";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();


    if (task) {
      setTasks([...tasks, { id: Date.now(), task: task, isDone: false }]);
      setTask("");
      console.log(tasks);
    }
  };

  return (
    <div className="App">
      <span className="heading">Tasks Management Tool</span>
      <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
      <TasksList tasks={tasks} setTasks={setTasks}/>
    </div>
  );
};

export default App;
