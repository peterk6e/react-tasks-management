import { FormEvent, useState, useRef, useEffect } from "react";
import { Task } from "../model";
import "./styles.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  task: Task;
  tasks: Task[];
  setTasksInColumn(tasks: Task[], columnId: number): void;
  index: number;
}

export const SingleTask = ({ task, tasks, setTasksInColumn, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(task.task);

  const handleDone = (doneTask: Task) => {
    setTasksInColumn(
      tasks.map((task) =>
        task.id === doneTask.id ? { ...task, isDone: !task.isDone } : task
      ),
      doneTask.columnId
    );
  };

  const handleEdit = (e: FormEvent, editTask: Task) => {
    e.preventDefault();
    setTasksInColumn(
      tasks.map((task) =>
        task.id === editTask.id ? { ...task, task: editText } : task
      ),
      editTask.columnId
    );

    setEdit(false);
  };

  const handleDelete = (deleteTask: Task) => {
    setTasksInColumn(
      tasks.filter((task) => task.id !== deleteTask.id),
      deleteTask.columnId
    );
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const done = task.isDone ? "task done" : "task";

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <form
          className={done}
          onSubmit={(e) => handleEdit(e, task)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <label>
                
              <input
                ref={inputRef} //autoFocus
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-text"
              />
              press Enter
            </label>
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
            <span className="icon" onClick={() => handleDelete(task)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(task)}>
              <MdDoneAll />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};
