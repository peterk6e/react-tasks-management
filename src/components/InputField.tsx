import { FC } from "react";
import "./styles.css";

export const InputField: FC = () => {
  return (
    <form className="input">
      <input
        type="input"
        placeholder="Enter a Task..."
        className="input__box"
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};
