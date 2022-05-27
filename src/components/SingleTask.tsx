import { FormEvent, useState, useRef, useEffect } from "react";
import { Task } from "../model";
import "./styles.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";

interface Props {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const SingleTask = ({ task, tasks, setTasks }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(task.task);

  const handleDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const handleEdit = (e: FormEvent, id: number) => {
    e.preventDefault();
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, task: editText } : task))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const done = task.isDone ? "task done" : "task";

  return (
    <form className={done} onSubmit={(e) => handleEdit(e, task.id)}>
      {edit ? (
        <input
          ref={inputRef} //autoFocus
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="edit-text"
        />
      ) : (
        <span className="task-text">{task.task}</span>
      )}
      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !task.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(task.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(task.id)}>
          <MdDoneAll />
        </span>
      </div>
    </form>
  );
};
