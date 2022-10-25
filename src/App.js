import React, {useState} from 'react';
import './App.css';
import Lab1 from './labs/lab1/Lab1';
import Lab2 from './labs/lab2/Lab2';
import Lab3 from './labs/lab3/Lab3';

function App() {
  const [generatedArr, setGeneratedArr] = useState([])
  return (
    <div className="mainWrapper">
      <div className="theme"/>
      <main className="contentWrapper">
        <header className="headerWrapper">
          <div className="headerTextWrapper">
            <div className="titleWrapper">
              <p className="title">Algorithmic support of multimedia and information-search systems</p>
            </div>
            <div className="authorWrapper">
              <p className="author">by Dmytro Hryshaiev</p>
            </div>
            <div className="buttonWrapper">
              <div className="button2">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Go to labs
              </div>
            </div>
          </div>
        </header>
        <div className="labsWrapper">
          <Lab1 />
          <Lab2 generatedArr={generatedArr} setGeneratedArr={setGeneratedArr} />
          <Lab3 generatedArr={generatedArr} setGeneratedArr={setGeneratedArr} />
        </div>
      </main>
    </div>
  );
}

export default App;
