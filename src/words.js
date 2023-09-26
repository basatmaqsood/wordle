import wordBank from "./wordle-bank.txt"

export const boardDefault=[
    ["" , "" , "" , "" , ""],
    ["" , "" , "" , "" , ""],
    ["" , "" , "" , "" , ""],
    ["" , "" , "" , "" , ""],
    ["" , "" , "" , "" , ""],
    ["" , "" , "" , "" , ""]
]
let todaysWord;
export async function generateWordSet(){
    let wordSet;
    await fetch(wordBank).then((response)=>response.text()).then((result)=>{
       let  wordArray = result.split("\n");
       todaysWord = wordArray[Math.floor(Math.random() * wordArray.length)]
        wordSet = new Set(wordArray);
    })
    return {wordSet,todaysWord};
}

