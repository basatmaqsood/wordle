import "./App.css";
import { useEffect, useState } from "react";
import { boardDefault, generateWordSet } from "./words";
import { Board } from "./components/board";
import { Keyboard } from "./components/keyboard";
import { createContext } from "react";
import GameOver from "./components/gameOver";
import todaysWord from "./words"


export const AppContext = createContext();

function App() {
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

  function handleEnter() {
    if (currAttempt.letterPos !== 5) return;
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    console.log(currWord);
    if (wordSet.has(currWord.toLowerCase())) {
      setcurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert("Words not Found");
    }

    if(currWord.toLowerCase() === correctWord){
      setGameOver({gameOver:true, guessedWord:true})
      console.log("hi");
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
      <nav>
        <h1>Wordle</h1>
      </nav>
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
    </div>
  );
}

export default App;
