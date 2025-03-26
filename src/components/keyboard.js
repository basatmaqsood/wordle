import { useCallback, useEffect } from "react";
import Keys from "./keys";
import { useContext } from "react";
import { AppContext } from "../App";
export function Keyboard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];
  
  const {handleDelete,handleEnter,handleSetLetter,disabled}=useContext(AppContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyboard = useCallback((event)=>{
    if(event.key === "Enter"){
        handleEnter();
    }
    else if(event.key === "Backspace"){
        handleDelete();
    }
    else{
        keys1.forEach((k)=>{
            if(event.key.toLowerCase() === k.toLowerCase()){
                handleSetLetter(k);
            }
        })
        keys2.forEach((k)=>{
            if(event.key.toLowerCase() === k.toLowerCase()){
                handleSetLetter(k);
            }
        })
        keys3.forEach((k)=>{
            if(event.key.toLowerCase() === k.toLowerCase()){
                handleSetLetter(k);
            }
        })
    }
  })


  useEffect(function(){
    document.addEventListener('keydown',handleKeyboard)
    return    function(){
        document.removeEventListener('keydown',handleKeyboard)
    } 
  },[handleKeyboard])
  return (
    <div className="keyboard">
      <div className="line1">
        {keys1.map((key) => {
          return <Keys keyval={key} disabled={disabled.includes(key)}/>;
        })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
          return <Keys keyval={key} disabled={disabled.includes(key)} />;
        })}
        <Keys keyval={"⌫"} bigkey />
      </div>
      <div className="line3">
        {keys3.map((key) => {

          return <Keys keyval={key} disabled={disabled.includes(key)} />;
        })}
        <Keys keyval={"⏎"} bigkey />

      </div>
    </div>
  );
}