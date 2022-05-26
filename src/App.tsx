import {FC} from 'react';
import { InputField } from './components/InputField';
import './App.css';

const App: FC = () => {
  return (
    <div className="App">
      <span className="heading">Tasks Management Tool</span>
      <InputField />
    </div>
  );
}

export default App;
