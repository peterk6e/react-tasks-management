import { Task } from "../model";
import { SingleTask } from "./SingleTask";
import "./styles.css";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TasksList = ({ tasks, setTasks }: Props) => {
  return (
    <div className="container">
      <div className="backlog tasks">
        <span className="tasks-heading">Backlog</span>

        {tasks.map((task: Task, key: number) => {
          return (
            <SingleTask
              task={task}
              tasks={tasks}
              key={key}
              setTasks={setTasks}
            />
          );
        })}
      </div>
      <div className="inprogress tasks">
        <span className="tasks-heading">In progress</span>
        {tasks.map((task: Task, key: number) => {
          return (
            <SingleTask
              task={task}
              tasks={tasks}
              key={key}
              setTasks={setTasks}
            />
          );
        })}
      </div>
      <div className="intest tasks">
        <span className="tasks-heading">Test</span>
      </div>
      <div className="completed tasks">
        <span className="tasks-heading">Completed</span>
      </div>
    </div>
  );
};
