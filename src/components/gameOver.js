import { useContext, useState } from "react";
import { AppContext } from "../App";

function GameOver() {
    const { gameOver, correctWord } = useContext(AppContext);
    const [retroMode, setRetroMode] = useState(false);

    return (
        <div className={`gameOver ${retroMode ? "retro" : ""}`}>
            <h3 className={gameOver.guessedWord ? "win-text" : "lose-text"}>
                {gameOver.guessedWord 
                    ? "🎉 You Guessed the Word Correctly! 🎉" 
                    : "😢 You Lost! Better Luck Next Time!"}
            </h3>
            
            <h1 className="word-text">
                {gameOver.guessedWord 
                    ? "🎊 Congratulations! 🎊" 
                    : `The Correct Word Was: "${correctWord}"`}
            </h1>

            <button className="play-again-btn" onClick={() => window.location.reload()}>
                🔄 Play Again
            </button>

            <button className="play-again-btn" onClick={() => setRetroMode(!retroMode)}>
                🎮 Toggle Retro Mode
            </button>
        </div>
    );
}

export default GameOver;
