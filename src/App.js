import "./App.css";
import { useEffect, useState } from "react";
import { boardDefault, generateWordSet } from "./words";
import { Board } from "./components/board";
import { Keyboard } from "./components/keyboard";
import { createContext } from "react";
import GameOver from "./components/gameOver";
import todaysWord from "./words"
import HowItWorks from "./components/HowItWorks";


export const AppContext = createContext();

function App() {
  const [section, setSection] = useState("game");
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setcurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabled, setDisabled] = useState([]);
  const [correctWord,setCorrectWord] = useState('');
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  // const correctWord = "RIGHT";

  useEffect(function () {
    generateWordSet().then((words) => {
      // console.log(words.wordSet);
      console.log(words.todaysWord);
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  function toggleSection(){
    if(section === "game"){
      setSection("how");
    }
    else if (section === "how"){
      setSection("game");
  }
  }
  function handleEnter() {
    if (currAttempt.letterPos !== 5) return;
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    // console.log(currWord.toLowerCase());
    console.log(wordSet)
    if (wordSet.has(`${currWord.toLowerCase()}\r`)) {
      setcurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Words not Found");
    }


    if(`${currWord.toLowerCase()}\r` === correctWord){
      setGameOver({gameOver:true, guessedWord:true})
      // console.log("hi");
      return;
    }
    if(currAttempt.attempt === 5){
      setGameOver({gameOver:true,guessedWord:false})
    }
  }

  function handleDelete() {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setcurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  }

  function handleSetLetter(keyval) {
    if (currAttempt.letterPos > 4) {
      return;
    }
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyval;
    setBoard(newBoard);
    setcurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  }
  return (
    <div className="App">
      {/* <HowItWorks/> */}

      <nav>
        <h1><a href="/">Wordle</a></h1>
      <button className="toggle-button" onClick={() => toggleSection()}>{section == 'game' ? 'How to Play':'Let\'s Play'}</button>
      </nav>
      {
        section === "game" ?
        <div className="app-center">
        <AppContext.Provider
          value={{
            correctWord,
            board,
            setBoard,
            currAttempt,
            setcurrAttempt,
            handleDelete,
            handleEnter,
            handleSetLetter,
            disabled,
            setDisabled,
            gameOver,
            setGameOver,
          }}
        >
          <Board />
          {gameOver.gameOver?<GameOver/> :<Keyboard />}
        </AppContext.Provider>
      </div>
          : section === "how" ?
            <HowItWorks setSection={setSection} />
            : null
      }
      <h2 className="tag-line">Developed with ❤ by <a target="_blank" href="https://www.basatmaqsood.live">Basat Maqsood</a></h2>
      <a className="visit" target="_blank" href="https://www.basatmaqsood.live">Click here to Visit me</a>
    </div>
  );
}

export default App;
