import { FormEvent, useRef } from "react";
import "./styles.css";

interface Props {
  task: string;
  setTask(task: string): void; //React.Dispatch<React.SetStateAction<string>>
  handleAdd(e: FormEvent): void;
}

export const InputField = ({ task, setTask, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur(); // change Focus when press Enter
      }}
    >
      <input
        ref={inputRef}
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
