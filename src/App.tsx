import { FC, useState } from "react";
import { InputField } from "./components/InputField";
import "./App.css";

const App: FC = () => {
  const [task, setTask] = useState<string>("");

  return (
    <div className="App">
      <span className="heading">Tasks Management Tool</span>
      <InputField task={task} setTask={setTask}/>
    </div>
  );
};

export default App;
