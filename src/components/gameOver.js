import { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
    const {gameOver,correctWord} = useContext(AppContext);
    return (
        <div className="gameOver">
            <h3>{gameOver.guessedWord ? "You Correctly Guessed the Word🎉": "You Lost!😢"}</h3>
            {!gameOver.guessedWord ? <h1>Correct: {correctWord}</h1>: <h1>Congratulations</h1>}
        </div>
    )
}

export default GameOver;
