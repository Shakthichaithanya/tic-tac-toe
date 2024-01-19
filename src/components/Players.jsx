import { useState } from "react";

export default function Players({
  playerName,
  playerSymbol,
  isActive,
  onChangeName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [savedPlayerName, setSavedPlayerName] = useState(playerName);
  let inputPlayerName = <input onChange={handleChange} />;

  function handleChange(event) {
    setSavedPlayerName(event.target.value);
  }

  function handleClick() {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      onChangeName(playerSymbol, savedPlayerName);
    }
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        <span className="player-name">
          {isEditing ? inputPlayerName : savedPlayerName}
        </span>
        <span className="player-symbol">{playerSymbol}</span>
        <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
      </span>
    </li>
  );
}
