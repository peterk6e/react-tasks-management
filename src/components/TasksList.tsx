import { Task } from "../model";
import { SingleTask } from "./SingleTask";
import "./styles.css";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export const TasksList = ({ tasks, setTasks }: Props) => {
  return (
    <div className="tasks">
      {tasks.map((task: Task, key: number) => {
        return <SingleTask task={task} tasks={tasks} key={key} setTasks={setTasks}/>
      })}
    </div>
  );
};
