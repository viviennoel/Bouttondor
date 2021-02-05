import Presentation from './images/Background_part1.jpg';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Presentation} className="Presentation" alt="logo" />
        <p>
          I am learning REACT.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Continue on the tutorial
        </a>
      </header>
    </div>
  );
}

export default App;
