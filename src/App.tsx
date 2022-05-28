import { FC, FormEvent, useState } from "react";
import { InputField } from "./components/InputField";
import { Task } from "./model";
import { TasksList } from "./components/TasksList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();

    if (task) {
      setTasks([...tasks, { id: Date.now(), task: task, isDone: false }]);
      setTask("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);

    const { source, destination } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

      let add,
      active = tasks,
      completed = completedTasks;

      if(source.droppableId === "backlogList" ) {
        add = active[source.index]
        active.splice(source.index, 1);
      } else {
        add = completed[source.index]
        completed.splice(source.index, 1);
      }

      if(destination.droppableId === "backlogList" ) {
        active.splice(source.index, 0, add);
      } else {
        completed.splice(source.index, 0, add);
      }

        setTasks(active);
        setCompletedTasks(completed);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Tasks Management Tool</span>
        <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
        <TasksList
          tasks={tasks}
          setTasks={setTasks}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
