import { FormEvent } from "react";
import "./styles.css";

interface Props {
  task: string;
  setTask(task: string): void; //React.Dispatch<React.SetStateAction<string>>
    handleAdd(e: FormEvent): void;
}

export const InputField = ({ task, setTask, handleAdd }: Props) => {
  return (
    <form className="input" onSubmit={handleAdd}>
      <input
        type="input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a Task..."
        className="input__box"
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};
