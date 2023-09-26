import { useContext } from "react";
import { AppContext } from "../App";

function Keys({ keyval, bigkey, disabled }) {
  const { handleDelete, handleEnter, handleSetLetter } = useContext(AppContext);

  function selectLetter() {
    if (keyval === "Enter") {
      handleEnter();
    } else if (keyval === "Delete") {
      handleDelete();
    } else {
      handleSetLetter(keyval);
    }
  }
  return (
    <div
      className="key"
      id={bigkey ? "big" : disabled && "disabled"}
      onClick={() => selectLetter()}
    >
      {keyval}
    </div>
  );
}

export default Keys;
