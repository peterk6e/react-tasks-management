import { useState } from "react";
import { Task } from "../model";
import { SingleTask } from "./SingleTask";
import { Droppable } from "react-beautiful-dnd";
import "./styles.css";

interface Props {
  tasks: Task[];
  inProgressTasks: Task[];
  testTasks: Task[];
  completedTasks: Task[];
  setTasksInColumn(tasks: Task[], columnId: number): void;
}

export const TasksList = ({
  tasks,
  inProgressTasks,
  testTasks,
  completedTasks,
  setTasksInColumn,
}: Props) => {
  const [headerCol1, setHeaderCol1] = useState<string>("Backlog");
  const [headerCol2, setHeaderCol2] = useState<string>("In Progress");
  const [headerCol3, setHeaderCol3] = useState<string>("Test");
  const [headerCol4, setHeaderCol4] = useState<string>("Completed");

  return (
    <div className="container">
      <Droppable droppableId="backlogList">
        {(provided, snapshot) => (
          <div
            className={`tasks ${snapshot.isDraggingOver ? "drag-active" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <input
              className="tasks-heading"
              value={headerCol1}
              onChange={(e) => setHeaderCol1(e.target.value)}
            />
            {tasks.map((task, index) => {
              return (
                <SingleTask
                  index={index}
                  task={task}
                  tasks={tasks}
                  key={task.id}
                  setTasksInColumn={setTasksInColumn}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="inProgressList">
        {(provided, snapshot) => (
          <div
            className={`tasks ${snapshot.isDraggingOver ? "drag-active" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <input
              className="tasks-heading"
              value={headerCol2}
              onChange={(e) => setHeaderCol2(e.target.value)}
            />
            {inProgressTasks.map((task, index) => {
              return (
                <SingleTask
                  index={index}
                  task={task}
                  tasks={inProgressTasks}
                  key={task.id}
                  setTasksInColumn={setTasksInColumn}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="testList">
        {(provided, snapshot) => (
          <div
            className={`tasks ${snapshot.isDraggingOver ? "drag-active" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <input
              className="tasks-heading"
              value={headerCol3}
              onChange={(e) => setHeaderCol3(e.target.value)}
            />
            {testTasks.map((task, index) => {
              return (
                <SingleTask
                  index={index}
                  task={task}
                  tasks={testTasks}
                  key={task.id}
                  setTasksInColumn={setTasksInColumn}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="completedList">
        {(provided, snapshot) => (
          <div
            className={`tasks ${snapshot.isDraggingOver ? "drag-active" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <input
              className="tasks-heading"
              value={headerCol4}
              onChange={(e) => setHeaderCol4(e.target.value)}
            />
            {completedTasks.map((task, index) => {
              return (
                <SingleTask
                  index={index}
                  task={task}
                  tasks={completedTasks}
                  key={task.id}
                  setTasksInColumn={setTasksInColumn}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
