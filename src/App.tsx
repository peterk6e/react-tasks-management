import { FC, FormEvent, useState } from "react";
import { InputField } from "./components/InputField";
import { Task } from "./model";
import { TasksList } from "./components/TasksList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";

const initialTask1 = [
  { id: Math.random(), task: "do something", isDone: false, columnId: 0 },
  { id: Math.random(), task: "do something else", isDone: false, columnId: 0 },
];
const initialTask2 = [
  { id: Math.random(), task: "do something", isDone: false, columnId: 1 },
];
const initialTask3 = [
  { id: Math.random(), task: "do something now", isDone: true, columnId: 3 },
];

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>(initialTask1);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>(initialTask2);
  const [testTasks, setTestTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>(initialTask3);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();

    if (task) {
      setTasks([
        ...tasks,
        { id: Date.now(), task: task, isDone: false, columnId: 0 },
      ]);
      setTask("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    let dragged: Task = { id: 0, task: "", isDone: false, columnId: 0 };

    if (source.droppableId === "backlogList") {
      setTasks(tasks.filter((task, index) => index !== source.index));
      dragged = tasks[source.index];
    }
    if (source.droppableId === "inProgressList") {
      dragged = inProgressTasks[source.index];
      setInProgressTasks(
        inProgressTasks.filter((task, index) => index !== source.index)
      );
    }
    if (source.droppableId === "testList") {
      dragged = testTasks[source.index];
      setTestTasks(testTasks.filter((task, index) => index !== source.index));
    }
    if (source.droppableId === "completedList") {
      dragged = completedTasks[source.index];
      setCompletedTasks(
        completedTasks.filter((task, index) => index !== source.index)
      );
    }

    if (destination.droppableId === "backlogList") {
      dragged.columnId = 0;
      setTasks([...tasks, dragged]);
    }
    if (destination.droppableId === "inProgressList") {
      dragged.columnId = 1;
      setInProgressTasks([...inProgressTasks, dragged]);
    }
    if (destination.droppableId === "testList") {
      dragged.columnId = 2;
      setTestTasks([...testTasks, dragged]);
    }
    if (destination.droppableId === "completedList") {
      dragged.columnId = 3;
      setCompletedTasks([...completedTasks, dragged]);
    }
  };

  const setTasksInColumn = (tasks: Task[], columnId: number) => {
    switch (columnId) {
      case 0:
        setTasks(tasks);
        return;
      case 1:
        setInProgressTasks(tasks);
        return;
      case 2:
        setTestTasks(tasks);
        return;
      case 3:
        setCompletedTasks(tasks);
        return;
      default:
        return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Tasks Management Tool</span>
        <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
        <TasksList
          tasks={tasks}
          inProgressTasks={inProgressTasks}
          testTasks={testTasks}
          completedTasks={completedTasks}
          setTasksInColumn={setTasksInColumn}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
